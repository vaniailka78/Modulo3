import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ValidateUsuarioDto } from './dto/validate-usuario.dto';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { Role } from 'src/roles/entities/role.entity';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RegistrarUsuarioDto } from './dto/register-usuario';
import { PinoLoggerService } from 'src/core/pino-logger.service';

@Injectable()
export class UsuariosService 
{
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    private readonly jwtService: JwtService,

    private readonly logger: PinoLoggerService,
  ) { }

  //Para crear usuarios con el rol USUARIO unicamente
  async register(registrarUsuarioDto: RegistrarUsuarioDto) 
  {
    const rol = await this.roleRepository.findOne({ where: { nombre: 'USUARIO' }});
      if (!rol) {
        throw new NotFoundException('No se pudo verificar el rol USUARIO');
      }

    registrarUsuarioDto.clave = await bcrypt.hash(registrarUsuarioDto.clave, 10);
    const usuario = this.usuarioRepository.create(registrarUsuarioDto);
    usuario.roles = [rol];
    return this.usuarioRepository.save(usuario);
  }

  async create(createUsuarioDto: CreateUsuarioDto, usuarioCreacion: number): Promise<Usuario>  
  {
    createUsuarioDto.clave = await bcrypt.hash(createUsuarioDto.clave, 10);

    //buscamos los roles en la base de datos
    const roles = await this.roleRepository.find({
      where: createUsuarioDto.roles.map((roleNombre) => ({ nombre: roleNombre }))
    });

    if (roles.length !== createUsuarioDto.roles.length) {
      throw new NotFoundException('No se encontraron los roles requeridos');
    }

    const usuario = this.usuarioRepository.create({
      usuario: createUsuarioDto.usuario,
      clave: createUsuarioDto.clave,
      correo: createUsuarioDto.correo,
      roles: roles,
      idUsuarioCreacion: usuarioCreacion
    });
    return this.usuarioRepository.save(usuario);
  }

  async createADMIN(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>  
  {
    return this.create(createUsuarioDto, 0);
  }

    //Para validar sin token solo hash
    /*async validate(validateUsuarioDto: ValidateUsuarioDto): Promise<any> 
    {
      const usuario = await this.usuarioRepository.findOne({ where: { usuario: validateUsuarioDto.usuario } });
      if (!usuario) 
        {
        throw new NotFoundException('No se pudo verificar el usuario');
        }

       const claveHasheada = await bcrypt.hash(validateUsuarioDto.clave,10);
      if(await bcrypt.compare(validateUsuarioDto.clave,  usuario?.clave))
        {
          return {usuario: usuario.usuario, message: 'Se valido la cuenta exitosamente'};
        }

        throw new NotFoundException('No se pudo verificar la clave del usuario');
      }*/
    
    async validate(validateUsuarioDto: ValidateUsuarioDto): Promise<any> {
      const usuario = await this.usuarioRepository.findOne({ where: { usuario: validateUsuarioDto.usuario }});
      if (!usuario) {
        throw new NotFoundException('No se pudo verificar el usuario');
      }
      const compararClave = await bcrypt.compare(validateUsuarioDto.clave, usuario.clave)
      if (compararClave) {
        const payload = {
          usuario: usuario.usuario,
          id: usuario.id,
        }
        return {
          access_token: this.jwtService.sign(payload)
        };
      }
      throw new NotFoundException('No se pudo verificar la clave del usuario');
    }

  async login(validateUsuarioDto: ValidateUsuarioDto): Promise<any> 
  {
    const usuario = await this.usuarioRepository.findOne({ where: { usuario: validateUsuarioDto.usuario }, relations: ['roles'] });
    if (!usuario) 
      {
      throw new NotFoundException('No se pudo verificar el usuario');
      }

    const compararClave = await bcrypt.compare(validateUsuarioDto.clave, usuario.clave)
    if (compararClave) 
      {
      const nombreRoles = usuario.roles.map(role => role.nombre);
      const payload = {
        usuario: usuario.usuario,
        id: usuario.id,
        roles:nombreRoles
      }
      return {
        access_token: this.jwtService.sign(payload)
      };
    }
    return 'Login fallido';
  }

  findAll() :Promise<any[]>
  {
    return this.usuarioRepository.createQueryBuilder('usuario')
    .select(['usuario.usuario', 'usuario.correo'])
    .getRawMany();
  }

  findOne(id: number) {
    return this.usuarioRepository.findOne({
       where: { id }, relations: ['roles'] 
      });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto, usuarioModificacion: number) :Promise<Usuario> 
  {
    const usuario = await this.usuarioRepository.findOneBy({ id: id });
    if (!usuario) 
      {
      throw new NotFoundException('No se pudo encontrar el usuario');
      }

    updateUsuarioDto.clave = await bcrypt.hash(updateUsuarioDto.clave, 10);

    usuario.usuario = updateUsuarioDto.usuario;
    usuario.clave = updateUsuarioDto.clave;
    usuario.correo = updateUsuarioDto.correo;
    usuario.idUsuarioModificacion = usuarioModificacion;

    await this.usuarioRepository.update(id, usuario);
    return this.usuarioRepository.findOneBy({ id });
  }
  
  remove(id: number) 
  {
    return this.usuarioRepository.delete({id});
  }
}

