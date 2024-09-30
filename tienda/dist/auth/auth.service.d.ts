import { Repository } from "typeorm";
import { Usuario } from "src/usuarios/entities/usuario.entity";
export declare class AuthService {
    private readonly usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    findOne(id: number): Promise<Usuario>;
}
