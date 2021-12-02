import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {Resource} from "../../types/any.type";
import {map, mergeMap} from "rxjs/operators";
import {Errors} from "../../types/link.type";
import {OnlineVideoService} from "../../services/online-video.service";
import {Link} from "../../types/link.type";

@Component({
  selector: 'online-video-viewer',
  templateUrl: './online-video-viewer.component.html',
  styleUrls: ['./online-video-viewer.component.css']
})
/**
 * Permet d'afficher une vidéo en ligne
 */
export class OnlineVideoViewerComponent implements OnInit {

  /**
   * Ressource vidéo récupérée
   * @private
   */
  @Input()
  private _model: Link;

  /**
   * Message à afficher en cas d'erreur
   * @private
   */
  private _error: Errors;

  /**
   * Constructeur de OnlineVideoViewerComponent
   * @param _route Route actuelle
   * @param _sanitizer Permet de filtrer le HTML et autoriser du contenu HTML
   * @param _onlineVideoService Service de gestion des vidéos en ligne
   */
  constructor(private _route: ActivatedRoute, private _sanitizer: DomSanitizer, private _onlineVideoService: OnlineVideoService) {
    this._model = {} as Link;
    this._error = {} as Errors;
  }

  get model(): Link {
    return this._model;
  }

  get error(): Errors {
    return this._error;
  }

  ngOnInit(): void {
    this._route.params
      .pipe(
        map((params: any) => params.id),
        mergeMap((id: string) => this._onlineVideoService.fetchOne(id))
      )
      .subscribe((video: Link) => {
        this._model = video;
        this._model.descriptor = "<iframe class='full-width-height' src=\"" + video.link + "\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
      }, () => this._error = Errors.NOT_FOUND)
  }

  /**
   * Assurer que la donnée fournie est autorisée à être exécutée
   * @param resource Resource contnenant les données
   */
  trust(resource: Resource): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(<string>resource.descriptor);
  }

}
