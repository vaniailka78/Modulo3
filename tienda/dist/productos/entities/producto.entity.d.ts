import { Categoria } from "src/categorias/entities/categoria.entity";
import { BaseAuditoria } from "src/core/base-auditoria.entity";
export declare class Producto extends BaseAuditoria {
    id: number;
    nombre: string;
    precio: number;
    descripcion?: string;
    imagen?: string;
    estado: string;
    enStock: number;
    categoria: Categoria;
}
