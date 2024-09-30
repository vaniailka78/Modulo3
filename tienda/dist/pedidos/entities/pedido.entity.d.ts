import { ProductoPedido } from './producto-pedido.entity';
import { BaseAuditoria } from 'src/core/base-auditoria.entity';
export declare class Pedido extends BaseAuditoria {
    id: number;
    fecha: Date;
    estado: string;
    productos: ProductoPedido[];
}
