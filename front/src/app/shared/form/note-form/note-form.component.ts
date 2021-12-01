import {Component, EventEmitter, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../CustomValidators";
import {Errors, Note} from "../../types/note.type";
import {FormComponent} from "../form.component";
import {NoteService} from "../../services/note.service";
import {HttpStatusCode} from "@angular/common/http";

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
  protected _model: Note;

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
    this._form.patchValue(this._model);
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
    this._noteService.addOne(note).subscribe(() => this._noteService.navigateToHome(), (error) => {
      this._error = error.statusCode === HttpStatusCode.Conflict ? Errors.ALREADY_EXISTS : Errors.INTERNAL_ERROR;
    });
  }

  /**
   * Ajouter une note
   * @param id Identifiant
   * @param note Note
   */
  updateNote(id: string, note: Note) {
    this._noteService.updateOne(id, note).subscribe(() => this._noteService.navigateByRoute(this._noteService.getBaseUrl()), (error) => {
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
