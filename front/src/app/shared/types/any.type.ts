import {Note} from "./note.type";
import {Link} from "./link.type";

export type Resource = (Note | File | Link) & CommonResource;
export type ResourceList = ((Note & CommonResource)[] | (File & CommonResource)[] |(Link & CommonResource)[]);

export type CommonResource = {
  id?: number,
  name: string,
  date: Date,
  dateAsString?: string,
  descriptor?: string
}
