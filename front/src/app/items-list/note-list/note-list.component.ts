import {Component} from '@angular/core';
import {Note, NOTE_KEYS} from "../../shared/types/note.type";
import {NoteService} from "../../shared/services/note.service";
import {ResourceListComponent} from "../../shared/resource-list/resource-list.component";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
/**
 * Représente une liste de notes
 */
export class NoteListComponent extends ResourceListComponent {
  /**
   * Constructeur de NoteListComponent
   * @param __noteService Service de notes
   * @param __sanitizer Permet de filtrer les données et notamment autoriser (pour les contenus HTML)
   */
  constructor(private __noteService: NoteService, private __sanitizer: DomSanitizer) {
    super(__noteService, __sanitizer);
    super.columns = NOTE_KEYS;
    super.service = this.__noteService;
    if(super.query == undefined){
      super.query = "";
    }
    this.__noteService.fetch(super.query).subscribe((resources: Note[]) => {
      resources.map((note: Note) => {
        note.descriptor = note.note;
      });
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
  get service(): NoteService {
    return this.__noteService;
  }
}
