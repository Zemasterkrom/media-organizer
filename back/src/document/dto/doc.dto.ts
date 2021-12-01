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
        name: 'date',
        description: 'Last updated document date',
        example: new Date(Date.now()).toISOString(),
    })
    @IsDateString()
    @IsOptional()
    date: string;

    constructor(partial: Partial<DocEntity>) {
        Object.assign(this, partial);
    }
}
