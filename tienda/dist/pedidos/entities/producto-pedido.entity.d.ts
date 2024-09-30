import { Producto } from "src/productos/entities/producto.entity";
import { Pedido } from "./pedido.entity";
export declare class ProductoPedido {
    id: number;
    cantidad: number;
    precio: number;
    pedido: Pedido;
    producto: Producto;
}
