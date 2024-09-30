import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Sesion } from 'src/auth/sesion.decorator';

@ApiTags('Roles')

@Controller('roles')
export class RolesController 
{
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Crear Rol'})
  @ApiResponse({ status: 200, description: 'Rol creado exitosamente'})
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) 
  {
    return this.rolesService.create(createRoleDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @ApiOperation({ summary: 'Listar roles'})
  @Get()
  @Roles(['ADMIN'])
  findAll() 
  {
    return this.rolesService.findAll();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @ApiOperation({ summary: 'Listar un rol por su id'})
  @Get(':id')
  @Roles(['ADMIN'])
  findOne(@Param('id') id: string) 
  {
    return this.rolesService.findOne(+id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @ApiOperation({ summary: 'Actualizar rol'})
  @ApiResponse({ status: 200, description: 'Rol actualizado exitosamente'})
  @ApiResponse({ status: 404, description: 'No se pudo encontrar el rol'})
  @Patch(':id')
  @Roles(['ADMIN'])
  update(
    @Param('id') id: string,
    @Sesion() sesion,
    @Body() updateRoleDto: UpdateRoleDto) 
  {
    return this.rolesService.update(+id, updateRoleDto, sesion?.id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @ApiOperation({ summary: 'Eliminar un rol por su id'})
  @Delete(':id')
  @Roles(['ADMIN'])
  remove(@Param('id') id: string) 
  {
    return this.rolesService.remove(+id);
  }
}
