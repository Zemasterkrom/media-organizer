import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Exclude()
export class NoteEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5763cd4dc378a38ecd387737',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({ name: 'name', description: 'name', example: 'name' })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiProperty({
    name: 'note',
    description: 'URL',
    example: 'https://google.com/',
  })
  @Expose()
  @Type(() => String)
  note: string;

  @ApiProperty({ name: 'type', description: 'type', example: 'type' })
  @Expose()
  @Type(() => String)
  type: string;

  @ApiProperty({
    name: 'date',
    description: 'Created At',
    example: '2021-11-27T13:41:48.229Z',
  })
  @Expose()
  @Type(() => Date)
  date: string;

  constructor(partial: Partial<NoteEntity>) {
    Object.assign(this, partial);
  }
}
