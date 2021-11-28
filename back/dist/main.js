"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
const Config = require("config");
const swagger_1 = require("@nestjs/swagger");
const link_module_1 = require("./link/link.module");
async function bootstrap(config, swaggerConfig) {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter({ logger: true }));
    await app.enableCors({ origin: config.cors });
    await app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setVersion(swaggerConfig.version)
        .addTag(swaggerConfig.tag)
        .build();
    const linkDocument = swagger_1.SwaggerModule.createDocument(app, options, {
        include: [link_module_1.LinkModule],
    });
    swagger_1.SwaggerModule.setup(swaggerConfig.path, app, linkDocument);
    await app.listen(config.port, config.host);
    common_1.Logger.log(`Application served at http://${config.host}:${config.port}`, 'bootstrap');
}
bootstrap(Config.get('server'), Config.get('swagger'));
//# sourceMappingURL=main.js.map