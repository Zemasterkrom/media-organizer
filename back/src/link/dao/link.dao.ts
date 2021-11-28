import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Link, LinkDocument} from "../link.schema";
import { InjectModel } from '@nestjs/mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LinkDto} from "../dto/link.dto";

@Injectable()
export class LinkDao {
    /**
     * Class constructor
     *
     * @param {Model<LinkDocument>} _linkModel instance of the model representing a Link
     */
    constructor(
        @InjectModel(Link.name)
        private readonly _linkModel: Model<LinkDocument>,
    ) {}

    /**
     * Call mongoose method, call toJSON on each result and returns PersonModel[] or undefined
     *
     * @return {Observable<Person[] | void>}
     */
    all = (): Observable<Link[] | void> =>
        from(this._linkModel.find()).pipe(
            filter((docs: LinkDocument[]) => !!docs && docs.length > 0),
            map((docs: LinkDocument[]) =>
                docs.map((_: LinkDocument) => _.toJSON()),
            ),
            defaultIfEmpty(undefined),
        );


    /**
     * Returns one person of the list matching id in parameter
     *
     * @param {string} id of the person in the db
     *
     * @return {Observable<Link | void>}
     */
    findById = (id: string): Observable<Link | void> =>
        from(this._linkModel.findById(id)).pipe(
            filter((doc: LinkDocument) => !!doc),
            map((doc: LinkDocument) => doc.toJSON()),
            defaultIfEmpty(undefined),
        );

    /**
     * Check if name already exists with index and add it in link list
     *
     * @param {LinkDto} link to create
     *
     * @return {Observable<Link>}
     */
    add = (link: LinkDto): Observable<Link> =>
        from(new this._linkModel(link).save()).pipe(
            map((doc: LinkDocument) => doc.toJSON()),
            defaultIfEmpty(undefined)
        );

    /**
     * Update
     *
     * @param {string} id
     * @param {LinkDto} link
     *
     * @return {Observable<Link | void>}
     */
    update = (
        id: string,
        link: LinkDto,
    ): Observable<Link | void> =>
        from(
            this._linkModel.findByIdAndUpdate(id, link, {
                new: true,
                runValidators: true,
            }),
        ).pipe(
            filter((doc: LinkDocument) => !!doc),
            map((doc: LinkDocument) => doc.toJSON()),
            defaultIfEmpty(undefined),
        );

    /**
     * Delete
     *
     * @param {string} id
     *
     * @return {Observable<Link | void>}
     */
    delete = (id: string): Observable<Link | void> =>
        from(this._linkModel.findByIdAndRemove(id)).pipe(
            filter((doc: LinkDocument) => !!doc),
            map((doc: LinkDocument) => doc.toJSON()),
            defaultIfEmpty(undefined),
        );

}
