import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Repository, DataSource } from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { ProductoPedido } from './entities/producto-pedido.entity';
import { Pedido } from './entities/pedido.entity';
import { PedidoDto } from './interface/pedido.interface';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
export declare class PedidosService {
    private pedidoRepository;
    private productoPedidoRepository;
    private productoRepository;
    private usuarioRepository;
    private dataSource;
    private client;
    private clientFacturacion;
    constructor(pedidoRepository: Repository<Pedido>, productoPedidoRepository: Repository<ProductoPedido>, productoRepository: Repository<Producto>, usuarioRepository: Repository<Usuario>, dataSource: DataSource);
    create(createPedidoDto: CreatePedidoDto, usuarioCreacion: number): Promise<Pedido>;
    findAll(): Promise<PedidoDto[]>;
    findOne(id: number): Promise<{
        id: number;
        fecha: Date;
        productos: {
            nombre: string;
            categoria: string;
            cantidad: number;
            precio: number;
            total: number;
        }[];
    }>;
    update(id: number, updatePedidoDto: UpdatePedidoDto, usuarioModificacion: number): Promise<Pedido>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
