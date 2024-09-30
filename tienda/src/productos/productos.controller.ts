import { Request, Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Sesion } from 'src/auth/sesion.decorator';
import { UploadProductoImagenDto } from './dto/upload-producto-imagen.dto';
//import { session } from 'passport';


@ApiTags('Productos')

@UseGuards(JwtGuard, RolesGuard)
@Controller('productos')
export class ProductosController 
{
  constructor(private readonly productosService: ProductosService) {}

  @ApiOperation({ summary: 'Crear Producto'})
  @ApiResponse({ status: 200, description: 'Producto creado exitosamente'})
  @ApiResponse({ status: 404, description: 'La categoria del producto no fue encontrada'})
  @Post()
  @Roles(['ADMIN'])
  create(
    @Sesion() sesion,
    @Body() createProductoDto: CreateProductoDto) 
  {
    return this.productosService.create(createProductoDto, sesion?.id);
  }

  @Post(':id/imagen')
  @Roles(['ADMIN'])
  upload(
    @Param('id') id: string,
    @Sesion() sesion,
    @Body() uploadProductoImagen: UploadProductoImagenDto
  )
  {
    return this.productosService.uploadImagen(+id, uploadProductoImagen, sesion.id);
  }

  @ApiOperation({ summary: 'Listar productos por pagina'})
  @Get()
  @Roles(['ADMIN', 'USUARIO'])
  findAll
  (
    @Query('pagina') pagina: number = 1,
  ) 
  {
    return this.productosService.findAll(pagina);
  }

  @ApiOperation({ summary: 'Listar un producto por su id'})
  @Get(':id')
  @Roles(['ADMIN', 'USUARIO'])
  findOne(@Param('id', ParseIntPipe) id: number) 
  {
    return this.productosService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar Producto por su id'})
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente'})
  @ApiResponse({ status: 404, description: 'El producto no fue encontrado'})
  @Patch(':id')
  @Roles(['ADMIN'])
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Sesion() sesion,
    @Body() updateProductoDto: UpdateProductoDto) 
  {
    return this.productosService.update(+id, updateProductoDto, sesion.id);
  }

  @ApiOperation({ summary: 'Eliminar un producto por su id'})
  @Delete(':id')
  @Roles(['ADMIN'])
  remove(@Param('id', ParseIntPipe) id: number) 
  {
    return this.productosService.remove(+id);
  }
}

