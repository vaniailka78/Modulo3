import { LoggerService } from "@nestjs/common";
export declare class PinoLoggerService implements LoggerService {
    private logger;
    log(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
    warn(message: any, context?: string): void;
}
