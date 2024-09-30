import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { ValidateUsuarioDto } from './dto/validate-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles/entities/role.entity';
import { RegistrarUsuarioDto } from './dto/register-usuario';
import { PinoLoggerService } from 'src/core/pino-logger.service';
export declare class UsuariosService {
    private readonly usuarioRepository;
    private readonly roleRepository;
    private readonly jwtService;
    private readonly logger;
    constructor(usuarioRepository: Repository<Usuario>, roleRepository: Repository<Role>, jwtService: JwtService, logger: PinoLoggerService);
    register(registrarUsuarioDto: RegistrarUsuarioDto): Promise<Usuario>;
    create(createUsuarioDto: CreateUsuarioDto, usuarioCreacion: number): Promise<Usuario>;
    createADMIN(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    validate(validateUsuarioDto: ValidateUsuarioDto): Promise<any>;
    login(validateUsuarioDto: ValidateUsuarioDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<Usuario>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto, usuarioModificacion: number): Promise<Usuario>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
