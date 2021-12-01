import {CommonResource} from "./any.type";

export type Note = {
  note: string
} & CommonResource;

export var NOTE_KEYS = {
  name: "Nom",
  dateAsString: "Date d'ajout"
};

export enum Errors {
  NOT_FOUND = "La note cherchée n'existe pas",
  ALREADY_EXISTS = "Une note avec le même nom existe déjà",
  INTERNAL_ERROR = "Une erreur interne est survenue"
}

export function removeUnwantedFields(note: Note) : Note {
  delete note.date;
  delete note.descriptor;
  delete note.dateAsString;

  return note;
}
