import { Module } from '@nestjs/common';
import { FacturacionService } from './facturacion/facturacion.service';
import { FacturacionController } from './facturacion/facturacion.controller';

@Module({
  imports: [],
  controllers: [FacturacionController],
  providers: [FacturacionService],
})
export class AppModule {}
