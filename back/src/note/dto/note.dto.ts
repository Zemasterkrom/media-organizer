import {IsDateString, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {NoteEntity} from '../entities/note.entity';

export class NoteDto {
  @ApiProperty({
    name: 'name',
    description: 'Note resource name',
    example: 'Default note',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'note',
    description: 'Note content',
    example: 'This is a default note',
  })
  @IsString()
  @IsNotEmpty()
  note: string;

  @ApiProperty({
    name: 'date',
    description: 'Last updated note resource date',
    example: new Date(Date.now()).toISOString(),
  })
  @IsDateString()
  @IsOptional()
  date: string;

  constructor(partial: Partial<NoteEntity>) {
    Object.assign(this, partial);
  }
}
