"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturacionService = void 0;
const common_1 = require("@nestjs/common");
const PDFDocument = require("pdfkit");
const fs_1 = require("fs");
let FacturacionService = class FacturacionService {
    generateInvoice(pedido) {
        const doc = new PDFDocument();
        const filePath = `././././tmp/archivos/factura_${pedido.id}.pdf`;
        doc.pipe((0, fs_1.createWriteStream)(filePath));
        doc.fontSize(25).text('Factura', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Número de Pedido: ${pedido.id}`);
        doc.text(`Fecha: ${pedido.fecha}`);
        doc.moveDown();
        let total = 0;
        doc.fontSize(12).text(`    Producto     |    Categoria    |    Cantidad    |    Precio    |    Total    `);
        pedido.productos.forEach((producto) => {
            doc.text(`${producto.nombre}      |   ${producto.categoria}  |         ${producto.cantidad}         |        ${producto.precio}      |       ${producto.total}`);
            total = total + producto.total;
            doc.moveDown();
        });
        doc.moveDown();
        doc.moveDown();
        doc.fontSize(18).text(`Total: ${total}`);
        doc.end();
        console.log('factura generada');
        return filePath;
    }
};
exports.FacturacionService = FacturacionService;
exports.FacturacionService = FacturacionService = __decorate([
    (0, common_1.Injectable)()
], FacturacionService);
//# sourceMappingURL=facturacion.service.js.map