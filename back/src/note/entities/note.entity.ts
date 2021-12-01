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

    @ApiProperty({name: 'name', description: 'Note resource name', example: 'Default note'})
    @Expose()
    @Type(() => String)
    name: string;

    @ApiProperty({
        name: 'note',
        description: 'Note content',
        example: 'This is a default note',
    })
    @Expose()
    @Type(() => String)
    note: string;

    @ApiProperty({
        name: 'date',
        description: 'Last updated note date',
        example: new Date(Date.now()).toDateString(),
    })
    @Expose()
    @Type(() => Date)
    date: string;

    constructor(partial: Partial<NoteEntity>) {
        Object.assign(this, partial);
    }
}
