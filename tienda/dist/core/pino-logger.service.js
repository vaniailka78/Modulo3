"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinoLoggerService = void 0;
const common_1 = require("@nestjs/common");
const pino_1 = require("pino");
let PinoLoggerService = class PinoLoggerService {
    constructor() {
        this.logger = (0, pino_1.default)({
            level: process.env.LOG_LEVEL || 'info',
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    levelFirst: true,
                    translateTime: 'SYS:standard',
                }
            }
        });
    }
    log(message, context) {
        this.logger.info({ context }, message);
    }
    error(message, trace, context) {
        this.logger.error({ context, trace }, message);
    }
    warn(message, context) {
        this.logger.warn({ context }, message);
    }
};
exports.PinoLoggerService = PinoLoggerService;
exports.PinoLoggerService = PinoLoggerService = __decorate([
    (0, common_1.Injectable)()
], PinoLoggerService);
//# sourceMappingURL=pino-logger.service.js.map