import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesService 
{
  constructor(
    @InjectRepository(Role)
    private readonly rolRepository: Repository<Role>,
  ){

  }

  create(createRoleDto: CreateRoleDto) 
  {
    const role = this.rolRepository.create(createRoleDto);
    return this.rolRepository.save(role);
  }

  findAll() 
  {
    return this.rolRepository.find();
  }

  findOne(id: number) 
  {
    return this.rolRepository.findOne({
      where:{id}
    })
  }

  async update(id: number, updateRoleDto: UpdateRoleDto, usuarioModificacion: number):Promise<Role> 
  {
    const role = await this.rolRepository.findOneBy({ id: id });
    if (!role) 
      {
      throw new NotFoundException('No se pudo encontrar el rol');
      }

    role.nombre = updateRoleDto.nombre;
    role.idUsuarioModificacion = usuarioModificacion;
    await this.rolRepository.update(id, role)
    return this.rolRepository.findOneBy({ id })
  }

  remove(id: number) 
  {
    return this.rolRepository.delete({id});
  }
}
