import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinoLoggerService } from './core/pino-logger.service';
import { CategoriasModule } from './categorias/categorias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RolesModule } from './roles/roles.module';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  providers: [PinoLoggerService],
  exports: [PinoLoggerService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.BD_HOST || 'localhost',
      port: +process.env.BD_PUERTO || 5432,
      username: process.env.BD_USUARIO || 'postgres',
      password: process.env.BD_CLAVE || 'postgres',
      database: process.env.BD_NOMBRE || 'tiendadb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductosModule,
    CategoriasModule,
    UsuariosModule,
    RolesModule,
    PedidosModule],
})
export class AppModule { }

