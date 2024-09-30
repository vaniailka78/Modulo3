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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const role_entity_1 = require("./entities/role.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_2 = require("@nestjs/common");
let RolesService = class RolesService {
    constructor(rolRepository) {
        this.rolRepository = rolRepository;
    }
    create(createRoleDto) {
        const role = this.rolRepository.create(createRoleDto);
        return this.rolRepository.save(role);
    }
    findAll() {
        return this.rolRepository.find();
    }
    findOne(id) {
        return this.rolRepository.findOne({
            where: { id }
        });
    }
    async update(id, updateRoleDto, usuarioModificacion) {
        const role = await this.rolRepository.findOneBy({ id: id });
        if (!role) {
            throw new common_2.NotFoundException('No se pudo encontrar el rol');
        }
        role.nombre = updateRoleDto.nombre;
        role.idUsuarioModificacion = usuarioModificacion;
        await this.rolRepository.update(id, role);
        return this.rolRepository.findOneBy({ id });
    }
    remove(id) {
        return this.rolRepository.delete({ id });
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map