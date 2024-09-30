import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ValidateUsuarioDto } from './dto/validate-usuario.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegistrarUsuarioDto } from './dto/register-usuario';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Sesion } from 'src/auth/sesion.decorator';

@ApiTags('Usuarios')

@Controller('usuarios')
export class UsuariosController 
{
  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiOperation({ summary: 'Crear usuario Administrador'})
  @ApiResponse({ status: 200, description: 'Administrador creado exitosamente'})
  @ApiResponse({ status: 404, description: 'El administrador no fue creado'})
  @Post('/admin')
  creatADMIN(@Body() createUsuarioDto: CreateUsuarioDto) 
  {
    return this.usuariosService.createADMIN(createUsuarioDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @ApiOperation({ summary: 'Crear usuario'})
  @ApiResponse({ status: 200, description: 'Usuario creado exitosamente'})
  @ApiResponse({ status: 404, description: 'El usuario no fue creado'})
  @Post()
  @Roles(['ADMIN'])
  create(
    @Sesion() sesion,
    @Body() createUsuarioDto: CreateUsuarioDto) 
  {
    return this.usuariosService.create(createUsuarioDto, sesion?.id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @ApiOperation({ summary: 'Validar usuario'})
  @ApiResponse({ status: 200, description: 'Usuario validado exitosamente'})
  @ApiResponse({ status: 404, description: 'No se pudo validar al usuario'})
  @Post('/validar')
  @Roles(['ADMIN'])
  validation(@Body() validateUsuarioDto: ValidateUsuarioDto)
  {
    return this.usuariosService.validate(validateUsuarioDto);
  }

  @ApiOperation({ summary: 'Login para usuario'})
  @ApiResponse({ status: 200, description: 'Login exitoso'})
  @ApiResponse({ status: 404, description: 'Login fallido'})
  @Post('/login')
  @Roles(['ADMIN', 'USUARIO'])
  login(@Body() validateUsuarioDto: ValidateUsuarioDto)
  {
    return this.usuariosService.login(validateUsuarioDto);
  }

  @ApiOperation({ summary: 'Registrar usuario'})
  @ApiResponse({ status: 200, description: 'Usuario creado exitosamente'})
  @Post('/register')
  register(@Body() registrarUsuarioDto: RegistrarUsuarioDto) 
  {
    return this.usuariosService.register(registrarUsuarioDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @ApiOperation({ summary: 'Listar usuarios'})
  @Get()
  @Roles(['ADMIN'])
  findAll() 
  {
    return this.usuariosService.findAll();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @ApiOperation({ summary: 'Listar un usuario por su id'})
  @Get(':id')
  @Roles(['ADMIN'])
  findOne(@Param('id') id: string) 
  {
    return this.usuariosService.findOne(+id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @ApiOperation({ summary: 'Actualizar usuario'})
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente'})
  @Patch(':id')
  @Roles(['ADMIN'])
  update(
    @Param('id') id: string, 
    @Sesion() sesion,
    @Body() updateUsuarioDto: UpdateUsuarioDto) 
  {
    return this.usuariosService.update(+id, updateUsuarioDto, sesion?.id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @ApiOperation({ summary: 'Eliminar un usuario por su id'})
  @Delete(':id')
  @Roles(['ADMIN'])
  remove(@Param('id', ParseIntPipe) id: number) 
  {
    return this.usuariosService.remove(+id);
  }
}
