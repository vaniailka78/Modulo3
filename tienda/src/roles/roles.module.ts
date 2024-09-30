import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Usuario]),
  JwtModule.register({
    secret: process.env.TOKEN_SECRET  || 'test',
    signOptions: {
      expiresIn: +process.env.TOKEN_DURATION  || 3000
    }
  })],
  controllers: [RolesController],
  providers: [AuthService, RolesService],
})
export class RolesModule { }
