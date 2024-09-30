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
exports.PedidosController = void 0;
const common_1 = require("@nestjs/common");
const pedidos_service_1 = require("./pedidos.service");
const create_pedido_dto_1 = require("./dto/create-pedido.dto");
const update_pedido_dto_1 = require("./dto/update-pedido.dto");
const jwt_guard_1 = require("../auth/jwt.guard");
const roles_guard_1 = require("../auth/roles.guard");
const sesion_decorator_1 = require("../auth/sesion.decorator");
const roles_decorator_1 = require("../auth/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
let PedidosController = class PedidosController {
    constructor(pedidosService) {
        this.pedidosService = pedidosService;
    }
    create(sesion, createPedidoDto) {
        return this.pedidosService.create(createPedidoDto, sesion.id);
    }
    findAll() {
        return this.pedidosService.findAll();
    }
    findOne(id) {
        return this.pedidosService.findOne(+id);
    }
    update(sesion, id, updatePedidoDto) {
        return this.pedidosService.update(+id, updatePedidoDto, sesion.id);
    }
    rremove(id) {
        return this.pedidosService.remove(+id);
    }
};
exports.PedidosController = PedidosController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Crear Pedido' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pedido creada exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: `El producto no existe, no esta activo o no hay cantidad suficiente en stock` }),
    (0, swagger_1.ApiResponse)({ status: 404, description: `No se pudo realizar la creacion del pedido` }),
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(['ADMIN', 'USUARIO']),
    __param(0, (0, sesion_decorator_1.Sesion)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_pedido_dto_1.CreatePedidoDto]),
    __metadata("design:returntype", void 0)
], PedidosController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar pedidos' }),
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(['ADMIN']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PedidosController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar un pedido por su id' }),
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(['ADMIN', 'USUARIO']),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PedidosController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar pedido' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pedido actualizado exitosamente' }),
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(['ADMIN']),
    __param(0, (0, sesion_decorator_1.Sesion)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_pedido_dto_1.UpdatePedidoDto]),
    __metadata("design:returntype", void 0)
], PedidosController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una categoria por su id' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PedidosController.prototype, "rremove", null);
exports.PedidosController = PedidosController = __decorate([
    (0, swagger_1.ApiTags)('Pedidos'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('pedidos'),
    __metadata("design:paramtypes", [pedidos_service_1.PedidosService])
], PedidosController);
//# sourceMappingURL=pedidos.controller.js.map