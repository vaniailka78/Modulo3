import { FacturacionService } from './facturacion.service';
import { PedidoDto } from './interfaces/pedido.interface';
export declare class FacturacionController {
    private readonly facturacionService;
    constructor(facturacionService: FacturacionService);
    generateInvoice(pedido: PedidoDto): string;
}
