import {Component, EventEmitter, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../validators/custom-validators";
import {Errors} from "../../types/file-document";
import {FormComponent} from "../form.component";
import {HttpStatusCode} from "@angular/common/http";
import {DocumentService} from "../../services/document.service";
import {FileDocument, filterFields} from "../../types/file-document";

@Component({
  selector: 'document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
/**
 * Formulaire de note. Une note est une ressource textuelle simple.
 */
export class DocumentFormComponent extends FormComponent {
  file:File;
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
    this.file = {} as File;
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
      ])),
      file: new FormControl(undefined,  Validators.compose([
        Validators.required
      ]))
    })
  }

  /**
   * Ajouter un document
   * @param doc Document
   */
  addDocument(doc: FileDocument) {
    var formData = new FormData();
    if (this.file) {
      formData.append("file", this.file, this.file.name);
      const nn = this._form.get("name")?.value;
      formData.append("name", nn);
    }
    this._documentService.addOne(formData).subscribe(() => this._documentService.navigateToHome(), (error) => {
      if (error.status > 0) {
        this._error = error.statusCode === HttpStatusCode.Conflict || HttpStatusCode.UnprocessableEntity ? Errors.ALREADY_EXISTS : Errors.INTERNAL_ERROR;
      } else {
        this._error = Errors.INTERNAL_ERROR;
      }
    });
  }

  /**
   * Mettre à jour un document
   * @param id Identifiant
   * @param doc Document
   */
  updateDocument(id: string, doc: FileDocument) {
    this._documentService.updateOne(id, filterFields(doc)).subscribe(() => this._documentService.navigateByRoute(this._documentService.getBaseUrl()), (error) => {
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

  /**
   * Mettre à jour le fichier à envoyer
   * @param data Données reçues par le formulaire
   */
  changeFile(data: any) {
    this._model.file = data.files[0];
    this.file = data.files[0];
  }
}
