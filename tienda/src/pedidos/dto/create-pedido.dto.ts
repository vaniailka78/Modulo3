import { IsArray, IsIn, IsInt, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductoPedidoDto 
{
    @ApiProperty({description: 'ID del producto', example: 3})
    @IsInt({message: 'IdProducto debe ser numérico'})
    idProducto: number;

    @ApiProperty({description: 'Cantidad del producto', example: 12})
    @IsInt({ message: 'Cantidad debe ser numérico'})
    cantidad: number;

    @ApiProperty({description: 'Precio del producto', example: 4})
    @IsInt({ message: 'Precio debe ser numérico'})
    precio: number;
}


export class CreatePedidoDto 
{
    @ApiProperty({description: 'Lista de los productos a pedir', example: [{'idProducto': 3, 'cantidad':12, 'precio':4}, {'idProducto': 1, 'cantidad':1, 'precio':45}]})
    @IsArray({message: 'Revise los datos en productos'})
    @ValidateNested({ each: true})
    @Type(() => ProductoPedidoDto)
    productos: ProductoPedidoDto[];
}
