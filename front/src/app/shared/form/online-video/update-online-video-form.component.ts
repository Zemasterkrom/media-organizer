import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, mergeMap} from "rxjs/operators";
import {OnlineVideoService} from "../../services/online-video.service";
import {OnlineVideoFormComponent} from "./online-video-form.component";
import {Link} from "../../types/link.type";
import {Errors} from "../../types/note.type";

@Component({
  selector: 'update-online-video-form',
  templateUrl: './online-video-form.component.html',
  styleUrls: ['./online-video-form.component.css']
})
/**
 * Formulaire de mise à jour d'une vidéo en ligne
 */
export class UpdateOnlineVideoFormComponent extends OnlineVideoFormComponent implements OnInit {

  /**
   * Constructeur de UpdateOnlineVideoFormComponent
   * @param _route Gérer la route actuelle et ses paramètres
   * @param __onlineVideoService Service de vidéo en ligne
   */
  constructor(private _route: ActivatedRoute, private __onlineVideoService: OnlineVideoService) {
    super(__onlineVideoService);
    super.isUpdateMode = true;
  }

  /**
   * Récupérer l'identifiant de l'URL pour accéder au formulaire de mise à jour
   */
  ngOnInit(): void {
    this._route.params
      .pipe(
        map((params: any) => params.id),
        mergeMap((id: string) => this.__onlineVideoService.fetchOne(id))
      )
      .subscribe((video: Link) => super.model = video, () => super.error = Errors.NOT_FOUND)
  }
}
