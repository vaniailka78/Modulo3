import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
export declare class JwtGuard implements CanActivate {
    private jwtService;
    private usuarioService;
    constructor(jwtService: JwtService, usuarioService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
