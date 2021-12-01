import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {FileDocument} from "../types/file-document";
import {DOCUMENTS} from "../../_static/documents";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

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
