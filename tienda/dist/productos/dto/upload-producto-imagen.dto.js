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
exports.UploadProductoImagenDto = void 0;
const class_validator_1 = require("class-validator");
class UploadProductoImagenDto {
}
exports.UploadProductoImagenDto = UploadProductoImagenDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'La imagen debe ser texto' }),
    (0, class_validator_1.IsBase64)({}, { message: 'La imagen debe ser en formato base64' }),
    __metadata("design:type", String)
], UploadProductoImagenDto.prototype, "imagen", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre de la imagen debe ser texto' }),
    __metadata("design:type", String)
], UploadProductoImagenDto.prototype, "nombre", void 0);
//# sourceMappingURL=upload-producto-imagen.dto.js.map