import { Module } from '@nestjs/common';

import { LinkModule } from './link/link.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as Config from 'config';


@Module({
  imports: [
      LinkModule,
      MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
  ]
})
export class AppModule {}
