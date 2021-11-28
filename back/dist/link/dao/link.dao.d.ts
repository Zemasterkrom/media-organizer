import { Model } from 'mongoose';
import { Link, LinkDocument } from "../link.schema";
import { Observable } from 'rxjs';
import { LinkDto } from "../dto/link.dto";
export declare class LinkDao {
    private readonly _linkModel;
    constructor(_linkModel: Model<LinkDocument>);
    all: () => Observable<Link[] | void>;
    findById: (id: string) => Observable<Link | void>;
    add: (link: LinkDto) => Observable<Link>;
    update: (id: string, link: LinkDto) => Observable<Link | void>;
    delete: (id: string) => Observable<Link | void>;
}
