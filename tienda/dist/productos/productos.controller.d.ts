import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { UploadProductoImagenDto } from './dto/upload-producto-imagen.dto';
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    create(sesion: any, createProductoDto: CreateProductoDto): Promise<import("./entities/producto.entity").Producto>;
    upload(id: string, sesion: any, uploadProductoImagen: UploadProductoImagenDto): Promise<import("./entities/producto.entity").Producto>;
    findAll(pagina?: number): Promise<import("../common/paginacion").Paginacion<{
        nombre: string;
        precio: number;
    }>>;
    findOne(id: number): Promise<import("./entities/producto.entity").Producto>;
    update(id: number, sesion: any, updateProductoDto: UpdateProductoDto): Promise<import("./entities/producto.entity").Producto>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
