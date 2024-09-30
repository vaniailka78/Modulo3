import { Module } from '@nestjs/common';
import { NotificacionesController } from './notificaciones/notificaciones.controller'; 
import { NotificacionesService } from './notificaciones/notificaciones.service'; 
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [NotificacionesController],
  providers: [NotificacionesService],
})
export class AppModule {}
