import {Note} from "./note.type";
import {Link, LinkType} from "./link.type";
import {FileDocument, FileDocumentType} from "./file-document.type";

export type Resource = (Note | FileDocument | Link) & CommonResource;
export type Type = (LinkType | FileDocumentType);
export type ResourceList = ((Note & CommonResource)[] | (FileDocument & CommonResource)[] |(Link & CommonResource)[]);

export type CommonResource = {
  id?: string,
  name: string,
  date?: Date,
  dateAsString?: string,
  descriptor?: string
}
