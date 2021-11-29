import {IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LinkEntity } from '../entities/link.entity';

export class LinkDto {
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
    name: 'link',
    description: 'link',
    example: 'https://google.com/',
  })
  @IsString()
  @IsNotEmpty()
  link: string;

  @ApiProperty({
    name: 'date',
    description: 'date',
    example: '2000/07/31',
  })
  @IsString()
  @IsOptional()
  date: string;

  constructor(partial: Partial<LinkEntity>) {
    Object.assign(this, partial);
  }
}
