// facturacion.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FacturacionService } from './facturacion.service';
import { PedidoDto } from './interfaces/pedido.interface'; // Importa las interfaces

@Controller()
export class FacturacionController 
{
    constructor(private readonly facturacionService: FacturacionService) {}

    @MessagePattern('notify_order_generate_bill')
    generateInvoice(pedido: PedidoDto) 
    {
        console.log(pedido)
        return this.facturacionService.generateInvoice(pedido);
    }
}
