import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {map, mergeMap} from "rxjs/operators";
import {Errors} from "../../types/link.type";
import {NoteService} from "../../services/note.service";
import {Note} from "../../types/note.type";

@Component({
  selector: 'note-viewer',
  templateUrl: './note-viewer.component.html',
  styleUrls: ['./note-viewer.component.css']
})
/**
 * Permet d'afficher une note en ligne
 */
export class NoteViewerComponent implements OnInit {

  /**
   * Ressource de note récupérée
   * @private
   */
  @Input()
  private _model: Note;

  /**
   * Message à afficher en cas d'erreur
   * @private
   */
  private _error: Errors;

  /**
   * Constructeur de NoteViewerComponent
   * @param _route Route actuelle
   * @param _sanitizer Permet de filtrer le HTML et autoriser du contenu HTML
   * @param _noteService Service de gestion des notes en ligne
   */
  constructor(private _route: ActivatedRoute, private _sanitizer: DomSanitizer, private _noteService: NoteService) {
    this._model = {} as Note;
    this._error = {} as Errors;
  }

  get model(): Note {
    return this._model;
  }

  get error(): Errors {
    return this._error;
  }

  ngOnInit(): void {
    this._route.params
      .pipe(
        map((params: any) => params.id),
        mergeMap((id: string) => this._noteService.fetchOne(id))
      )
      .subscribe((note: Note) => {
        this._model = note;
        this._model.descriptor = this._model.note;
      }, () => this._error = Errors.NOT_FOUND)
  }

}
