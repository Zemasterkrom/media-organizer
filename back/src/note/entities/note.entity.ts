import {Exclude, Expose, Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

@Exclude()
export class NoteEntity {
    @ApiProperty({
        name: 'id',
        description: 'Unique identifier in the database',
        example: '5763cd4dc378a38ecd387737',
    })
    @Expose()
    @Type(() => String)
    id: string;

    @ApiProperty({name: 'name', description: 'name', example: 'Default note'})
    @Expose()
    @Type(() => String)
    name: string;

    @ApiProperty({
        name: 'note',
        description: 'URL',
        example: 'This is a default note',
    })
    @Expose()
    @Type(() => String)
    note: string;

    @ApiProperty({
        name: 'date',
        description: 'Created At',
        example: new Date(Date.now()).toDateString(),
    })
    @Expose()
    @Type(() => Date)
    date: string;

    constructor(partial: Partial<NoteEntity>) {
        Object.assign(this, partial);
    }
}
