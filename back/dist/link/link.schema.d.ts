import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export declare type LinkDocument = Link & Document;
export declare class Link {
    _id: any;
    name: string;
    type: string;
    link: string;
    date: string;
}
export declare const LinkSchema: mongoose.Schema<mongoose.Document<Link, any, any>, mongoose.Model<mongoose.Document<Link, any, any>, any, any, any>, {}>;
