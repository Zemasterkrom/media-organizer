import {Exclude, Expose, Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

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

  @ApiProperty({ name: 'name', description: 'Name of the video resource', example: 'AI plays Trackmania' })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiProperty({
    name: 'link',
    description: 'URL of the YouTube/Dailymotion video',
    example: 'https://www.youtube.com/embed/_oNK08LvZ-g',
  })
  @Expose()
  @Type(() => String)
  link: string;

  @ApiProperty({
    name: 'date',
    description: 'Created at',
    example: new Date(Date.now()).toDateString(),
  })
  @Expose()
  @Type(() => Date)
  date: string;

  constructor(partial: Partial<LinkEntity>) {
    Object.assign(this, partial);
  }
}
