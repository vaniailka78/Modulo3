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
exports.UpdateRoleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_role_dto_1 = require("./create-role.dto");
const class_validator_1 = require("class-validator");
const swagger_2 = require("@nestjs/swagger");
class UpdateRoleDto extends (0, swagger_1.PartialType)(create_role_dto_1.CreateRoleDto) {
}
exports.UpdateRoleDto = UpdateRoleDto;
__decorate([
    (0, swagger_2.ApiProperty)({ description: 'Nombre del rol', example: 'ADMIN' }),
    (0, class_validator_1.IsString)({ message: 'El nombre del rol debe ser texto' }),
    __metadata("design:type", String)
], UpdateRoleDto.prototype, "nombre", void 0);
//# sourceMappingURL=update-role.dto.js.map