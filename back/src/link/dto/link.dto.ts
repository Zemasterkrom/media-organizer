import {IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {LinkEntity} from '../entities/link.entity';

export class LinkDto {
  @ApiProperty({
    name: 'name',
    description: 'Name of the video resource',
    example: 'AI plays Trackmania',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'name',
    description: 'Type of the video resource (not required, detected automatically)',
    example: 'YouTube',
  })
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty({
    name: 'link',
    description: 'URL of the YouTube/Dailymotion video',
    example: 'https://www.youtube.com/embed/_oNK08LvZ-g',
  })
  @IsUrl()
  link: string;

  @ApiProperty({
    name: 'date',
    description: 'Last updated date',
    example: new Date(Date.now()).toISOString(),
  })
  @IsDateString()
  @IsOptional()
  date: string;

  constructor(partial: Partial<LinkEntity>) {
    Object.assign(this, partial);
  }
}
