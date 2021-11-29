import {IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DocEntity } from '../entities/doc.entity';

export class DocDto {
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
    name: 'path',
    description: 'path',
    example: '/home/imad/projet',
  })
  @IsString()
  @IsOptional()
  path: string;

  @ApiProperty({
    name: 'date',
    description: 'date',
    example: '2000/07/31',
  })
  @IsString()
  @IsOptional()
  date: string;

  constructor(partial: Partial<DocEntity>) {
    Object.assign(this, partial);
  }
}
