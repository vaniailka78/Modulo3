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
exports.CategoriasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const categoria_entity_1 = require("./entities/categoria.entity");
const typeorm_2 = require("@nestjs/typeorm");
const pino_logger_service_1 = require("../core/pino-logger.service");
let CategoriasService = class CategoriasService {
    constructor(logger, categoriaRepository) {
        this.logger = logger;
        this.categoriaRepository = categoriaRepository;
    }
    create(createCategoriaDto, usuarioCreacion) {
        this.logger.log('Creacion de categoria', 'CategoriaService');
        this.logger.log(usuarioCreacion);
        const categoria = this.categoriaRepository.create(createCategoriaDto);
        categoria.idUsuarioCreacion = usuarioCreacion;
        return this.categoriaRepository.save(categoria);
    }
    findAll() {
        return this.categoriaRepository.find();
    }
    findOne(id) {
        return this.categoriaRepository.findOne({
            where: { id }
        });
    }
    async update(id, updateCategoriaDto, usuarioModificacion) {
        const categoria = await this.categoriaRepository.findOneBy({ id: id });
        if (!categoria) {
            throw new common_1.NotFoundException(`La categoría con ID ${id} no existe.`);
        }
        categoria.nombre = updateCategoriaDto.nombre;
        categoria.estado = updateCategoriaDto.estado;
        categoria.idUsuarioModificacion = usuarioModificacion;
        await this.categoriaRepository.update(id, categoria);
        return this.categoriaRepository.findOneBy({ id });
    }
    remove(id) {
        return this.categoriaRepository.delete({ id });
    }
};
exports.CategoriasService = CategoriasService;
exports.CategoriasService = CategoriasService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(categoria_entity_1.Categoria)),
    __metadata("design:paramtypes", [pino_logger_service_1.PinoLoggerService,
        typeorm_1.Repository])
], CategoriasService);
//# sourceMappingURL=categorias.service.js.map