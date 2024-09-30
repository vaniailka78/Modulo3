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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const common_2 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const role_entity_1 = require("../roles/entities/role.entity");
const pino_logger_service_1 = require("../core/pino-logger.service");
let UsuariosService = class UsuariosService {
    constructor(usuarioRepository, roleRepository, jwtService, logger) {
        this.usuarioRepository = usuarioRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
        this.logger = logger;
    }
    async register(registrarUsuarioDto) {
        const rol = await this.roleRepository.findOne({ where: { nombre: 'USUARIO' } });
        if (!rol) {
            throw new common_2.NotFoundException('No se pudo verificar el rol USUARIO');
        }
        registrarUsuarioDto.clave = await bcrypt.hash(registrarUsuarioDto.clave, 10);
        const usuario = this.usuarioRepository.create(registrarUsuarioDto);
        usuario.roles = [rol];
        return this.usuarioRepository.save(usuario);
    }
    async create(createUsuarioDto, usuarioCreacion) {
        createUsuarioDto.clave = await bcrypt.hash(createUsuarioDto.clave, 10);
        const roles = await this.roleRepository.find({
            where: createUsuarioDto.roles.map((roleNombre) => ({ nombre: roleNombre }))
        });
        if (roles.length !== createUsuarioDto.roles.length) {
            throw new common_2.NotFoundException('No se encontraron los roles requeridos');
        }
        const usuario = this.usuarioRepository.create({
            usuario: createUsuarioDto.usuario,
            clave: createUsuarioDto.clave,
            correo: createUsuarioDto.correo,
            roles: roles,
            idUsuarioCreacion: usuarioCreacion
        });
        return this.usuarioRepository.save(usuario);
    }
    async createADMIN(createUsuarioDto) {
        return this.create(createUsuarioDto, 0);
    }
    async validate(validateUsuarioDto) {
        const usuario = await this.usuarioRepository.findOne({ where: { usuario: validateUsuarioDto.usuario } });
        if (!usuario) {
            throw new common_2.NotFoundException('No se pudo verificar el usuario');
        }
        const compararClave = await bcrypt.compare(validateUsuarioDto.clave, usuario.clave);
        if (compararClave) {
            const payload = {
                usuario: usuario.usuario,
                id: usuario.id,
            };
            return {
                access_token: this.jwtService.sign(payload)
            };
        }
        throw new common_2.NotFoundException('No se pudo verificar la clave del usuario');
    }
    async login(validateUsuarioDto) {
        const usuario = await this.usuarioRepository.findOne({ where: { usuario: validateUsuarioDto.usuario }, relations: ['roles'] });
        if (!usuario) {
            throw new common_2.NotFoundException('No se pudo verificar el usuario');
        }
        const compararClave = await bcrypt.compare(validateUsuarioDto.clave, usuario.clave);
        if (compararClave) {
            const nombreRoles = usuario.roles.map(role => role.nombre);
            const payload = {
                usuario: usuario.usuario,
                id: usuario.id,
                roles: nombreRoles
            };
            return {
                access_token: this.jwtService.sign(payload)
            };
        }
        return 'Login fallido';
    }
    findAll() {
        return this.usuarioRepository.createQueryBuilder('usuario')
            .select(['usuario.usuario', 'usuario.correo'])
            .getRawMany();
    }
    findOne(id) {
        return this.usuarioRepository.findOne({
            where: { id }, relations: ['roles']
        });
    }
    async update(id, updateUsuarioDto, usuarioModificacion) {
        const usuario = await this.usuarioRepository.findOneBy({ id: id });
        if (!usuario) {
            throw new common_2.NotFoundException('No se pudo encontrar el usuario');
        }
        updateUsuarioDto.clave = await bcrypt.hash(updateUsuarioDto.clave, 10);
        usuario.usuario = updateUsuarioDto.usuario;
        usuario.clave = updateUsuarioDto.clave;
        usuario.correo = updateUsuarioDto.correo;
        usuario.idUsuarioModificacion = usuarioModificacion;
        await this.usuarioRepository.update(id, usuario);
        return this.usuarioRepository.findOneBy({ id });
    }
    remove(id) {
        return this.usuarioRepository.delete({ id });
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        pino_logger_service_1.PinoLoggerService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map