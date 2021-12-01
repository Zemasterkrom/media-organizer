import {IsDate, IsDateString, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LinkEntity } from '../entities/link.entity';
import {Schema} from "mongoose";

export class LinkDto {
  @ApiProperty({
    name: 'name',
    description: 'name',
    example: 'AI plays Trackmania',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'type',
    description: 'type',
    example: 'YouTube',
  })

  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    name: 'link',
    description: 'link',
    example: 'https://www.youtube.com/embed/_oNK08LvZ-g',
  })
  @IsString()
  @IsNotEmpty()
  link: string;

  @ApiProperty({
    name: 'date',
    description: 'date',
    example: new Date(Date.now()).toISOString(),
  })
  @IsDateString()
  date: string;

  constructor(partial: Partial<LinkEntity>) {
    Object.assign(this, partial);
  }
}
