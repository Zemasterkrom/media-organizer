import {CommonResource} from "./any.type";

export type Note = {
  content: string
} & CommonResource;

export var NOTE_KEYS = {
  name: "Nom",
  dateAsString: "Date d'ajout"
};
