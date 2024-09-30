import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Sesion } from 'src/auth/sesion.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Categorias')

@UseGuards(JwtGuard, RolesGuard)
@Controller('categorias')
export class CategoriasController 
{
  constructor(private readonly categoriasService: CategoriasService) {}

  @ApiOperation({ summary: 'Crear Categoria'})
  @ApiResponse({ status: 200, description: 'Categoria creada exitosamente'})
  @ApiResponse({ status: 404, description: 'La categoria no fue creada'})
  @Post()
  @Roles(['ADMIN'])
  create(
    @Sesion() sesion,
    @Body() createCategoriaDto: CreateCategoriaDto) 
  {
    return this.categoriasService.create(createCategoriaDto, sesion?.id);
  }

  @ApiOperation({ summary: 'Listar categorias'})
  @Get()
  @Roles(['ADMIN', 'USUARIO'])
  findAll() 
  {
    return this.categoriasService.findAll();
  }

  @ApiOperation({ summary: 'Listar una categoria por su id'})
  @Get(':id')
  @Roles(['ADMIN', 'USUARIO'])
  findOne(@Param('id', ParseIntPipe) id: number) 
  {
    return this.categoriasService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar Categoria'})
  @ApiResponse({ status: 200, description: 'Categoria actualizada exitosamente'})
  @ApiResponse({ status: 404, description: 'La categoria no existe'})
  @Patch(':id')
  @Roles(['ADMIN'])
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Sesion() sesion,
    @Body() updateCategoriaDto: UpdateCategoriaDto) 
  {
    return this.categoriasService.update(+id, updateCategoriaDto, sesion?.id);
  }

  @ApiOperation({ summary: 'Eliminar una categoria por su id'})
  @Delete(':id')
  @Roles(['ADMIN'])
  remove(@Param('id', ParseIntPipe) id: number) 
  {
    return this.categoriasService.remove(+id);
  }
}

