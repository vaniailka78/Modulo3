"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const validacion_pipe_1 = require("./common/validacion.pipe");
const swagger_1 = require("@nestjs/swagger");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Documentación del Proyecto')
        .setDescription('Documentación para acceder a todos los APIs del proyecto, y gestionar la tienda de productos')
        .setVersion('1.0')
        .build();
    const documentacion = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, documentacion);
    app.useGlobalPipes(new validacion_pipe_1.ValidacionPipe());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map