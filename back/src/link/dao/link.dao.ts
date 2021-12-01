import {Injectable, Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {Link, LinkDocument} from '../link.schema';
import {InjectModel} from '@nestjs/mongoose';
import {defaultIfEmpty, from, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {LinkDto} from '../dto/link.dto';
import {SearchParams} from '../../validators/search-params';

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
    ) {
    }

    /**
     * Returns one Link of the list matching id in parameter
     *
     * @param {string} id of the Link in the db
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
     * Returns  Links of the list matching type in parameter
     *
     * @param {SearchParams} query or name of the Link in the db
     *
     * @return {Observable<Link | void>}
     */
    find = (query: SearchParams): Observable<Link[] | void> => {
        const search = {};
        if (query.name) search['name'] = {$regex: query.name, $options: 'i'};
        if (query.type) search['type'] = {$regex: query.type, $options: 'i'};
        return from(this._linkModel.find(search)).pipe(
            filter((docs: LinkDocument[]) => !!docs && docs.length > 0),
            map((docs: LinkDocument[]) => docs.map((_: LinkDocument) => _.toJSON())),
            defaultIfEmpty([]),
        );
    };

    /**
     * Check if name already exists with index and add it in link list
     *
     * @param {LinkDto} link to create
     *
     * @return {Observable<Link>}
     */
    add = (link: LinkDto): Observable<Link> => {
        link.link = this.getEmbedUrl(link.link);
        link.type = this.getType(link.link);

        Logger.log(this.getEmbedUrl(link.link));
        return from(new this._linkModel(link).save()).pipe(
            filter((doc: LinkDto) => this.validateVideoUrl(doc.link)),
            map((doc: LinkDocument) => doc.toJSON()),
            defaultIfEmpty(undefined),
        );
    }

    /**
     * Update
     *
     * @param {string} id
     * @param {LinkDto} link
     *
     * @return {Observable<Link | void>}
     */
    update = (id: string, link: LinkDto): Observable<Link | void> =>
        from(
            this._linkModel.findByIdAndUpdate(id, link, {
                new: true,
                runValidators: true,
            }),
        ).pipe(
            filter((doc: LinkDocument) => this.validateVideoUrl(doc.link)),
            map((doc: LinkDocument) => {
                doc.link = this.getEmbedUrl(doc.link);
                doc.type = this.getType(doc.link);
                return doc.toJSON()
            }),
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

    /**
     * Valider une URL de vidéo YouTube/Dailymotion
     * @param url URL de vidéo YouTube/Dailymotion
     */
    validateVideoUrl(url: string): boolean {
        return new RegExp("^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\\w\-]+)$").test(url) ||
            new RegExp("^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$").test(url);
    }

    /**
     * Retourner une URL d'intégration iframe pour une vidéo YouTube/Dailymotion
     * @param url URL de vidéo YouTube / Dailymotion
     */
    getEmbedUrl(url: string): string {
        let matches = (url.match("^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\\w\-]+\\?v=|embed\/|v\/)?)([\\w\-]+)$") || url.match("^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$"))
            .filter(part => !!part);
        return matches[0].indexOf("youtu") >= 0 ? "https://youtube.com/embed/" + matches[matches.length - 1] : "https://dailymotion.com/video/embed/" + matches[matches.length - 1];
    }

    /**
     * Obtenir le type de la vidéo ajoutée
     * @param url URL de la vidéo
     */
    getType(url: string): string {
        return url.indexOf("youtu") >= 0 ? "YouTube" : "Dailymotion";
    }
}
