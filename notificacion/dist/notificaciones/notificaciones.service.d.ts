import { ConfigService } from '@nestjs/config';
export declare class NotificacionesService {
    private configService;
    private transporter;
    private emailFrom;
    private emailpwd;
    constructor(configService: ConfigService);
    sendEmailNotification({ id, estado, email }: {
        id: any;
        estado: any;
        email: any;
    }): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
}
