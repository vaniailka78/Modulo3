import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Paginacion } from 'src/common/paginacion';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { UploadProductoImagenDto } from './dto/upload-producto-imagen.dto';
import { FileService } from 'src/common/file.service';
export declare class ProductosService {
    private readonly productoRepository;
    private readonly categoriaRepository;
    private fileService;
    constructor(productoRepository: Repository<Producto>, categoriaRepository: Repository<Categoria>, fileService: FileService);
    create(createProductoDto: CreateProductoDto, usuarioCreacion: number): Promise<Producto>;
    uploadImagen(id: number, uploadProductoImagen: UploadProductoImagenDto, usuarioModificacion: number): Promise<Producto>;
    findAll(pagina: number): Promise<Paginacion<{
        nombre: string;
        precio: number;
    }>>;
    findOne(id: number): Promise<Producto>;
    update(id: number, updateProductoDto: UpdateProductoDto, usuarioModificacion: number): Promise<Producto>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
