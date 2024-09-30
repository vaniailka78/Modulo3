import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto 
{
    @ApiProperty({description: 'Nombre del producto', example: 'Producto A'})
    @IsString({ message: 'El nombre del producto debe ser una cadena' })
    nombre: string;

    @ApiProperty({description: 'Precio del producto', example: 19 })
    @IsNumber({}, { message: 'El precio debe ser numérico' })
    precio: number;

    @ApiProperty({description: 'Descripcion del producto', example: 'Descripcion del producto A'})
    @IsString({ message: 'La descripcion del producto debe ser una cadena' })
    descripcion: string;

    @ApiProperty({description: 'Estado del producto', example: 'ACTIVO'})
    @IsString({ message: 'El estado del producto debe ser texto'})
    estado: string;

    @ApiProperty({description: 'La cantidad del producto en alamacen', example: 19 })
    @IsNumber({}, { message: 'La cantidad del producto en alamacen debe ser numérico' })
    enStock: number;

    @ApiProperty({description: 'ID de la categoría del producto', example: 1})
    @IsNumber({}, { message: 'El idCategoria deberia ser numerico'})
    idCategoria: number;
}



