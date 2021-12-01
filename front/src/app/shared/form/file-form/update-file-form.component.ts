import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, mergeMap} from "rxjs/operators";
import {Errors} from "../../types/note.type";
import {DocumentFormComponent} from "./document-form.component";
import {DocumentService} from "../../services/document.service";
import {FileDocument} from "../../types/file-document";

@Component({
  selector: 'update-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
/**
 * Formulaire de mise à jour d'une note en ligne
 */
export class UpdateFileFormComponent extends DocumentFormComponent implements OnInit {

  /**
   * Constructeur de UpdateNoteFormComponent
   * @param _route Gérer la route actuelle et ses paramètres
   * @param __documentService Service de vidéo en ligne
   */
  constructor(private _route: ActivatedRoute, private __documentService: DocumentService) {
    super(__documentService);
    super.isUpdateMode = true;
  }

  /**
   * Récupérer l'identifiant de l'URL pour accéder au formulaire de mise à jour
   */
  ngOnInit(): void {
    this._route.params
      .pipe(
        map((params: any) => params.id),
        mergeMap((id: string) => this.__documentService.fetchOne(id))
      )
      .subscribe((doc: FileDocument) => super.model = doc, () => super.error = Errors.NOT_FOUND)
  }
}
