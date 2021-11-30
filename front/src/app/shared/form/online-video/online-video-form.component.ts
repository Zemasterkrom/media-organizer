import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../CustomValidators";
import {FormComponent} from "../form.component";
import {Link} from "../../types/link.type";
import {OnlineVideoService} from "../../services/online-video.service";
import {Errors} from "../../types/link.type";

@Component({
  selector: 'online-video-form',
  templateUrl: './online-video-form.component.html',
  styleUrls: ['./online-video-form.component.css']
})

/**
 * Formulaire pour une vidéo en ligne YouTube/Dailymotion
 */
export class OnlineVideoFormComponent extends FormComponent {

  /**
   * Modèle du formulaire pour une vidéo YouTube/Dailymotion
   * @private
   */
  private _model: Link;

  /**
   * Emetteur d'événement pour un lien YouTube/Dailymotion
   * @private
   */
  private readonly _submit$: EventEmitter<Link>;

  /**
   * Constructeur de OnlineVideoFormComponent
   */
  constructor(private _onlineVideoService: OnlineVideoService) {
    super(_onlineVideoService);
    this._model = {} as Link;
    this._submit$ = new EventEmitter<Link>();
    this._form = this._buildForm();
  }


  /**
   * Mettre à jour les données du formulaire
   * @param model Modèle de lien
   */
  @Input()
  set model(model: Link) {
    let id = model.id !== undefined ? model.id : -1;
    this._model = model;

    if (id < 0) {
      this._error = "La vidéo cherchée n'existe pas";
    } else {
      this._model.id = id;
      this._model.date = new Date(Date.now());
      this._form.patchValue(this._model);
    }
  }

  /**
   * Obtenir les données du formulaire
   */
  get model(): Link {
    return this._model;
  }

  @Output('submit')
  get submit$(): EventEmitter<Link> {
    return this._submit$;
  }

  /**
   * Construire le formulaire avec ses validations concernant les caractéristiques d'une ressource vidéo en ligne
   * @protected
   */
  protected _buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required, CustomValidators.notEmpty
      ])),
      url: new FormControl('', Validators.compose([
        Validators.required, CustomValidators.videoUrl
      ]))
    })
  }

  /**
   * Ajouter une vidéo
   * @param video Vidéo
   */
  addOnlineVideo(video: Link) {
    if (this._onlineVideoService.addOne(video) >= 0) {
      this._onlineVideoService.navigateToHome();
    } else {
      this._error = Errors.ALREADY_EXISTS;
    }
  }

  /**
   * Ajouter une vidéo
   * @param id Identifiant
   * @param video Vidéo
   */
  updateOnlineVideo(id: number | undefined, video: Link) {
    if (this._onlineVideoService.updateOne(id, video) >= 0) {
      this._onlineVideoService.navigateByRoute(this._onlineVideoService.getBaseUrl());
    } else {
      this._error = Errors.ALREADY_EXISTS;
    }
  }

  isNotFound(error: string) {
    return error === Errors.NOT_FOUND;
  }

}
