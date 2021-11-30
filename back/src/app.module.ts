import { Module } from '@nestjs/common';

import { LinkModule } from './link/link.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as Config from 'config';
import { NoteModule } from './note/note.module';
import { DocModule } from './document/doc.module';

@Module({
  imports: [
    LinkModule,
    NoteModule,
    DocModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
  ],
})
export class AppModule {}