"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const productos_module_1 = require("./productos/productos.module");
const typeorm_1 = require("@nestjs/typeorm");
const pino_logger_service_1 = require("./core/pino-logger.service");
const categorias_module_1 = require("./categorias/categorias.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const roles_module_1 = require("./roles/roles.module");
const pedidos_module_1 = require("./pedidos/pedidos.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        providers: [pino_logger_service_1.PinoLoggerService],
        exports: [pino_logger_service_1.PinoLoggerService],
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.BD_HOST || 'localhost',
                port: +process.env.BD_PUERTO || 5432,
                username: process.env.BD_USUARIO || 'postgres',
                password: process.env.BD_CLAVE || 'postgres',
                database: process.env.BD_NOMBRE || 'tiendadb',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            productos_module_1.ProductosModule,
            categorias_module_1.CategoriasModule,
            usuarios_module_1.UsuariosModule,
            roles_module_1.RolesModule,
            pedidos_module_1.PedidosModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map