import { IsString, IsArray } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto 
{
    @ApiProperty({description: 'Nombre de usuario', example: 'Usuario A'})
    @IsString({ message: 'El nombre de usuario debe ser texto' })
    usuario: string;

    @ApiProperty({description: 'Clave del usuario', example: '!Qxx123'})
    @IsString({ message: 'La clave de usuario debe ser texto' })
    clave: string;

    @ApiProperty({description: 'Correo electronico del usuario', example: 'usuarioA@gmail.com'})
    @IsString({ message: 'El correo electronico del usuario debe ser texto' })
    correo: string;

    @IsArray()
    @IsString({ each: true })
    roles: string[]
}
