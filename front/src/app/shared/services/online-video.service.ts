import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Link, LinkType} from "../types/link.type";
import {LINKS} from "../../_static/links";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

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
  constructor(private _onlineVideoRouter: Router, private _onlineVideoLocation: Location) {
    super(_onlineVideoRouter, _onlineVideoLocation);
    this.buildService("links");
    super.resources = LINKS;
    super.defaultResource = {
      id: -1,
      name: "Vidéo non trouvée",
      type: LinkType.YouTube,
      url: "",
      date: new Date(2011, 11, 20)
    };
  }

  /**
   * Récupérer toutes les vidéos en ligne
   */
  fetch(): Link[] {
    return <Link[]>super.fetch();
  }

  /**
   * Obtenir les vidéo en ligne par type
   * @param type Type de recherche (YouTube/Dailymotion)
   */
  fetchByType(type: LinkType): Link[] {
    return []
  }

  /**
   * Obtenir une vidéo en ligne
   * @param id Identifiant
   */
  fetchOne(id: number): Link {
    return <Link>super.fetchOne(id);
  }

  /**
   * Ajouter une nouvelle vidéo
   * @param newVideo Nouvelle vidéo
   */
  addOne(newVideo: Link): number {
    let maxId = 0;
    if (!(<Link[]>super.resources).find((video: Link) => {
      if (video.id && video.id > maxId) {
        maxId = video.id + 1
      }
      return video.name === newVideo.name || video.url === newVideo.url;
    })) {
      newVideo.id = maxId;
      newVideo.date = new Date(Date.now());
      super.resources.push(newVideo);
      return super.resources.length - 1;
    }

    return -1;
  }

  /**
   * Mettre à jour une vidéo
   * @param id Identifiant
   * @param res Nouvelle vidéo
   */
  updateOne(id: number | undefined, res: Link): number {
    let foundIndexWithName = this.findObjectIndexByName(res.name);
    let foundIndexWithUrl = this.findObjectIndexByUrl(res.url);
    let foundIndex = this.findObjectIndex(id);

    if (foundIndex >= 0 && (foundIndexWithName < 0 && foundIndexWithUrl < 0)) {
      res.id = super.resources[foundIndex].id;
      super.resources[foundIndex] = res;

      return foundIndex;
    }


    return -1;
  }

  /**
   * Trouver l'index dans le tableau d'une vidéo
   * @param url URL de la vidéo
   */
  findObjectIndexByUrl(url: string): number {
    return (<Link[]>super.resources).findIndex((res: Link) => {
      return res.url === url;
    });
  }
}
