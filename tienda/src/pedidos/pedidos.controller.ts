import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Sesion } from 'src/auth/sesion.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Pedidos')

@UseGuards(JwtGuard, RolesGuard)
@Controller('pedidos')
export class PedidosController 
{
  constructor(private readonly pedidosService: PedidosService) {}

  @ApiOperation({ summary: 'Crear Pedido'})
  @ApiResponse({ status: 200, description: 'Pedido creada exitosamente'})
  @ApiResponse({ status: 400, description: `El producto no existe, no esta activo o no hay cantidad suficiente en stock`})
  @ApiResponse({ status: 404, description: `No se pudo realizar la creacion del pedido`})
  @Post()
  @Roles(['ADMIN', 'USUARIO']) 
  create(
    @Sesion() sesion, 
    @Body() createPedidoDto: CreatePedidoDto) 
  {
    return this.pedidosService.create(createPedidoDto, sesion.id);
  }
  
  @ApiOperation({ summary: 'Listar pedidos'})
  @Get()
  @Roles(['ADMIN'])
  findAll() 
  {
    return this.pedidosService.findAll();
  }

  @ApiOperation({ summary: 'Listar un pedido por su id'})
  @Get(':id')
  @Roles(['ADMIN', 'USUARIO'])
  findOne(@Param('id') id: string) 
  {
    return this.pedidosService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar pedido'})
  @ApiResponse({ status: 200, description: 'Pedido actualizado exitosamente'})
  @Patch(':id')
  @Roles(['ADMIN'])
  update(@Sesion() sesion, @Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) 
  {
    return this.pedidosService.update(+id, updatePedidoDto, sesion.id);
  }

  @ApiOperation({ summary: 'Eliminar una categoria por su id'})
  @Delete(':id')
  rremove(@Param('id', ParseIntPipe) id: number) 
  {
    return this.pedidosService.remove(+id);
  }
}

