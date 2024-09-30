import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Paginacion } from 'src/common/paginacion';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { UploadProductoImagenDto } from './dto/upload-producto-imagen.dto';
import { FileService } from 'src/common/file.service';

@Injectable()
export class ProductosService 
{
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,

    private fileService: FileService,
  ) { }

  async create(createProductoDto: CreateProductoDto, usuarioCreacion: number): Promise<Producto> 
  {
    const categoria = await this.categoriaRepository.findOneBy({ id: createProductoDto.idCategoria });
    if (!categoria) 
      {
      throw new NotFoundException(`La categoría con ID ${createProductoDto.idCategoria} no existe.`);
      }
    const producto = this.productoRepository.create({ ...createProductoDto, categoria, idUsuarioCreacion:usuarioCreacion })
    return this.productoRepository.save(producto)
  }

  //Todos los productos, con todas sus columnas
  /*findAll():Promise <Producto[]>
  {
    return this.productoRepository.find();
  }*/

  //Todos los productos con solo dos columnas: nombre y precio
  /*findAll() : Promise<any[]>
  {
    return this.productoRepository.createQueryBuilder('producto')
    .select(['producto.nombre', 'producto.precio'])
    .getRawMany();
  }*/

  //Los productos paginados (de 4 en cuatro) con solo dos columnas: nombre y precio
  /*findAll(pagina: number) : Promise<any[]>
  {
    return this.productoRepository.createQueryBuilder('producto')
    .select(['producto.nombre', 'producto.precio'])
    .skip( (pagina - 1) *4 )
    .take(4)
    .getRawMany();
  }*/

  async uploadImagen(id: number, uploadProductoImagen: UploadProductoImagenDto, usuarioModificacion: number)
  {
    const producto = await this.productoRepository.findOneBy({id});
    if (!producto)
      {
      throw new NotFoundException('El producto no esta disponible')
      }

    producto.imagen = await this.fileService.save(uploadProductoImagen.imagen, uploadProductoImagen.nombre);
    return await this.productoRepository.save(producto);
  }

  async findAll(pagina: number): Promise<Paginacion<{ nombre: string; precio: number }>> 
  {
    const queryBuilder = this.productoRepository.createQueryBuilder('producto')
      .select(['producto.nombre', 'producto.precio'])
      .skip((pagina - 1) * 4)
      .take(4);

    const [productos, total] = await queryBuilder.getManyAndCount();
    return {
      datos: productos,
      total: total
    }
  }

  findOne(id: number) 
  {
    return this.productoRepository.findOne({
        where:{id}
      })
  }

  async update(id: number, updateProductoDto: UpdateProductoDto, usuarioModificacion: number): Promise<Producto> 
  {
    //buscar producto
    const producto = await this.productoRepository.findOneBy({ id: id });
    if (!producto) 
      {
      throw new NotFoundException('No se pudo encontrar el producto');
      }

    producto.nombre = updateProductoDto.nombre;
    producto.precio = updateProductoDto.precio;
    producto.descripcion = updateProductoDto.descripcion;
    producto.estado = updateProductoDto.estado;
    producto.enStock = updateProductoDto.enStock;
    producto.idUsuarioModificacion = usuarioModificacion;
    await this.productoRepository.update(id, producto);
    return this.productoRepository.findOneBy({ id })
  }

  remove(id: number) 
  {
    return this.productoRepository.delete({id});
  }
}

