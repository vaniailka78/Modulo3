import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { Role } from 'src/roles/entities/role.entity';
import { AuthService } from 'src/auth/auth.service';
import { PinoLoggerService } from 'src/core/pino-logger.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Role]),
    JwtModule.register({
      secret: process.env.TOKEN_SECRET  || 'test',
      signOptions: {
        expiresIn: +process.env.TOKEN_DURATION  || 3000
      }
    })],
  controllers: [UsuariosController],
  providers: [AuthService, UsuariosService, PinoLoggerService],
  exports: [PinoLoggerService]
})
export class UsuariosModule {}