import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{
    @ApiProperty({description: 'Nombre del rol', example: 'ADMIN'})
    @IsString({ message: 'El nombre del rol debe ser texto'})
    nombre: string;
}
