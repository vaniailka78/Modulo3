import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto 
{
    @ApiProperty({description: 'Nombre de la categoria', example: 'Categoria A'})
    @IsString({ message: 'El nombre de la categoría debe ser texto'})
    nombre: string;

    @ApiProperty({description: 'Estado de la categoria', example: 'ACTIVO'})
    @IsString({ message: 'El estado de la categoría debe ser texto'})
    estado: string;
}
