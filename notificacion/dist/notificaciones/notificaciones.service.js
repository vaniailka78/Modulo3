"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificacionesService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const config_1 = require("@nestjs/config");
let NotificacionesService = class NotificacionesService {
    constructor(configService) {
        this.configService = configService;
        this.emailFrom = '';
        this.emailpwd = '';
        this.emailFrom = this.configService.get('EMAIL_USER');
        this.emailpwd = this.configService.get('EMAIL_PASS');
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            service: 'gmail',
            auth: {
                user: this.emailFrom,
                pass: this.emailpwd,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }
    async sendEmailNotification({ id, estado, email }) {
        console.log(`Se ha enviado la notificacion del pedido con id ${id} con estado ${estado} al mail ${email}`);
        const mailOptions = {
            from: this.emailFrom,
            to: email,
            subject: `Pedido #${id} - estado actualizado`,
            text: `Su pedido ha sido actualizado a: ${estado}`,
        };
        console.log(mailOptions);
        try {
            await this.transporter.sendMail(mailOptions);
            return { success: true };
        }
        catch (error) {
            console.error('Error enviando el email:', error);
            return { success: false, error };
        }
    }
};
exports.NotificacionesService = NotificacionesService;
exports.NotificacionesService = NotificacionesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NotificacionesService);
//# sourceMappingURL=notificaciones.service.js.map