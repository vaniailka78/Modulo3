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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("./roles.decorator");
let RolesGuard = class RolesGuard {
    constructor(jwtService, usuarioService, reflector) {
        this.jwtService = jwtService;
        this.usuarioService = usuarioService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const rolesDecorador = this.reflector.get(roles_decorator_1.ROLES_KEY, context.getHandler());
        if (!rolesDecorador) {
            return true;
        }
        console.log('ROLES DECORADOR');
        console.log(rolesDecorador);
        const peticion = context.switchToHttp().getRequest();
        const autorizacionCabecera = peticion.headers.authorization;
        if (!autorizacionCabecera) {
            throw new common_1.ForbiddenException('Requiere autorizaciòn');
        }
        const [tipo, token] = autorizacionCabecera.split(' ');
        if (tipo !== 'JWT' || !token) {
            throw new common_1.ForbiddenException('Token invalido');
        }
        try {
            const decodificarToken = this.jwtService.verify(token);
            const idUsuario = decodificarToken.id;
            const usuario = await this.usuarioService.findOne(idUsuario);
            if (!usuario) {
                throw new common_1.ForbiddenException('Usuario incorrecto');
            }
            const nombreRoles = usuario.roles.map(role => role.nombre);
            const roles = decodificarToken.roles;
            const verificarRoles = nombreRoles.every(elemento => roles.includes(elemento));
            if (!roles || roles.length == 0 || !verificarRoles) {
                throw new common_1.ForbiddenException('El usuario no tiene roles asignados');
            }
            const tieneRol = rolesDecorador.some(role => nombreRoles.includes(role));
            console.log('Tiene Rol');
            console.log(nombreRoles);
            console.log(tieneRol);
            if (!tieneRol) {
                throw new common_1.ForbiddenException('El usuario no tiene los roles suficientes');
            }
            return true;
        }
        catch (error) {
            throw new common_1.ForbiddenException(error.message || 'No se pudo verificar el token');
        }
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        auth_service_1.AuthService,
        core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map