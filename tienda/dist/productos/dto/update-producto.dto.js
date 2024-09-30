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
exports.UpdateProductoDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateProductoDto {
}
exports.UpdateProductoDto = UpdateProductoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del producto', example: 'Producto A' }),
    (0, class_validator_1.IsString)({ message: 'El nombre del producto debe ser una cadena' }),
    __metadata("design:type", String)
], UpdateProductoDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Precio del producto', example: 19 }),
    (0, class_validator_1.IsNumber)({}, { message: 'El precio debe ser numérico' }),
    __metadata("design:type", Number)
], UpdateProductoDto.prototype, "precio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descripcion del producto', example: 'Descripcion del producto A' }),
    (0, class_validator_1.IsString)({ message: 'La descripcion del producto debe ser una cadena' }),
    __metadata("design:type", String)
], UpdateProductoDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estado del producto', example: 'ACTIVO' }),
    (0, class_validator_1.IsString)({ message: 'El estado del producto debe ser texto' }),
    __metadata("design:type", String)
], UpdateProductoDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'La cantidad del producto en alamacen', example: 19 }),
    (0, class_validator_1.IsNumber)({}, { message: 'La cantidad del producto en alamacen debe ser numérico' }),
    __metadata("design:type", Number)
], UpdateProductoDto.prototype, "enStock", void 0);
//# sourceMappingURL=update-producto.dto.js.map