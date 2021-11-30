import {Component, EventEmitter, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../CustomValidators";
import {Note} from "../../types/note.type";
import {FormComponent} from "../form.component";
import {NoteService} from "../../services/note.service";

@Component({
  selector: 'note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
/**
 * Formulaire de note. Une note est une ressource textuelle simple.
 */
export class NoteFormComponent extends FormComponent {
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
  constructor(private _noteService: NoteService) {
    super(_noteService);
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

  /**
   * Ajouter une note
   * @param note Note
   */
  addNote(note: Note) {
    if (this._noteService.addOne(note)) {
      this._baseService.goBack();
    } else {
      this._error = "Une note avec le même nom existe déjà";
    }
  }

  /**
   * Ajouter une note
   * @param id Identifiant
   * @param note Note
   */
  updateNote(id: number, note: Note) {
    if (this._noteService.updateOne(id, note)) {
      this._baseService.goBack();
    } else {
      this._error = "Une note avec le même nom existe déjà";
    }
  }
}
