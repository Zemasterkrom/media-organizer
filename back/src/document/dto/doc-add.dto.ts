import {IsDateString, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {DocDto} from "./doc.dto";

export class DocAddDto extends DocDto {
    @ApiProperty({
        name: 'path',
        description: 'Path to the file',
        example: new Date(Date.now()).toISOString(),
    })
    @IsDateString()
    @IsOptional()
    path: string;
}
