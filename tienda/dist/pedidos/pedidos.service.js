"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const producto_entity_1 = require("../productos/entities/producto.entity");
const producto_pedido_entity_1 = require("./entities/producto-pedido.entity");
const pedido_entity_1 = require("./entities/pedido.entity");
const microservices_1 = require("@nestjs/microservices");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
let PedidosService = class PedidosService {
    constructor(pedidoRepository, productoPedidoRepository, productoRepository, usuarioRepository, dataSource) {
        this.pedidoRepository = pedidoRepository;
        this.productoPedidoRepository = productoPedidoRepository;
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
        this.dataSource = dataSource;
        this.client = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.TCP,
            options: { host: 'localhost', port: 8877 },
        });
        this.clientFacturacion = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.TCP,
            options: { host: 'localhost', port: 3001 },
        });
    }
    async create(createPedidoDto, usuarioCreacion) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const nuevoPedido = new pedido_entity_1.Pedido();
            nuevoPedido.fecha = new Date();
            nuevoPedido.idUsuarioCreacion = usuarioCreacion;
            const pedidoCreado = await queryRunner.manager.save(nuevoPedido);
            for (const productoPedidoDto of createPedidoDto.productos) {
                const producto = await this.productoRepository.findOne({ where: { id: productoPedidoDto.idProducto } });
                if (!producto) {
                    throw new common_1.BadRequestException(`El producto con id ${productoPedidoDto.idProducto} no existe`);
                }
                if (producto.estado !== 'ACTIVO') {
                    throw new common_1.BadRequestException(`El producto con id ${productoPedidoDto.idProducto} no esta ACTIVO`);
                }
                if (producto.enStock < productoPedidoDto.cantidad) {
                    throw new common_1.BadRequestException(`No se cuenta con la cantidad requerida del producto con id ${productoPedidoDto.idProducto}`);
                }
                const nuevoProductoPedido = new producto_pedido_entity_1.ProductoPedido();
                nuevoProductoPedido.pedido = pedidoCreado;
                nuevoProductoPedido.producto = producto;
                nuevoProductoPedido.cantidad = productoPedidoDto.cantidad;
                nuevoProductoPedido.precio = productoPedidoDto.precio;
                await queryRunner.manager.save(nuevoProductoPedido);
            }
            await queryRunner.commitTransaction();
            return pedidoCreado;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.BadRequestException(`No se pudo realizar la creacion del pedido: ${error.message}`);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll() {
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
        }));
        return pedidosFinal;
    }
    async findOne(id) {
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
            .where({ id: id })
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
    async update(id, updatePedidoDto, usuarioModificacion) {
        const { estado } = updatePedidoDto;
        const pedido = await this.pedidoRepository.findOneBy({ id: id });
        if (!pedido) {
            throw new common_1.NotFoundException('No se pudo encontrar el pedido');
        }
        if (pedido.estado !== 'PENDIENTE') {
            throw new common_1.BadRequestException('No se puede realizar el cambio de estado');
        }
        const usuario = await this.usuarioRepository.findOneBy({ id: pedido.idUsuarioCreacion });
        if (!usuario) {
            throw new common_1.NotFoundException('No se pudo encontrar al usuario que hizo el pedido');
        }
        const pedidoDetalle = await this.findOne(id);
        this.clientFacturacion.emit('notify_order_generate_bill', pedidoDetalle);
        console.log('envio de notificacion');
        this.client.emit('notify_order_status_change', { id: id, estado: estado, email: usuario.correo });
        pedido.estado = estado;
        const pedidoModificado = pedido;
        pedidoModificado.fecha = new Date();
        pedidoModificado.idUsuarioModificacion = usuarioModificacion;
        return await this.pedidoRepository.save(pedidoModificado);
    }
    async remove(id) {
        const pedido = await this.pedidoRepository.findOneBy({ id: id });
        if (!pedido) {
            throw new common_1.NotFoundException('No se pudo encontrar el pedido');
        }
        this.productoPedidoRepository.createQueryBuilder('productoPedido')
            .delete()
            .where('productoPedido.pedidoId = :id', { id });
        return this.pedidoRepository.delete({ id });
    }
};
exports.PedidosService = PedidosService;
exports.PedidosService = PedidosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(pedido_entity_1.Pedido)),
    __param(1, (0, typeorm_2.InjectRepository)(producto_pedido_entity_1.ProductoPedido)),
    __param(2, (0, typeorm_2.InjectRepository)(producto_entity_1.Producto)),
    __param(3, (0, typeorm_2.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.DataSource])
], PedidosService);
//# sourceMappingURL=pedidos.service.js.map