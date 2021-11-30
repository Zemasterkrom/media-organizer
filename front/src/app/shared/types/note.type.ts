import {CommonResource} from "./any.type";

export type Note = {
  content: string
} & CommonResource;

export var NOTE_KEYS = {
  name: "Nom",
  dateAsString: "Date d'ajout"
};

export enum Errors {
  NOT_FOUND = "La note cherchée n'existe pas",
  ALREADY_EXISTS = "Une note avec le même nom existe déjà"
}