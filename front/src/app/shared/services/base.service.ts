import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Resource, Type} from "../types/any.type";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {defaultIfEmpty, filter, map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
/**
 * Service global permettant de récupérer simplement les URL des différentes catégories disponibles
 */
export class BaseService {

  /**
   * URLS disponible pour une catégorie
   * @private
   */
  private _urls: any;

  private _resources: Resource[];

  private _defaultResource: Resource;

  /**
   * Constructeur de BaseService
   * @param _http Client HTTP
   * @param _router Permet de gérer la navigtion
   * @param  _location Permet d'obtenir les états du navigateur
   */
  constructor(private _http: HttpClient, private _router: Router, private _location: Location) {
    this._urls = {
      frontend: {},
      backend: {}
    };
    this._resources = [] as Resource[];
    this._defaultResource = {} as Resource;
  }

  /**
   * Construire les URLS pour une catégorie donnée
   * @param key Catégorie
   */
  public buildService(key: string): this {
    let urls: any = {
      frontend: {},
      backend: {}
    };

    let baseUrl = `${environment.frontend.protocol}://${environment.frontend.host}`;

    if (environment.frontend.port) {
      baseUrl += `:${environment.frontend.port}`;
    }

    Object.keys((environment.frontend.endpoints[key] || {})).forEach(category => {
      urls.frontend[category] = `${baseUrl}${environment.frontend.endpoints[key][category]}`
    });

    baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;

    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    Object.keys((environment.backend.endpoints[key] || {})).forEach(category => {
      urls.backend[category] = `${baseUrl}${environment.backend.endpoints[key][category]}`
    });

    this._urls = urls;
    return this;
  }

  getBaseUrl() {
    return this._urls.frontend.all ? this._urls.all : "";
  }

  /**
   * Obtenir l'URL de vue d'un item
   * @param id Identifiant d'un item
   */
  getViewUrl(id: number): string {
    return this._urls.frontend.one ? this._urls.frontend.one.replace(":id", id) : "";
  }

  /**
   * Obtenir l'URL associée à la modification d'un item
   * @param id Identifiant d'un item
   */
  getEditUrl(id: number): string {
    return this._urls.frontend.update ? this._urls.frontend.update.replace(":id", id) : "";
  }

  /**
   * Naviguer sur une autre URL par une route définie
   * @param url URL sur laquelle le navigateur doit être redirigé
   */
  navigateByRoute(url: string) {
    this._router.navigateByUrl(url.replace(`${environment.frontend.protocol}://${environment.frontend.host}:${environment.frontend.port}/`, ''));
  }

  /**
   * Aller à l'URL précédente
   */
  goBack() {
    this._location.back();
  }

  /**
   * Aller à l'accueil
   */
  navigateToHome() {
    this._router.navigateByUrl('media-organizer');
  }

  /**
   * Mettre à jour la ressource par défaut
   * @param res Ressource
   */
  public set defaultResource(res: Resource) {
    this._defaultResource = res;
  }

  /**
   * Obtenir la ressource par défaut
   */
  public get defaultResource() {
    return this._defaultResource;
  }

  /**
   * Mettre à jour les ressources
   * @param res Ressources
   */
  public set resources(res: Resource[]) {
    this._resources = res;
  }

  /**
   * Obtenir les ressources
   */
  public get resources() {
    return this._resources;
  }

  /**
   * Récupérer toutes les vidéos en ligne
   */
  fetch(): Observable<Resource[]> {
    return this._http.get<Resource[]>(this._urls.backend.all)
      .pipe(
        filter((res) => !!res),
        defaultIfEmpty([] as Resource[])
      );
  }

  /**
   * Obtenir les vidéo en ligne par type
   * @param type Type de recherche (YouTube/Dailymotion)
   */
  fetchByType(type: Type): Resource[] {
    return [] as Resource[];
  }

  /**
   * Obtenir une vidéo en ligne
   * @param id Identifiant
   */
  fetchOne(id: string | undefined): Observable<Resource> {
    return this._http.get<Resource>(this._urls.backend.one.replace(':id', id))
      .pipe(
        filter((res: Resource) => !!res),
        defaultIfEmpty({} as Resource)
      );
  }

  /**
   * Ajouter une nouvelle ressource
   * @param newRes Nouvelle ressource
   */
  addOne(newRes: Resource): Observable<any> {
    return this._http.post<Resource>(this._urls.backend.add, newRes, BaseService._options());
  }

  /**
   * Mettre à jour une ressource
   * @param id Identifiant
   * @param res Nouvelle ressource
   */
  updateOne(id: string | undefined, res: Resource): Observable<any> {
    return this._http.put<Resource>(this._urls.backend.update.replace(':id', id), res, BaseService._options());
  }

  /**
   * Supprimer une ressource
   * @param id Identifiant
   */
  deleteOne(id: string | undefined): Observable<string> {
    console.log(this._urls)
    return this._http.delete(this._urls.backend.delete.replace(':id', id))
      .pipe(
        map(() => id as string)
      )
  }

  private static _options(headerList: object = {}) {
    return {
      headers: new HttpHeaders(Object.assign({'Content-Type': 'application/json'}, headerList))
    };
  }
}
