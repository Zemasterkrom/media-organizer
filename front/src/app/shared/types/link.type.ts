import {CommonResource} from "./any.type";

export const enum LinkType {
  YouTube = "YouTube",
  Dailymotion = "Dailymotion"
}

export type Link = {
  type: LinkType,
  url: string
} & CommonResource;

export const LINK_KEYS = {
  name: "Nom",
  type: "Type",
  dateAsString: "Date d'ajout"
};
