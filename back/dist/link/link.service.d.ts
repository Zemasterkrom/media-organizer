import { Observable } from 'rxjs';
import { LinkDao } from "./dao/link.dao";
import { LinkEntity } from "./entities/link.entity";
import { LinkDto } from "./dto/link.dto";
export declare class LinkService {
    private readonly _linkDao;
    constructor(_linkDao: LinkDao);
    All: () => Observable<LinkEntity[] | void>;
    findById: (id: string) => Observable<LinkEntity>;
    add: (link: LinkDto) => Observable<LinkEntity>;
    update: (id: string, link: LinkDto) => Observable<LinkEntity>;
    delete: (id: string) => Observable<void>;
    private _parseDate;
}
