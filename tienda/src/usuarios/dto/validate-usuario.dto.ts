import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ValidateUsuarioDto 
{
    @ApiProperty({description: 'Nombre de usuario', example: 'Usuario A'})
    @IsString({ message: 'El nombre de usuario debe ser texto' })
    usuario: string;

    @ApiProperty({description: 'Clave del usuario', example: '!Qxx123'})
    @IsString({ message: 'La clave de usuario debe ser texto' })
    clave: string;
}


