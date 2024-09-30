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
exports.JwtGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
let JwtGuard = class JwtGuard {
    constructor(jwtService, usuarioService) {
        this.jwtService = jwtService;
        this.usuarioService = usuarioService;
    }
    async canActivate(context) {
        const peticion = context.switchToHttp().getRequest();
        const autorizacionCabecera = peticion.headers.authorization;
        if (!autorizacionCabecera) {
            throw new common_1.ForbiddenException('Requiere autorización');
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
            peticion.usuario = usuario;
            return true;
        }
        catch (error) {
            throw new common_1.ForbiddenException('No se pudo verificar el token');
        }
    }
};
exports.JwtGuard = JwtGuard;
exports.JwtGuard = JwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        auth_service_1.AuthService])
], JwtGuard);
//# sourceMappingURL=jwt.guard.js.map