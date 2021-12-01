import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Link} from "../types/link.type";
import {LINKS} from "../../_static/links";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
/**
 * Services pour l'ajout/modification/suppression d'une vidéo en ligne
 */
export class OnlineVideoService extends BaseService {
  /**
   * Constructeur de OnlineVideoService
   */
  constructor(private __http:HttpClient, private _onlineVideoRouter: Router, private _onlineVideoLocation: Location) {
    super(__http, _onlineVideoRouter, _onlineVideoLocation);
    super.buildService("links");
    super.defaultResource = Object.assign({}, LINKS[0]);
  }

  /**
   * Récupérer toutes les vidéos en ligne
   */
  fetch(): Observable<Link[]> {
    return <Observable<Link[]>>super.fetch();
  }

  /**
   * Obtenir une vidéo en ligne
   * @param id Identifiant
   */
  fetchOne(id: string | undefined): Observable<Link> {
    return <Observable<Link>>super.fetchOne(id);
  }

}
