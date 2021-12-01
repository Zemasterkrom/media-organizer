import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {Schema} from "mongoose";

@Exclude()
export class LinkEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5763cd4dc378a38ecd387737',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({ name: 'name', description: 'name', example: 'AI plays Trackmania' })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiProperty({
    name: 'link',
    description: 'URL',
    example: 'https://www.youtube.com/embed/_oNK08LvZ-g',
  })
  @Expose()
  @Type(() => String)
  link: string;

  @ApiProperty({ name: 'type', description: 'type', example: 'YouTube' })
  @Expose()
  @Type(() => String)
  type: string;

  @ApiProperty({
    name: 'date',
    description: 'Created At',
    example: new Date(Date.now()).toDateString(),
  })
  @Expose()
  @Type(() => Date)
  date: string;

  constructor(partial: Partial<LinkEntity>) {
    Object.assign(this, partial);
  }
}
