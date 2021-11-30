import {Component} from '@angular/core';
import {LINKS} from "../../_static/links";
import {Link, LINK_KEYS} from "../../shared/types/link.type";
import {ResourceList} from "../../shared/types/any.type";
import {OnlineVideoService} from "../../shared/services/online-video.service";

@Component({
  selector: 'note-list',
  templateUrl: './online-video-list.component.html',
  styleUrls: ['./online-video-list.component.css']
})
/**
 * Représente une liste de vidéos
 */
export class OnlineVideoListComponent {

  /**
   * Constructeur de OnlineVideoComponent
   * @param _onlineVideoService Service de vidéos en ligne
   */
  constructor(private _onlineVideoService: OnlineVideoService) {
  }

  /**
   * Obtenir les ressources transformées
   */
  get newResources(): ResourceList {
    let resources = LINKS;
    resources.map((value: Link) => {
      value.descriptor = "<iframe width=\"560\" height=\"315\" src=\"" + value.url + "\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
    })

    return resources;
  }

  /**
   * Obtenir les colonnes à afficher
   */
  get columns() {
    return LINK_KEYS;
  }

  /**
   * Retourner le service souhaité à la liste générique
   */
  get onlineVideoService(): OnlineVideoService {
    return this._onlineVideoService;
  }
}
