"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sesion = void 0;
const common_1 = require("@nestjs/common");
exports.Sesion = (0, common_1.createParamDecorator)((data, ctx) => {
    const peticion = ctx.switchToHttp().getRequest();
    return peticion.usuario;
});
//# sourceMappingURL=sesion.decorator.js.map