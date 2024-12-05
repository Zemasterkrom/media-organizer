import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema } from './link.schema';
import { LinkDao } from './dao/link.dao';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
  ],
  controllers: [LinkController],
  providers: [LinkService, Logger, LinkDao],
})
export class LinkModule {}
