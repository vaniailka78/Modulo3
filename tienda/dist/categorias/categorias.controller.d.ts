import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
export declare class CategoriasController {
    private readonly categoriasService;
    constructor(categoriasService: CategoriasService);
    create(sesion: any, createCategoriaDto: CreateCategoriaDto): Promise<import("./entities/categoria.entity").Categoria>;
    findAll(): Promise<import("./entities/categoria.entity").Categoria[]>;
    findOne(id: number): Promise<import("./entities/categoria.entity").Categoria>;
    update(id: number, sesion: any, updateCategoriaDto: UpdateCategoriaDto): Promise<import("./entities/categoria.entity").Categoria>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
