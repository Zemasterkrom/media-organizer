import {CommonResource} from "./any.type";
import {FileDocument} from "./file-document.type";

export const enum LinkType {
  YouTube = "YouTube",
  Dailymotion = "Dailymotion"
}

export type Link = {
  type?: LinkType,
  link: string
} & CommonResource;

export const LINK_KEYS = {
  name: "Nom",
  type: "Type",
  dateAsString: "Date d'ajout"
};

export enum Errors {
  NOT_FOUND = "La vidéo cherchée n'existe pas",
  ALREADY_EXISTS = "La vidéo que vous tentez d'enregistrer existe déjà",
  INTERNAL_ERROR = "Une erreur interne est survenue"
}

export function removeUnwantedFields(link: Link) : Link {
  delete link.date;
  delete link.type;
  delete link.descriptor;
  delete link.dateAsString;

  return link;
}
