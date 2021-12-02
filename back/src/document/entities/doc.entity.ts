import {Exclude, Expose, Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

@Exclude()
export class DocEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5763cd4dc378a38ecd387737',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({ name: 'name', description: 'Document name', example: 'name' })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiProperty({
    name: 'path',
    description: 'path',
  })
  @Expose()
  @Type(() => String)
  path: string;

  @ApiProperty({ name: 'type', description: 'Document type (auto-detected)', example: 'Text' })
  @Expose()
  @Type(() => String)
  type: string;

  @ApiProperty({
    name: 'date',
    description: 'Last updated document date',
    example: new Date(Date.now()).toISOString(),
  })
  @Expose()
  @Type(() => Date)
  date: string;

  constructor(partial: Partial<DocEntity>) {
    Object.assign(this, partial);
  }
}
