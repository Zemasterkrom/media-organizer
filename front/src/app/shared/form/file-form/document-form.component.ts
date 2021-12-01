import {Component, EventEmitter, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../validators/custom-validators";
import {Errors, filterFields, Note} from "../../types/note.type";
import {FormComponent} from "../form.component";
import {HttpStatusCode} from "@angular/common/http";
import {DocumentService} from "../../services/document.service";
import {FileDocument} from "../../types/file-document";

@Component({
  selector: 'document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
/**
 * Formulaire de note. Une note est une ressource textuelle simple.
 */
export class DocumentFormComponent extends FormComponent {

  /**
   * Modèle d'un document du formulaire
   * @private
   */
  protected _model: FileDocument;

  /**
   * Evénement d'envoi d'un document
   * @private
   */
  private readonly _submit$: EventEmitter<FileDocument>;

  /**
   * Constructeur de NoteFormComponent
   */
  constructor(private _documentService: DocumentService) {
    super(_documentService);
    this._model = {} as FileDocument;
    this._submit$ = new EventEmitter<FileDocument>();
    this._form = this._buildForm();
  }

  /**
   * Mettre à jour les données du formulaire
   * @param model Modèle de note
   */
  @Input()
  set model(model: FileDocument) {
    this._model = model;
    this._form.patchValue(this._model);
  }

  /**
   * Obtenir les données du formulaire
   */
  get model(): FileDocument {
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
      ]))
    })
  }

  /**
   * Ajouter une note
   * @param note Note
   */
  addNote(note: Note) {
    this._documentService.addOne(filterFields(note)).subscribe(() => this._documentService.navigateToHome(), (error) => {
      if (error.status > 0) {
        this._error = error.statusCode === HttpStatusCode.Conflict || HttpStatusCode.UnprocessableEntity ? Errors.ALREADY_EXISTS : Errors.INTERNAL_ERROR;
      } else {
        this._error = Errors.INTERNAL_ERROR;
      }
    });
  }

  /**
   * Ajouter une note
   * @param id Identifiant
   * @param note Note
   */
  updateNote(id: string, note: Note) {
    this._documentService.updateOne(id, filterFields(note)).subscribe(() => this._documentService.navigateByRoute(this._documentService.getBaseUrl()), (error) => {
      if (error.status > 0) {
        switch (error.status) {
          case HttpStatusCode.Conflict:
          case HttpStatusCode.UnprocessableEntity:
            this._error = Errors.ALREADY_EXISTS;
            break;
          case HttpStatusCode.NotFound:
            this._error = Errors.NOT_FOUND;
            break;
          default:
            this._error = Errors.INTERNAL_ERROR;
            break;
        }
      } else {
        this._error = Errors.INTERNAL_ERROR;
      }
    });
  }

  isNotFound(error: string) {
    return error === Errors.NOT_FOUND;
  }
}
