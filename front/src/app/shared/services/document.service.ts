import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {FileDocument, FileDocumentType} from "../types/file-document.type";
import {DOCUMENTS} from "../../_static/documents";

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends BaseService {
  /**
   * Document par défaut
   * @private
   */
  private readonly _defaultDocument: FileDocument;

  /**
   * Documents
   * @private
   */
  private readonly _documents: FileDocument[];

  /**
   * Constructeur de DocumentService
   */
  constructor() {
    super();
    this.buildService("documents");
    this._defaultDocument = {id: 0, name: "Test", type: FileDocumentType.Music, path: "", date: new Date(2011, 11, 20)};
    this._documents = DOCUMENTS;
  }


  /**
   * Récupérer toutes les documents
   */
  fetch(): FileDocument[] {
    return this._documents;
  }

  /**
   * Obtenir un document
   * @param id Identifiant
   */
  fetchOne(id: number): FileDocument {
    return this._documents[id] || this._defaultDocument;
  }


  /**
   * Obtenir les documents par type
   * @param type Type de document
   */
  fetchByType(type: FileDocumentType): FileDocument[] {
    return this._documents.filter(doc => {
      return doc.type === type;
    })
  }

  /**
   * Ajouter un document
   * @param doc Document
   */
  addOne(doc: FileDocument): boolean {
    if (!this._documents.find(doc => {
      return doc.name === doc.name;
    })) {
      this._documents.concat(doc);
      return true;
    }

    return false;
  }

  /**
   * Mettre à jour un document
   * @param id Identifiant
   * @param doc Nouvelle FileDocument
   */
  updateOne(id: number, doc: FileDocument): boolean {
    if (this._documents[id]) {
      this._documents[id] = doc;
      return true;
    }

    return false;
  }

  /**
   * Supprimer un document
   * @param id Identifiant
   */
  deleteOne(id: number): boolean {
    if (this._documents[id]) {
      delete this._documents[id];
      return true;
    }

    return false;
  }
}
