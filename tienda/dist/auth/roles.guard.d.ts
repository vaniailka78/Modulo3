import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { Reflector } from "@nestjs/core";
export declare class RolesGuard implements CanActivate {
    private jwtService;
    private usuarioService;
    private reflector;
    constructor(jwtService: JwtService, usuarioService: AuthService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
