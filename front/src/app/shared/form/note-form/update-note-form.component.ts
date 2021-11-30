import {Component, OnInit} from '@angular/core';
import {NoteFormComponent} from "./note-form.component";
import {NoteService} from "../../services/note.service";
import {ActivatedRoute} from "@angular/router";
import {map, mergeMap} from "rxjs/operators";
import {Note} from "../../types/note.type";
import {of} from "rxjs";

@Component({
  selector: 'update-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
/**
 * Formulaire de mise à jour d'une note en ligne
 */
export class UpdateNoteFormComponent extends NoteFormComponent implements OnInit {

  /**
   * Constructeur de UpdateNoteFormComponent
   * @param _route Gérer la route actuelle et ses paramètres
   * @param __noteService Service de vidéo en ligne
   */
  constructor(private _route: ActivatedRoute, private __noteService: NoteService) {
    super(__noteService);
    super.isUpdateMode = true;
  }

  /**
   * Récupérer l'identifiant de l'URL pour accéder au formulaire de mise à jour
   */
  ngOnInit(): void {
    this._route.params
      .pipe(
        map((params: any) => params.id),
        mergeMap((id: string) => of(this.__noteService.fetchOne(parseInt(id))))
      )
      .subscribe((note: Note) => {
        super.model = note
      })
  }
}
