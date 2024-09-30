import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { ProductoPedido } from './entities/producto-pedido.entity';
import { Pedido } from './entities/pedido.entity';
import { PedidoDto, ProductoDto } from './interface/pedido.interface';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class PedidosService {
  private client = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 8877 },//Conectar al microservicio de notificaciones en el puerto 8877
  });

  private clientFacturacion = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3001 },//Conectar al microservicio de facturacion en el puerto 3001
  });

  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,

    @InjectRepository(ProductoPedido)
    private productoPedidoRepository: Repository<ProductoPedido>,

    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    private dataSource: DataSource,
  ) {

  }
  async create(createPedidoDto: CreatePedidoDto, usuarioCreacion: number): Promise<Pedido> 
  {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try 
    {
      const nuevoPedido = new Pedido();
      nuevoPedido.fecha = new Date();
      nuevoPedido.idUsuarioCreacion = usuarioCreacion;
      const pedidoCreado = await queryRunner.manager.save(nuevoPedido);

      for (const productoPedidoDto of createPedidoDto.productos) 
        {
        const producto = await this.productoRepository.findOne({ where: { id: productoPedidoDto.idProducto } });
        if (!producto) 
          {
          throw new BadRequestException(`El producto con id ${productoPedidoDto.idProducto} no existe`);
          }

        if (producto.estado !== 'ACTIVO') 
          {
          throw new BadRequestException(`El producto con id ${productoPedidoDto.idProducto} no esta ACTIVO`);
          }

        if (producto.enStock < productoPedidoDto.cantidad) 
          {
          throw new BadRequestException(`No se cuenta con la cantidad requerida del producto con id ${productoPedidoDto.idProducto}`);
          }

        const nuevoProductoPedido = new ProductoPedido();
        nuevoProductoPedido.pedido = pedidoCreado;
        nuevoProductoPedido.producto = producto;
        nuevoProductoPedido.cantidad = productoPedidoDto.cantidad;
        nuevoProductoPedido.precio = productoPedidoDto.precio;

        await queryRunner.manager.save(nuevoProductoPedido);
      }

      await queryRunner.commitTransaction();
      return pedidoCreado;

    } 
    catch (error) 
    {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(`No se pudo realizar la creacion del pedido: ${error.message}`)
    } 
    finally 
    {
      await queryRunner.release();
    }

  }

  async findAll(): Promise<PedidoDto[]> 
  {
    const pedidos = await this.pedidoRepository.createQueryBuilder('pedido')
      .leftJoinAndSelect('pedido.productos', 'productoPedido')
      .leftJoinAndSelect('productoPedido.producto', 'producto')
      .leftJoinAndSelect('producto.categoria', 'categoria')
      .select([
        'pedido.id',
        'pedido.fecha',
        'productoPedido.cantidad',
        'producto.nombre',
        'categoria.nombre',
        'productoPedido.precio',
      ])
      .getMany();

    const pedidosFinal = pedidos.map((pedido) => ({
      id: pedido.id,
      fecha: pedido.fecha,
      productos: pedido.productos.map((productoPedido) => ({
        nombre: productoPedido.producto.nombre,
        categoria: productoPedido.producto?.categoria?.nombre || '',
        cantidad: productoPedido.cantidad,
        precio: productoPedido.precio,
        total: productoPedido.cantidad * productoPedido.precio,
      }))
    }))

    return pedidosFinal;
  }

  async findOne(id: number) 
  {
    const pedido = await this.pedidoRepository.createQueryBuilder('pedido')
      .leftJoinAndSelect('pedido.productos', 'productoPedido')
      .leftJoinAndSelect('productoPedido.producto', 'producto')
      .leftJoinAndSelect('producto.categoria', 'categoria')
      .select([
        'pedido.id',
        'pedido.fecha',
        'productoPedido.cantidad',
        'producto.nombre',
        'categoria.nombre',
        'productoPedido.cantidad',
        'productoPedido.precio',
      ])
      .where({ id: id})
      .getOne();

    return {
      id: pedido.id,
      fecha: pedido.fecha,
      productos: pedido.productos.map((productoPedido) => ({
        nombre: productoPedido.producto.nombre,
        categoria: productoPedido.producto?.categoria?.nombre || '',
        cantidad: productoPedido.cantidad,
        precio: productoPedido.precio,
        total: productoPedido.cantidad * productoPedido.precio,
      }))
    };
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto, usuarioModificacion: number): Promise<Pedido> 
  {
    const { estado } = updatePedidoDto;
    //buscar pedido
    const pedido = await this.pedidoRepository.findOneBy({ id: id });
    if (!pedido) 
    {
      throw new NotFoundException('No se pudo encontrar el pedido');
    }

    if (pedido.estado !== 'PENDIENTE') 
    {
       throw new BadRequestException('No se puede realizar el cambio de estado');
    }

    const usuario = await this.usuarioRepository.findOneBy({ id: pedido.idUsuarioCreacion });
    if (!usuario) 
    {
      throw new NotFoundException('No se pudo encontrar al usuario que hizo el pedido');
    }

    const pedidoDetalle = await this.findOne(id);
    this.clientFacturacion.emit('notify_order_generate_bill', pedidoDetalle);
    
    console.log('envio de notificacion')
    this.client.emit('notify_order_status_change', { id: id, estado: estado, email: usuario.correo });

    pedido.estado = estado;

    const pedidoModificado = pedido;
    pedidoModificado.fecha = new Date();
    pedidoModificado.idUsuarioModificacion = usuarioModificacion;
    return await this.pedidoRepository.save(pedidoModificado);
  }


  async remove(id: number) 
  {
    const pedido = await this.pedidoRepository.findOneBy({ id: id });
    if (!pedido) 
    {
      throw new NotFoundException('No se pudo encontrar el pedido');
    }

    this.productoPedidoRepository.createQueryBuilder('productoPedido')
    .delete()
    .where('productoPedido.pedidoId = :id', { id });

    return this.pedidoRepository.delete({id});
  }
}
