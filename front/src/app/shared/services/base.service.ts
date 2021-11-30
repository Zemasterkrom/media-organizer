import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";

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

  /**
   * Constructeur de UrlService
   */
  constructor() {
    this._urls = {};
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
}
