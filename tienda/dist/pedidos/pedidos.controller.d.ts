import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
export declare class PedidosController {
    private readonly pedidosService;
    constructor(pedidosService: PedidosService);
    create(sesion: any, createPedidoDto: CreatePedidoDto): Promise<import("./entities/pedido.entity").Pedido>;
    findAll(): Promise<import("./interface/pedido.interface").PedidoDto[]>;
    findOne(id: string): Promise<{
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
    update(sesion: any, id: string, updatePedidoDto: UpdatePedidoDto): Promise<import("./entities/pedido.entity").Pedido>;
    rremove(id: number): Promise<import("typeorm").DeleteResult>;
}
