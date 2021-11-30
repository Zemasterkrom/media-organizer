import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Resource, Type} from "../types/any.type";

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
   * Constructeur de UrlService
   */
  constructor(private _router: Router, private _location: Location) {
    this._urls = {};
    this._resources = [] as Resource[];
    this._defaultResource = {} as Resource;
  }

  /**
   * Construire les URLS pour une catégorie donnée
   * @param key Catégorie
   */
  public buildService(key: string): this {
    let urls: any = {};
    let baseUrl = `${environment.frontend.protocol}://${environment.frontend.host}`;

    if (environment.frontend.port) {
      baseUrl += `:${environment.frontend.port}`;
    }

    Object.keys((environment.frontend.endpoints[key] || {})).forEach(category => {
      urls[category] = `${baseUrl}${environment.frontend.endpoints[key][category]}`
    });
    this._urls = urls;

    return this;
  }

  /**
   * Obtenir l'URL de vue d'un item
   * @param id Identifiant d'un item
   */
  getViewUrl(id: number): string {
    return this._urls.one ? this._urls.one.replace(":id", id) : "";
  }

  /**
   * Obtenir l'URL associée à la modification d'un item
   * @param id Identifiant d'un item
   */
  getEditUrl(id: number): string {
    return this._urls.update ? this._urls.update.replace(":id", id) : "";
  }

  /**
   * Obtenir l'URL associée à la suppression d'un item
   * @param id Identifiant d'un item
   */
  getDeleteUrl(id: number): string {
    return this._urls.delete ? this._urls.delete.replace(":id", id) : "";
  }

  /**
   * Naviguer sur une autre URL
   * @param url URL sur laquelle le navigateur doit être redirigé
   */
  navigateByUrl(url: string) {
    this._router.navigateByUrl(url);
  }

  /**
   * Aller à l'URL précédente
   */
  goBack() {
    this._location.back();
  }

  /**
   * Mettre à jour la ressource par défaut
   * @param res Ressource
   */
  public set defaultResource(res: Resource) {
    this._defaultResource = res;
  }

  /**
   * Mettre à jour les ressources
   * @param res Ressources
   */
  public set resources(res: Resource[]) {
    this._resources = res;
  }

  /**
   * Récupérer toutes les vidéos en ligne
   */
  fetch(): Resource[] {
    return this._resources;
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
  protected fetchOne(id: number): Resource {
    return this._resources[id] || this._defaultResource;
  }

  /**
   * Ajouter une nouvelle ressource
   * @param newRes Nouvelle ressource
   */
  addOne(newRes: Resource): number {
    let maxId = 0;
    if (!this._resources.find(res => {
      if (res.id && res.id > maxId) {
        maxId = res.id + 1
      }
      return res.name === newRes.name
    })) {
      newRes.id = maxId;
      newRes.date = new Date(Date.now());
      this._resources.push(newRes);
      return this._resources.length - 1;
    }

    return -1;
  }

  /**
   * Mettre à jour une ressource
   * @param id Identifiant
   * @param res Nouvelle ressource
   */
  updateOne(id: number, res: Resource): number {
    let foundIndex = this.findObjectIndex(id);

    if (foundIndex >= 0) {
      res.id = this._resources[foundIndex].id;
      this._resources[foundIndex] = res;
    }

    return foundIndex;
  }

  /**
   * Supprimer une ressource
   * @param id Identifiant
   */
  deleteOne(id: number): number {
    let foundIndex = this.findObjectIndex(id);

    if (foundIndex >= 0) {
      this._resources.splice(foundIndex, 1);
    }

    return foundIndex;
  }

  /**
   * Trouver l'index dans le tableau d'un objet
   * @param id Identifiant de l'objet
   */
  findObjectIndex(id: number): number {
    return this._resources.findIndex((res: Resource) => {
      return res.id === id;
    });
  }
}
