import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Exclude()
export class LinkEntity {
    @ApiProperty({ name: 'id', description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' })
    @Expose()
    @Type(() => String)
    id: string;

    @ApiProperty({ name: 'name', description: 'name', example: 'name' })
    @Expose()
    @Type(() => String)
    name: string;

    @ApiProperty({ name: 'link', description: 'URL', example: 'https://google.com/' })
    @Expose()
    @Type(() => String)
    link: string;

    @ApiProperty({ name: 'type', description: 'type', example: 'type' })
    @Expose()
    @Type(() => String)
    type: string;

    @ApiProperty({
        name: 'date',
        description: 'Created At',
        example: '2021-11-27T13:41:48.229Z',
    })
    @Expose()
    @Type(() => Date)
    date: String;

    constructor(partial: Partial<LinkEntity>) {
        Object.assign(this, partial);
    }
}
