import { Producto } from "src/productos/entities/producto.entity";
import { BaseAuditoria } from "src/core/base-auditoria.entity";
export declare class Categoria extends BaseAuditoria {
    id: number;
    nombre: string;
    estado: string;
    productos: Producto[];
}
