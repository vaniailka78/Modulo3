import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificacionesService 
{
  private transporter;
  private emailFrom: string = '';
  private emailpwd: string = '';

  constructor(private configService: ConfigService) 
  {
    this.emailFrom = this.configService.get<string>('EMAIL_USER');
    //console.log(this.emailFrom)

    this.emailpwd = this.configService.get<string>('EMAIL_PASS');
    //console.log(this.emailpwd)


    // Configura el transportador de nodemailer usando las variables de entorno

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // Cambiar a puerto 587 para STARTTLS
      secure: false, // `secure` false para usar STARTTLS
      service: 'gmail',
      auth: {
        user: this.emailFrom,
        pass: this.emailpwd,
      },
      tls: {
        rejectUnauthorized: false, // Evitar problemas con certificados autofirmados
      },
    });
  }

  async sendEmailNotification({ id, estado, email }) 
  {
    console.log(`Se ha enviado la notificacion del pedido con id ${id} con estado ${estado} al mail ${email}`)

    const mailOptions = {
      from: this.emailFrom,
      to: email,
      subject: `Pedido #${id} - estado actualizado`,
      text: `Su pedido ha sido actualizado a: ${estado}`,
    };
    console.log(mailOptions); 
  try 
    {
      await this.transporter.sendMail(mailOptions);
      return { success: true };
    } 
    catch (error) 
    {
      console.error('Error enviando el email:', error);
      return { success: false, error };
    }
  }
}
