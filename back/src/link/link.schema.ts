import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LinkDocument = Link & Document;

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
export class Link {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    })
    _id: any;

    @Prop({
        type: String,
        required: true,
        trim: false,
    })
    name: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    type: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    link: string;

    @Prop({
        type: Date,
        required: true,
    })
    date: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
