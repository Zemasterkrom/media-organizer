import * as mongoose from 'mongoose';
import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

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
    required: true,
      unique: true,
    trim: true,
    validate: function (link) {
      return new RegExp("^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\\w\-]+\\?v=|embed\/|v\/)?)([\\w\-]+)$").test(link) ||
          new RegExp("^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?.+$").test(link);
    }
  })
  link: string;

  @Prop({
    type: Date,
    required: false,
    default: new Date(Date.now())
  })
  date: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
