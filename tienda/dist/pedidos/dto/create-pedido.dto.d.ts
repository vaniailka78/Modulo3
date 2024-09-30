declare class ProductoPedidoDto {
    idProducto: number;
    cantidad: number;
    precio: number;
}
export declare class CreatePedidoDto {
    productos: ProductoPedidoDto[];
}
export {};
