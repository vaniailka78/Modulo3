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
exports.FacturacionController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const facturacion_service_1 = require("./facturacion.service");
let FacturacionController = class FacturacionController {
    constructor(facturacionService) {
        this.facturacionService = facturacionService;
    }
    generateInvoice(pedido) {
        console.log(pedido);
        return this.facturacionService.generateInvoice(pedido);
    }
};
exports.FacturacionController = FacturacionController;
__decorate([
    (0, microservices_1.MessagePattern)('notify_order_generate_bill'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FacturacionController.prototype, "generateInvoice", null);
exports.FacturacionController = FacturacionController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [facturacion_service_1.FacturacionService])
], FacturacionController);
//# sourceMappingURL=facturacion.controller.js.map