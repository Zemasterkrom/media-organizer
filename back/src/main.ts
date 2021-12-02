import {NestFactory} from '@nestjs/core';
import {Logger, ValidationPipe} from '@nestjs/common';
import {AppModule} from './app.module';
import * as Config from 'config';
import {AppConfig, SwaggerConfig} from './app.types';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {LinkModule} from './link/link.module';
import {NoteModule} from './note/note.module';
import {DocModule} from "./document/doc.module";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as express from 'express';

export const PUBLIC_PATH = require('path').resolve(__dirname, '..') + "/public";

async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {
  // create NestJS application
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Utiliser le dossier public pour stocker des documents
  app.use('/public', express.static(PUBLIC_PATH));

  // autoriser le téléchargement des données uploadées
  app.useStaticAssets(PUBLIC_PATH);

  // enable CORS for NG Application's calls
  await app.enableCors({ origin: config.cors });


  // use global pipe validation
  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,

    }),
  );

  // create swagger options
  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addTag(swaggerConfig.tag)
    .build();

  // create swagger document
  const linkDocument = SwaggerModule.createDocument(app, options, {
    include: [LinkModule, NoteModule, DocModule],
  });

  // setup swagger module
  SwaggerModule.setup(swaggerConfig.path, app, linkDocument);

  // launch server
  await app.listen(config.port, config.host);
  Logger.log(
    `Application served at http://${config.host}:${config.port}`,
    'bootstrap',
  );
}

bootstrap(
  Config.get<AppConfig>('server'),
  Config.get<SwaggerConfig>('swagger'),
);
