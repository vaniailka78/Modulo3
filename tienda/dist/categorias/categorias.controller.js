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
exports.CategoriasController = void 0;
const common_1 = require("@nestjs/common");
const categorias_service_1 = require("./categorias.service");
const create_categoria_dto_1 = require("./dto/create-categoria.dto");
const update_categoria_dto_1 = require("./dto/update-categoria.dto");
const swagger_1 = require("@nestjs/swagger");
const sesion_decorator_1 = require("../auth/sesion.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_guard_1 = require("../auth/jwt.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
let CategoriasController = class CategoriasController {
    constructor(categoriasService) {
        this.categoriasService = categoriasService;
    }
    create(sesion, createCategoriaDto) {
        return this.categoriasService.create(createCategoriaDto, sesion?.id);
    }
    findAll() {
        return this.categoriasService.findAll();
    }
    findOne(id) {
        return this.categoriasService.findOne(+id);
    }
    update(id, sesion, updateCategoriaDto) {
        return this.categoriasService.update(+id, updateCategoriaDto, sesion?.id);
    }
    remove(id) {
        return this.categoriasService.remove(+id);
    }
};
exports.CategoriasController = CategoriasController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Crear Categoria' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Categoria creada exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'La categoria no fue creada' }),
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(['ADMIN']),
    __param(0, (0, sesion_decorator_1.Sesion)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_categoria_dto_1.CreateCategoriaDto]),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar categorias' }),
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(['ADMIN', 'USUARIO']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar una categoria por su id' }),
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(['ADMIN', 'USUARIO']),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar Categoria' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Categoria actualizada exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'La categoria no existe' }),
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(['ADMIN']),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, sesion_decorator_1.Sesion)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, update_categoria_dto_1.UpdateCategoriaDto]),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una categoria por su id' }),
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(['ADMIN']),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "remove", null);
exports.CategoriasController = CategoriasController = __decorate([
    (0, swagger_1.ApiTags)('Categorias'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('categorias'),
    __metadata("design:paramtypes", [categorias_service_1.CategoriasService])
], CategoriasController);
//# sourceMappingURL=categorias.controller.js.map