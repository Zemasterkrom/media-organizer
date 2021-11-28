import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../form/CustomValidators";
import {Note} from "../types/note.type";
import {FormComponent} from "../form/form.component";

@Component({
  selector: 'note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
/**
 * Formulaire de note. Une note est une ressource textuelle simple.
 */
export class NoteFormComponent extends FormComponent  {
  /**
   * Modèle d'une note du formulaire
   * @private
   */
  private _model: Note;

  /**
   * Evénement d'envoi d'une note
   * @private
   */
  private readonly _submit$: EventEmitter<Note>;

  /**
   * Constructeur de NoteFormComponent
   */
  constructor() {
    super();
    this._model = {} as Note;
    this._submit$ = new EventEmitter<Note>();
    this._form = this._buildForm();
  }

  /**
   * Mettre à jour les données du formulaire
   * @param model Modèle de note
   */
  @Input()
  set model(model: Note) {
    this._model = model;
  }

  /**
   * Obtenir les données du formulaire
   */
  get model(): Note {
    return this._model;
  }

  /**
   * Emettre un évènement d'envoi pour la ressource vidéo en ligne
   */
  submit(): void {
    this._submit$.emit();
  }

  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<Note> {
    return this._submit$;
  }

  /**
   * Construire le formulaire avec ses validations pour une note simple
   * @protected
   */
  protected _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(),
      name: new FormControl('', Validators.compose([
        Validators.required, CustomValidators.notEmpty
      ])),
      content: new FormControl(),
      date: new FormControl()
    })
  }

}
