import { PartialType } from '@nestjs/swagger';
import { CreateCategoriaDto } from './create-categoria.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from "class-validator";

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) 
{
    @ApiProperty({description: 'Nombre de la categoria', example: 'Categoria A'})
    @IsString({ message: 'El nombre de la categoría debe ser texto'})
    nombre: string;

    @ApiProperty({description: 'Estado de la categoria', example: 'ACTIVO'})
    @IsString({ message: 'El esta de la categoría debe ser texto'})
    estado: string;
}
