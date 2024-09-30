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
exports.ProductosController = void 0;
const common_1 = require("@nestjs/common");
const productos_service_1 = require("./productos.service");
const create_producto_dto_1 = require("./dto/create-producto.dto");
const update_producto_dto_1 = require("./dto/update-producto.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_guard_1 = require("../auth/jwt.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const sesion_decorator_1 = require("../auth/sesion.decorator");
const upload_producto_imagen_dto_1 = require("./dto/upload-producto-imagen.dto");
let ProductosController = class ProductosController {
    constructor(productosService) {
        this.productosService = productosService;
    }
    create(sesion, createProductoDto) {
        return this.productosService.create(createProductoDto, sesion?.id);
    }
    upload(id, sesion, uploadProductoImagen) {
        return this.productosService.uploadImagen(+id, uploadProductoImagen, sesion.id);
    }
    findAll(pagina = 1) {
        return this.productosService.findAll(pagina);
    }
    findOne(id) {
        return this.productosService.findOne(+id);
    }
    update(id, sesion, updateProductoDto) {
        return this.productosService.update(+id, updateProductoDto, sesion.id);
    }
    remove(id) {
        return this.productosService.remove(+id);
    }
};
exports.ProductosController = ProductosController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Crear Producto' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Producto creado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'La categoria del producto no fue encontrada' }),
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(['ADMIN']),
    __param(0, (0, sesion_decorator_1.Sesion)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_producto_dto_1.CreateProductoDto]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/imagen'),
    (0, roles_decorator_1.Roles)(['ADMIN']),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, sesion_decorator_1.Sesion)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, upload_producto_imagen_dto_1.UploadProductoImagenDto]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "upload", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar productos por pagina' }),
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(['ADMIN', 'USUARIO']),
    __param(0, (0, common_1.Query)('pagina')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar un producto por su id' }),
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(['ADMIN', 'USUARIO']),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar Producto por su id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Producto actualizado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'El producto no fue encontrado' }),
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(['ADMIN']),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, sesion_decorator_1.Sesion)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, update_producto_dto_1.UpdateProductoDto]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un producto por su id' }),
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(['ADMIN']),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "remove", null);
exports.ProductosController = ProductosController = __decorate([
    (0, swagger_1.ApiTags)('Productos'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('productos'),
    __metadata("design:paramtypes", [productos_service_1.ProductosService])
], ProductosController);
//# sourceMappingURL=productos.controller.js.map