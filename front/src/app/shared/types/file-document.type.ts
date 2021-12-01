import {CommonResource} from "./any.type";
import {File} from "@angular/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system";

export enum FileDocumentType {
  PDF = 'PDF',
  Text = 'Text',
  Music = 'Music',
  Video = 'Video'
}

export type FileDocument = {
  type: FileDocumentType,
  file: File,
} & CommonResource;

export const FILE_DOCUMENT_KEYS = {
  name: "Nom",
  type: "Type",
  path: "Chemin",
  dateAsString: "Date d'ajout"
};

export enum Errors {
  NOT_FOUND = "Le fichier cherché n'existe pas",
  ALREADY_EXISTS = "Le fichier que vous tentez d'enregistrer existe déjà",
  INTERNAL_ERROR = "Une erreur interne est survenue"
}
