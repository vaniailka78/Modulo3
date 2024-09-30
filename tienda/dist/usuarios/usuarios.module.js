"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosModule = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("./usuarios.service");
const usuarios_controller_1 = require("./usuarios.controller");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
const jwt_1 = require("@nestjs/jwt");
const role_entity_1 = require("../roles/entities/role.entity");
const auth_service_1 = require("../auth/auth.service");
const pino_logger_service_1 = require("../core/pino-logger.service");
let UsuariosModule = class UsuariosModule {
};
exports.UsuariosModule = UsuariosModule;
exports.UsuariosModule = UsuariosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([usuario_entity_1.Usuario, role_entity_1.Role]),
            jwt_1.JwtModule.register({
                secret: process.env.TOKEN_SECRET || 'test',
                signOptions: {
                    expiresIn: +process.env.TOKEN_DURATION || 3000
                }
            })
        ],
        controllers: [usuarios_controller_1.UsuariosController],
        providers: [auth_service_1.AuthService, usuarios_service_1.UsuariosService, pino_logger_service_1.PinoLoggerService],
        exports: [pino_logger_service_1.PinoLoggerService]
    })
], UsuariosModule);
//# sourceMappingURL=usuarios.module.js.map