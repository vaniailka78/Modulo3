"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosModule = void 0;
const common_1 = require("@nestjs/common");
const pedidos_service_1 = require("./pedidos.service");
const pedidos_controller_1 = require("./pedidos.controller");
const producto_entity_1 = require("../productos/entities/producto.entity");
const pedido_entity_1 = require("./entities/pedido.entity");
const producto_pedido_entity_1 = require("./entities/producto-pedido.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
let PedidosModule = class PedidosModule {
};
exports.PedidosModule = PedidosModule;
exports.PedidosModule = PedidosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([producto_entity_1.Producto, pedido_entity_1.Pedido, producto_pedido_entity_1.ProductoPedido, usuario_entity_1.Usuario]), jwt_1.JwtModule.register({
                secret: process.env.TOKEN_SECRET || 'test',
                signOptions: {
                    expiresIn: +process.env.TOKEN_DURATION || 3000
                }
            })],
        controllers: [pedidos_controller_1.PedidosController],
        providers: [auth_service_1.AuthService, pedidos_service_1.PedidosService],
    })
], PedidosModule);
//# sourceMappingURL=pedidos.module.js.map