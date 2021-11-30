import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {FileDocument, FileDocumentType} from "../types/file-document.type";
import {DOCUMENTS} from "../../_static/documents";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends BaseService {
  /**
   * Constructeur de DocumentService
   */
  constructor(private _documentRouter: Router, private _documentLocation: Location) {
    super(_documentRouter, _documentLocation);
    this.buildService("documents");
    this.defaultResource = {id: 0, name: "Test", type: FileDocumentType.Music, path: "", date: new Date(2011, 11, 20)};
    this.resources = Object.assign([], DOCUMENTS);
  }

  /**
   * Récupérer toutes les documents
   */
  fetch(): FileDocument[] {
    return <FileDocument[]>super.fetch();
  }

  /**
   * Obtenir un document
   * @param id Identifiant
   */
  fetchOne(id: number): FileDocument {
    return <FileDocument>super.fetchOne(id);
  }

  /**
   * Obtenir les documents par type
   * @param type Type de document
   */
  fetchByType(type: FileDocumentType): FileDocument[] {
    return (<FileDocument[]>this.resources).filter((file: FileDocument) => {
      return file.type === type;
    })
  }
}
