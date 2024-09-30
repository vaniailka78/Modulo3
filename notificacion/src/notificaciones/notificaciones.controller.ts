import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificacionesService } from './notificaciones.service';

@Controller()
export class NotificacionesController 
{
  constructor(private readonly notificationsService: NotificacionesService) {}

  @MessagePattern('notify_order_status_change')
  handleOrderStatusChange(data: { id: number; estado: string; email: string }) 
  {
    return this.notificationsService.sendEmailNotification(data);
  }
}

