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
exports.RegistrarUsuarioDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class RegistrarUsuarioDto {
}
exports.RegistrarUsuarioDto = RegistrarUsuarioDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de usuario', example: 'Usuario A' }),
    (0, class_validator_1.IsString)({ message: 'El nombre de usuario debe ser texto' }),
    __metadata("design:type", String)
], RegistrarUsuarioDto.prototype, "usuario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Clave del usuario', example: '!Qxx123' }),
    (0, class_validator_1.IsString)({ message: 'La clave de usuario debe ser texto' }),
    __metadata("design:type", String)
], RegistrarUsuarioDto.prototype, "clave", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Correo electronico del usuario', example: 'usuarioA@gmail.com' }),
    (0, class_validator_1.IsString)({ message: 'El correo electronico del usuario debe ser texto' }),
    __metadata("design:type", String)
], RegistrarUsuarioDto.prototype, "correo", void 0);
//# sourceMappingURL=register-usuario.js.map