import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {FileDocument} from "../types/file-document";
import {DOCUMENTS} from "../../_static/documents";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends BaseService {
  /**
   * Constructeur de DocumentService
   */
  constructor(private __http: HttpClient, private _documentRouter: Router, private _documentLocation: Location) {
    super(__http, _documentRouter, _documentLocation);
    this.buildService("documents");
    this.defaultResource = Object.assign({}, DOCUMENTS[0]);
  }

  /**
   * Obtenir l'URL d'affichage d'un document stocké sur le back
   * @param id Identifiant du document
   */
  getViewUrl(id: string): string {
    let url = `${environment.backend.protocol}://${environment.backend.host}`;

    if (environment.backend.port) {
      url += `:${environment.backend.port}`;
    }

    let resId = (<FileDocument[]>super.resources).filter((doc: FileDocument) => {
      return doc.id === id;
    })[0].path;

    return url + "/" + resId;
  }

  /**
   * Récupérer toutes les documents
   */
  fetch(query: String): Observable<FileDocument[]> {
    return <Observable<FileDocument[]>>super.fetch(query);
  }

  /**
   * Obtenir un document
   * @param id Identifiant
   */
  fetchOne(id: string | undefined): Observable<FileDocument> {
    return <Observable<FileDocument>>super.fetchOne(id);
  }
}
