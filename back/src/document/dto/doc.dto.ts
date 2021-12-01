import {IsDateString, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {DocEntity} from '../entities/doc.entity';

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
        name: 'file',
        type: 'string',
        format: 'binary',
    })
    file: Express.Multer.File;

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
        example: new Date(Date.now()).toDateString(),
    })
    @IsDateString()
    @IsOptional()
    date: string;

    constructor(partial: Partial<DocEntity>) {
        Object.assign(this, partial);
    }
}
