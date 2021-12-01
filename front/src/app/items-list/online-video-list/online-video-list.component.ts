import {Component} from '@angular/core';
import {Link, LINK_KEYS} from "../../shared/types/link.type";
import {OnlineVideoService} from "../../shared/services/online-video.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ResourceListComponent} from "../../shared/resource-list/resource-list.component";

@Component({
  selector: 'note-list',
  templateUrl: './online-video-list.component.html',
  styleUrls: ['./online-video-list.component.css']
})
/**
 * Représente une liste de vidéos
 */
export class OnlineVideoListComponent extends ResourceListComponent {

  /**
   * Constructeur de OnlineVideoComponent
   * @param __onlineVideoService Service de vidéos en ligne
   * @param __sanitizer Permet de filtrer les données et notamment autoriser (pour les contenus HTML)
   */
  constructor(private __onlineVideoService: OnlineVideoService, private __sanitizer: DomSanitizer) {
    super(__onlineVideoService, __sanitizer);
    super.columns = LINK_KEYS;
    super.service = this.__onlineVideoService;
    this.__onlineVideoService.fetch().subscribe((resources: Link[]) => {
      resources.map((video: Link) => {
        video.descriptor = "<iframe width=\"560\" height=\"315\" src=\"" + video.url + "\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
      });
      super.resources = resources;
    });
  }

}
