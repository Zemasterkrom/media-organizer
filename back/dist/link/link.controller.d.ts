import { Observable } from 'rxjs';
import { HandlerParams } from "../validators/handler-params";
import { LinkService } from "./link.service";
import { LinkEntity } from "./entities/link.entity";
import { LinkDto } from "./dto/link.dto";
export declare class LinkController {
    private readonly _linkService;
    constructor(_linkService: LinkService);
    findAll(): Observable<LinkEntity[] | void>;
    findById(params: HandlerParams): Observable<LinkEntity>;
    add(linkDto: LinkDto): Observable<LinkEntity>;
    update(params: HandlerParams, linkDto: LinkDto): Observable<LinkEntity>;
    delete(params: HandlerParams): Observable<void>;
}
