import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLoggerService } from 'src/core/pino-logger.service';

@Injectable()
export class CategoriasService 
{
  constructor(
    private readonly logger: PinoLoggerService,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ){

  }


  create(createCategoriaDto: CreateCategoriaDto, usuarioCreacion: number): Promise<Categoria>
  {
    this.logger.log('Creacion de categoria', 'CategoriaService');
    this.logger.log(usuarioCreacion);

    const categoria = this.categoriaRepository.create(createCategoriaDto);
    categoria.idUsuarioCreacion = usuarioCreacion;
    return this.categoriaRepository.save(categoria)
  }

  findAll() 
  {
    return this.categoriaRepository.find();
  }

  findOne(id: number) 
  {
    return this.categoriaRepository.findOne({
      where:{id}
    })
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto, usuarioModificacion: number) :Promise<Categoria>
  {
    const categoria = await this.categoriaRepository.findOneBy({ id: id });
    if (!categoria) 
      {
      throw new NotFoundException(`La categoría con ID ${id} no existe.`);
      }
    
    categoria.nombre = updateCategoriaDto.nombre;
    categoria.estado = updateCategoriaDto.estado;
    categoria.idUsuarioModificacion = usuarioModificacion;
    await this.categoriaRepository.update(id, categoria)
    return this.categoriaRepository.findOneBy({ id })
  }


  remove(id: number) 
  {
    return this.categoriaRepository.delete({id});
  }
}
