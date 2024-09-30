import { NotificacionesService } from './notificaciones.service';
export declare class NotificacionesController {
    private readonly notificationsService;
    constructor(notificationsService: NotificacionesService);
    handleOrderStatusChange(data: {
        id: number;
        estado: string;
        email: string;
    }): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
}
