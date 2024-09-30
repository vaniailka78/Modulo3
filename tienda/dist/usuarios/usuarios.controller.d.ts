import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ValidateUsuarioDto } from './dto/validate-usuario.dto';
import { RegistrarUsuarioDto } from './dto/register-usuario';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    creatADMIN(createUsuarioDto: CreateUsuarioDto): Promise<import("./entities/usuario.entity").Usuario>;
    create(sesion: any, createUsuarioDto: CreateUsuarioDto): Promise<import("./entities/usuario.entity").Usuario>;
    validation(validateUsuarioDto: ValidateUsuarioDto): Promise<any>;
    login(validateUsuarioDto: ValidateUsuarioDto): Promise<any>;
    register(registrarUsuarioDto: RegistrarUsuarioDto): Promise<import("./entities/usuario.entity").Usuario>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<import("./entities/usuario.entity").Usuario>;
    update(id: string, sesion: any, updateUsuarioDto: UpdateUsuarioDto): Promise<import("./entities/usuario.entity").Usuario>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
