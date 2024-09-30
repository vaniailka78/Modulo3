// facturacion.service.ts
import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import { PedidoDto } from './interfaces/pedido.interface'; // Importa las interfaces

@Injectable()
export class FacturacionService 
{
    generateInvoice(pedido: PedidoDto): string 
    {
        const doc = new PDFDocument();
        const filePath = `././././tmp/archivos/factura_${pedido.id}.pdf`;

        // Crear el archivo PDF
        doc.pipe(createWriteStream(filePath));

        // Agregar contenido al PDF
        doc.fontSize(25).text('Factura', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Número de Pedido: ${pedido.id}`);
        doc.text(`Fecha: ${pedido.fecha}`);
        doc.moveDown();

        //Para calcular el monto total de la factura
        let total = 0;
        // Agregar información del pedido
        //cabeceras
        doc.fontSize(12).text(`    Producto     |    Categoria    |    Cantidad    |    Precio    |    Total    `)
        pedido.productos.forEach((producto) => {
            doc.text(`${producto.nombre}      |   ${producto.categoria}  |         ${producto.cantidad}         |        ${producto.precio}      |       ${producto.total}`);
            total = total + producto.total;
            doc.moveDown();
        });

        //Monto total
        doc.moveDown();
        doc.moveDown();
        doc.fontSize(18).text(`Total: ${total}`);

        // Cerrar el PDF
        doc.end();

        console.log('factura generada')
        return filePath; // Retornar el archivo generado
    }
}

