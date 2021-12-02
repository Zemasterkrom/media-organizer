import * as mongoose from 'mongoose';
import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

export type NoteDocument = Note & Document;

@Schema({
    toJSON: {
        virtuals: true,
        transform: (doc: any, ret: any) => {
            // delete obsolete data
            delete ret._id;
        },
    },
    versionKey: false,
})
export class Note {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    })
    _id: any;

    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: false,
    })
    name: string;

    @Prop({
        type: String,
        required: true,
        trim: false,
    })
    note: string;

    @Prop({
        type: Date,
        required: false,
        default: new Date(Date.now())
    })
    date: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
