import { LinkEntity } from "../entities/link.entity";
export declare class LinkDto {
    name: string;
    type: string;
    link: string;
    date: string;
    constructor(partial: Partial<LinkEntity>);
}
