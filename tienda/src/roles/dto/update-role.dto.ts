import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto extends PartialType(CreateRoleDto)
{
    @ApiProperty({description: 'Nombre del rol', example: 'ADMIN'})
    @IsString({ message: 'El nombre del rol debe ser texto'})
    nombre: string;
}