"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriasModule = void 0;
const common_1 = require("@nestjs/common");
const categorias_service_1 = require("./categorias.service");
const categorias_controller_1 = require("./categorias.controller");
const typeorm_1 = require("@nestjs/typeorm");
const categoria_entity_1 = require("./entities/categoria.entity");
const pino_logger_service_1 = require("../core/pino-logger.service");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
let CategoriasModule = class CategoriasModule {
};
exports.CategoriasModule = CategoriasModule;
exports.CategoriasModule = CategoriasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([categoria_entity_1.Categoria, usuario_entity_1.Usuario]),
            jwt_1.JwtModule.register({
                secret: process.env.TOKEN_SECRET || 'test',
                signOptions: {
                    expiresIn: +process.env.TOKEN_DURATION || 3000
                }
            })
        ],
        controllers: [categorias_controller_1.CategoriasController],
        providers: [auth_service_1.AuthService, categorias_service_1.CategoriasService, pino_logger_service_1.PinoLoggerService],
        exports: [pino_logger_service_1.PinoLoggerService]
    })
], CategoriasModule);
//# sourceMappingURL=categorias.module.js.map