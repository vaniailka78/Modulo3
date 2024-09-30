import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseAuditoria } from "src/core/base-auditoria.entity";

@Entity()
export class Role extends BaseAuditoria
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string; //ADMIN, //USUARIO
}
