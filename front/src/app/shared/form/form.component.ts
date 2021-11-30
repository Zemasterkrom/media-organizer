import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {BaseService} from "../services/base.service";

@Component({
  template: ''
})
/**
 * Formulaire de base permettant de construire les éléments principaux d'un formulaire pour ceux héritant de ce composant de base
 */
export abstract class FormComponent {
  /**
   * Mode du formulaire (mise à jour ou ajout)
   * @protected
   */
  protected _isUpdateMode: boolean;

  /**
   * Formulaire et validations associées
   * @protected
   */
  protected _form: FormGroup;

  /**
   * Erreur affichée en cas d'erreur d'enregistrement
   * @protected
   */
  protected _error: string;

  /**
   * Constructeur basique d'un formulaire
   * @protected Chaque formulaire a des validations différentes donc des composants différents
   */
  protected constructor(protected _baseService:BaseService) {
    this._isUpdateMode = false;
    this._form = new FormGroup({});
    this._error = "";
  }

  /**
   * Retourner les instances de contrôles du formulaire
   */
  get form(): FormGroup {
    return this._form;
  }

  /**
   * Permet de savoir si l'on est en mode de mise à jour ou d'ajout
   */
  @Input()
  set isUpdateMode(updateMode:boolean) {
    this._isUpdateMode = updateMode;
  }

  /**
   * Permet de savoir si l'on est en mode de mise à jour ou d'ajout
   */
  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  /**
   * Obtenir l'erreur
   */
  get error(): string {
    return this._error;
  }

  /**
   * Mettre à jour l'erreur
   * @param error Erreur
   */
  @Input()
  set error(error: string) {
    this._error = error;
  }

  /**
   * Emettre un évènement d'annulation pour retourner à l'accueil
   */
  cancel(): void {
    this._baseService.goBack();
  }

  /**
   * Créer le formulaire et ses validations
   * @protected
   */
  protected abstract _buildForm(): FormGroup;

}
