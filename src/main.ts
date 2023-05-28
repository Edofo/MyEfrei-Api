import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

import { json, urlencoded } from 'express';

import * as logger from 'morgan';

import { AppModule } from '@/modules/app.module';
import { PrismaService } from '@/modules/database/services/prisma.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    // Prisma
    const dbService: PrismaService = app.get(PrismaService);
    await dbService.enableShutdownHooks(app);

    // Swagger
    const config = new DocumentBuilder()
        .setTitle('MyEfrei - API')
        .setDescription("Description de l'api de myefrei")
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const options: SwaggerDocumentOptions = {
        deepScanRoutes: true,
        operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    };
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('', app, document);

    app.enableCors();
    app.use(logger('dev'));
    // app.setGlobalPrefix('api');
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));

    // app.enableVersioning({
    //     type: VersioningType.URI,
    // });
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT || 4000);

    console.log(`Server running on port ${process.env.PORT || 4000}`);
}
bootstrap();
