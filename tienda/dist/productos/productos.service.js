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
exports.ProductosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const producto_entity_1 = require("./entities/producto.entity");
const categoria_entity_1 = require("../categorias/entities/categoria.entity");
const file_service_1 = require("../common/file.service");
let ProductosService = class ProductosService {
    constructor(productoRepository, categoriaRepository, fileService) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
        this.fileService = fileService;
    }
    async create(createProductoDto, usuarioCreacion) {
        const categoria = await this.categoriaRepository.findOneBy({ id: createProductoDto.idCategoria });
        if (!categoria) {
            throw new common_1.NotFoundException(`La categoría con ID ${createProductoDto.idCategoria} no existe.`);
        }
        const producto = this.productoRepository.create({ ...createProductoDto, categoria, idUsuarioCreacion: usuarioCreacion });
        return this.productoRepository.save(producto);
    }
    async uploadImagen(id, uploadProductoImagen, usuarioModificacion) {
        const producto = await this.productoRepository.findOneBy({ id });
        if (!producto) {
            throw new common_1.NotFoundException('El producto no esta disponible');
        }
        producto.imagen = await this.fileService.save(uploadProductoImagen.imagen, uploadProductoImagen.nombre);
        return await this.productoRepository.save(producto);
    }
    async findAll(pagina) {
        const queryBuilder = this.productoRepository.createQueryBuilder('producto')
            .select(['producto.nombre', 'producto.precio'])
            .skip((pagina - 1) * 4)
            .take(4);
        const [productos, total] = await queryBuilder.getManyAndCount();
        return {
            datos: productos,
            total: total
        };
    }
    findOne(id) {
        return this.productoRepository.findOne({
            where: { id }
        });
    }
    async update(id, updateProductoDto, usuarioModificacion) {
        const producto = await this.productoRepository.findOneBy({ id: id });
        if (!producto) {
            throw new common_1.NotFoundException('No se pudo encontrar el producto');
        }
        producto.nombre = updateProductoDto.nombre;
        producto.precio = updateProductoDto.precio;
        producto.descripcion = updateProductoDto.descripcion;
        producto.estado = updateProductoDto.estado;
        producto.enStock = updateProductoDto.enStock;
        producto.idUsuarioModificacion = usuarioModificacion;
        await this.productoRepository.update(id, producto);
        return this.productoRepository.findOneBy({ id });
    }
    remove(id) {
        return this.productoRepository.delete({ id });
    }
};
exports.ProductosService = ProductosService;
exports.ProductosService = ProductosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __param(1, (0, typeorm_1.InjectRepository)(categoria_entity_1.Categoria)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        file_service_1.FileService])
], ProductosService);
//# sourceMappingURL=productos.service.js.map