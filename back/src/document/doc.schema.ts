import * as mongoose from 'mongoose';
import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

export type DocDocument = Doc & Document;

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
export class Doc {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: String,
    required: true,
    trim: false,
    unique: true
  })
  name: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
    default: ''
  })
  type: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
    default: ''
  })
  path: string;

  @Prop({
    type: Date,
    required: true,
  })
  date: string;
}

export const DocSchema = SchemaFactory.createForClass(Doc);
