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
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("./usuarios.service");
const create_usuario_dto_1 = require("./dto/create-usuario.dto");
const update_usuario_dto_1 = require("./dto/update-usuario.dto");
const validate_usuario_dto_1 = require("./dto/validate-usuario.dto");
const swagger_1 = require("@nestjs/swagger");
const register_usuario_1 = require("./dto/register-usuario");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_guard_1 = require("../auth/jwt.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const sesion_decorator_1 = require("../auth/sesion.decorator");
let UsuariosController = class UsuariosController {
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
    }
    creatADMIN(createUsuarioDto) {
        return this.usuariosService.createADMIN(createUsuarioDto);
    }
    create(sesion, createUsuarioDto) {
        return this.usuariosService.create(createUsuarioDto, sesion?.id);
    }
    validation(validateUsuarioDto) {
        return this.usuariosService.validate(validateUsuarioDto);
    }
    login(validateUsuarioDto) {
        return this.usuariosService.login(validateUsuarioDto);
    }
    register(registrarUsuarioDto) {
        return this.usuariosService.register(registrarUsuarioDto);
    }
    findAll() {
        return this.usuariosService.findAll();
    }
    findOne(id) {
        return this.usuariosService.findOne(+id);
    }
    update(id, sesion, updateUsuarioDto) {
        return this.usuariosService.update(+id, updateUsuarioDto, sesion?.id);
    }
    remove(id) {
        return this.usuariosService.remove(+id);
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Crear usuario Administrador' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Administrador creado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'El administrador no fue creado' }),
    (0, common_1.Post)('/admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usuario_dto_1.CreateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "creatADMIN", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Crear usuario' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario creado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'El usuario no fue creado' }),
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(['ADMIN']),
    __param(0, (0, sesion_decorator_1.Sesion)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_usuario_dto_1.CreateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Validar usuario' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario validado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No se pudo validar al usuario' }),
    (0, common_1.Post)('/validar'),
    (0, roles_decorator_1.Roles)(['ADMIN']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validate_usuario_dto_1.ValidateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "validation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login para usuario' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login exitoso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Login fallido' }),
    (0, common_1.Post)('/login'),
    (0, roles_decorator_1.Roles)(['ADMIN', 'USUARIO']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validate_usuario_dto_1.ValidateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Registrar usuario' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario creado exitosamente' }),
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_usuario_1.RegistrarUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Listar usuarios' }),
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(['ADMIN']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Listar un usuario por su id' }),
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(['ADMIN']),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar usuario' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario actualizado exitosamente' }),
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(['ADMIN']),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, sesion_decorator_1.Sesion)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_usuario_dto_1.UpdateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un usuario por su id' }),
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(['ADMIN']),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "remove", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, swagger_1.ApiTags)('Usuarios'),
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map