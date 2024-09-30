import { Role } from 'src/roles/entities/role.entity';
import { BaseAuditoria } from "src/core/base-auditoria.entity";
export declare class Usuario extends BaseAuditoria {
    id: number;
    usuario: string;
    clave: string;
    correo: string;
    roles: Role[];
}
