import {Component} from '@angular/core';
import {ResourceListComponent} from "../../shared/resource-list/resource-list.component";
import {DomSanitizer} from "@angular/platform-browser";
import {DocumentService} from "../../shared/services/document.service";
import {FILE_DOCUMENT_KEYS, FileDocument} from "../../shared/types/file-document";

@Component({
  selector: 'document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
/**
 * Représente une liste de documents
 */
export class DocumentListComponent extends ResourceListComponent {
  /**
   * Constructeur de DocumentListComponent
   * @param __documentService Service de documents
   * @param __sanitizer Permet de filtrer les données et notamment autoriser (pour les contenus HTML)
   */
  constructor(private __documentService: DocumentService, private __sanitizer: DomSanitizer) {
    super(__documentService, __sanitizer);
    super.columns = FILE_DOCUMENT_KEYS;
    super.service = this.__documentService;
    this.__documentService.fetch(super.query).subscribe((resources: FileDocument[]) => {
      super.resources = resources;
    });
  }

  /**
   * Obtenir les colonnes à afficher
   */
  get columns(): {} {
    return super.columns;
  }

  /**
   * Obtenir le service à utiliser
   */
  get service(): DocumentService {
    return this.__documentService;
  }
}
