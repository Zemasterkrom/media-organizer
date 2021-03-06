import {IsDateString, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {DocEntity} from '../entities/doc.entity';

export class DocDto {
    @ApiProperty({
        name: 'name',
        description: 'Document name',
        example: 'name',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        name: 'name',
        description: 'Document name',
        example: 'name',
    })
    @IsString()
    @IsOptional()
    type: string;

    @ApiProperty({
        name: 'date',
        description: 'Last updated document date',
        example: new Date(Date.now()).toISOString(),
    })
    @IsDateString()
    @IsOptional()
    date: string;

    @ApiProperty({
        name: 'file',
        type: 'string',
        format: 'binary'
    })
    file: Express.Multer.File;

    constructor(partial: Partial<DocEntity>) {
        Object.assign(this, partial);
    }
}
