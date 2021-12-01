import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../CustomValidators";
import {FormComponent} from "../form.component";
import {Errors, Link} from "../../types/link.type";
import {OnlineVideoService} from "../../services/online-video.service";
import {HttpStatusCode} from "@angular/common/http";

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
    this._model = model;
    this._form.patchValue(this._model);
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
   * @param video Vidéo à ajouter
   */
  addOnlineVideo(video: Link) {
    this._onlineVideoService.addOne(video).subscribe(() => this._onlineVideoService.navigateToHome(), (error) => {
      this._error = error.statusCode === HttpStatusCode.Conflict ? Errors.ALREADY_EXISTS : Errors.INTERNAL_ERROR;
    });
  }

  /**
   * Mettre à jour une vidéo
   * @param id Identifiant
   * @param video Vidéo
   */
  updateOnlineVideo(id: string | undefined, video: Link) {
    this._onlineVideoService.updateOne(id, video).subscribe(() => this._onlineVideoService.navigateByRoute(this._onlineVideoService.getBaseUrl()), (error) => {
      this._error = error.statusCode === 409 ? Errors.ALREADY_EXISTS : Errors.INTERNAL_ERROR;

      switch (error.statusCode) {
        case HttpStatusCode.Conflict:
          this._error = Errors.ALREADY_EXISTS;
          break;
        case HttpStatusCode.NotFound:
          this._error = Errors.NOT_FOUND;
          break;
        default:
          this._error = Errors.INTERNAL_ERROR;
          break;
      }
    });
  }

  isNotFound(error: string) {
    return error === Errors.NOT_FOUND;
  }

}
