import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NoteEntity } from '../entities/note.entity';

export class NoteDto {
  @ApiProperty({
    name: 'name',
    description: 'name',
    example: 'name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'type',
    description: 'type',
    example: 'type',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    name: 'note',
    description: 'note',
    example: 'https://google.com/',
  })
  @IsString()
  @IsNotEmpty()
  note: string;

  @ApiProperty({
    name: 'date',
    description: 'date',
    example: '2000/07/31',
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  constructor(partial: Partial<NoteEntity>) {
    Object.assign(this, partial);
  }
}
