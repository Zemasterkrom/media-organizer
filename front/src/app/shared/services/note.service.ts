import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {NOTES} from "../../_static/notes";
import {Note} from "../types/note.type";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
/**
 * Services pour l'ajout/modification/suppression d'une note
 */
export class NoteService extends BaseService {
  /**
   * Constructeur de NoteService
   */
  constructor(private __http:HttpClient, private _noteRouter: Router, private _noteLocation: Location) {
    super(__http,_noteRouter, _noteLocation);
    this.buildService("notes");
    super.defaultResource = Object.assign({}, NOTES[0]);
  }

  /**
   * Récupérer toutes les notes
   */
  fetch(): Observable<Note[]> {
    return <Observable<Note[]>>super.fetch();
  }

  /**
   * Obtenir une note
   * @param id Identifiant
   */
  fetchOne(id: string | undefined): Observable<Note> {
    return <Observable<Note>>super.fetchOne(id);
  }
}
