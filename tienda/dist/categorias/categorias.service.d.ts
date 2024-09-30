import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { PinoLoggerService } from 'src/core/pino-logger.service';
export declare class CategoriasService {
    private readonly logger;
    private readonly categoriaRepository;
    constructor(logger: PinoLoggerService, categoriaRepository: Repository<Categoria>);
    create(createCategoriaDto: CreateCategoriaDto, usuarioCreacion: number): Promise<Categoria>;
    findAll(): Promise<Categoria[]>;
    findOne(id: number): Promise<Categoria>;
    update(id: number, updateCategoriaDto: UpdateCategoriaDto, usuarioModificacion: number): Promise<Categoria>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
