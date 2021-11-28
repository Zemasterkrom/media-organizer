import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

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
  protected readonly _isUpdateMode: boolean;

  /**
   * Emetteur d'événement d'annulation
   * @protected
   */
  protected readonly _cancel$: EventEmitter<void>;

  /**
   * Formulaire et validations associées
   * @protected
   */
  protected _form: FormGroup;

  /**
   * Constructeur basique d'un formulaire
   * @protected Chaque formulaire a des validations différentes donc des composants différents
   */
  protected constructor() {
    this._isUpdateMode = false;
    this._cancel$ = new EventEmitter<void>();
    this._form = new FormGroup({});
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
  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  /**
   * Emettre un évènement d'annulation pour retourner à l'accueil
   */
  cancel(): void {
    this._cancel$.emit();
  }

  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  /**
   * Créer le formulaire et ses validations
   * @protected
   */
  protected abstract _buildForm(): FormGroup;

}
