import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doc, DocSchema } from './doc.schema';
import { DocDao } from './dao/doc.dao';
import { DocController } from './doc.controller';
import { DocService } from './doc.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Doc.name, schema: DocSchema }])],
  controllers: [DocController],
  providers: [DocService, Logger, DocDao],
})
export class DocModule {}
