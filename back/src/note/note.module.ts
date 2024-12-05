import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './note.schema';
import { NoteDao } from './dao/note.dao';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  controllers: [NoteController],
  providers: [NoteService, Logger, NoteDao],
})
export class NoteModule {}
