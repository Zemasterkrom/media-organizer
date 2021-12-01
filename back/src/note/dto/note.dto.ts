import {IsDate, IsDateString, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NoteEntity } from '../entities/note.entity';
import {Schema} from "mongoose";

export class NoteDto {
  @ApiProperty({
    name: 'name',
    description: 'name',
    example: 'Default note',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'note',
    description: 'note',
    example: 'This is a default note',
  })
  @IsString()
  @IsNotEmpty()
  note: string;

  @ApiProperty({
    name: 'date',
    description: 'date',
    example: new Date(Date.now()).toISOString(),
  })
  @IsDateString()
  @IsOptional()
  date: string;

  constructor(partial: Partial<NoteEntity>) {
    Object.assign(this, partial);
  }
}
