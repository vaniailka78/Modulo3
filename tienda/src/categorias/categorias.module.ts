import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { PinoLoggerService } from 'src/core/pino-logger.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Categoria, Usuario]),
    JwtModule.register({
    secret: process.env.TOKEN_SECRET  || 'test',
    signOptions: {
      expiresIn: +process.env.TOKEN_DURATION  || 3000
    }
  })],
  controllers: [CategoriasController],
  providers: [AuthService, CategoriasService, PinoLoggerService],
  exports: [PinoLoggerService]
})
export class CategoriasModule {}