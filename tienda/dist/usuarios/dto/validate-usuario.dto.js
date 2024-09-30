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
exports.ValidateUsuarioDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ValidateUsuarioDto {
}
exports.ValidateUsuarioDto = ValidateUsuarioDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de usuario', example: 'Usuario A' }),
    (0, class_validator_1.IsString)({ message: 'El nombre de usuario debe ser texto' }),
    __metadata("design:type", String)
], ValidateUsuarioDto.prototype, "usuario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Clave del usuario', example: '!Qxx123' }),
    (0, class_validator_1.IsString)({ message: 'La clave de usuario debe ser texto' }),
    __metadata("design:type", String)
], ValidateUsuarioDto.prototype, "clave", void 0);
//# sourceMappingURL=validate-usuario.dto.js.map