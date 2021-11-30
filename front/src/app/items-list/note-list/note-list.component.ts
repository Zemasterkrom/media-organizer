import {Component} from '@angular/core';
import {NOTES} from "../../_static/notes";
import {Note, NOTE_KEYS} from "../../shared/types/note.type";
import {ResourceList} from "../../shared/types/any.type";
import {NoteService} from "../../shared/services/note.service";

@Component({
  selector: 'note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
/**
 * Représente une liste de notes
 */
export class NoteListComponent {

  /**
   * Constructeur de NoteListComponent
   * @param _noteService Service de notes
   */
  constructor(private _noteService: NoteService) {
  }

  /**
   * Obtenir les ressources transformées
   */
  get newResources(): ResourceList {
    let resources = NOTES;
    resources.map((value: Note) => {
      value.descriptor = value.content;
    })

    return resources;
  }

  /**
   * Obtenir les colonnes à afficher
   */
  get columns() {
    return NOTE_KEYS;
  }

  /**
   * Retourner le service souhaité à la liste générique
   */
  get noteService(): NoteService {
    return this._noteService;
  }
}
