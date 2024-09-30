"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosModule = void 0;
const common_1 = require("@nestjs/common");
const productos_service_1 = require("./productos.service");
const productos_controller_1 = require("./productos.controller");
const typeorm_1 = require("@nestjs/typeorm");
const producto_entity_1 = require("./entities/producto.entity");
const categoria_entity_1 = require("../categorias/entities/categoria.entity");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const file_service_1 = require("../common/file.service");
let ProductosModule = class ProductosModule {
};
exports.ProductosModule = ProductosModule;
exports.ProductosModule = ProductosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([producto_entity_1.Producto, categoria_entity_1.Categoria, usuario_entity_1.Usuario]),
            jwt_1.JwtModule.register({
                secret: process.env.TOKEN_SECRET || 'test',
                signOptions: {
                    expiresIn: +process.env.TOKEN_DURATION || 3000
                }
            })],
        controllers: [productos_controller_1.ProductosController],
        providers: [auth_service_1.AuthService, productos_service_1.ProductosService, file_service_1.FileService],
    })
], ProductosModule);
//# sourceMappingURL=productos.module.js.map