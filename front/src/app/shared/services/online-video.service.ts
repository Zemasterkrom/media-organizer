import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Link, LinkType} from "../types/link.type";
import {LINKS} from "../../_static/links";

@Injectable({
  providedIn: 'root'
})
/**
 * Services pour l'ajout/modification/suppression d'une vidéo en ligne
 */
export class OnlineVideoService extends BaseService {
  /**
   * Lien par défaut
   * @private
   */
  private readonly _defaultOnlineVideo: Link;

  /**
   * Liens
   * @private
   */
  private readonly _onlineVideos: Link[];

  /**
   * Constructeur de OnlineVideoService
   */
  constructor() {
    super();
    this.buildService("links");
    this._defaultOnlineVideo = {
      id: -1,
      name: "Vidéo non trouvée",
      type: LinkType.YouTube,
      url: "",
      date: new Date(2011, 11, 20)
    };
    this._onlineVideos = LINKS;
  }

  /**
   * Récupérer toutes les vidéos en ligne
   */
  fetch(): Link[] {
    return this._onlineVideos;
  }

  /**
   * Obtenir les vidéo en ligne par type
   * @param type Type de recherche (YouTube/Dailymotion)
   */
  fetchByType(type: LinkType): Link[] {
    return this._onlineVideos.filter(link => {
      return link.type === type;
    })
  }

  /**
   * Obtenir une vidéo en ligne
   * @param id Identifiant
   */
  fetchOne(id: number): Link {
    return this._onlineVideos[id] || this._defaultOnlineVideo;
  }

  /**
   * Ajouter une nouvelle vidéo
   * @param video Nouvelle vidéo
   */
  addOne(video: Link): boolean {
    if (!this._onlineVideos.find(link => {
      return link.name === video.name;
    })) {
      this._onlineVideos.concat(video);
      return true;
    }

    return false;
  }

  /**
   * Mettre à jour une vidéo en ligne
   * @param id Identifiant
   * @param video Nouvelle vidéo
   */
  updateOne(id: number, video: Link): boolean {
    if (this._onlineVideos[id]) {
      this._onlineVideos[id] = video;
      return true;
    }

    return false;
  }

  /**
   * Supprimer une vidéo en ligne
   * @param id Identifiant
   */
  deleteOne(id: number): boolean {
    if (this._onlineVideos[id]) {
      delete this._onlineVideos[id]
      return true;
    }
    return false;
  }
}
