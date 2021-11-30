import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {NOTES} from "../../_static/notes";
import {Note} from "../types/note.type";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

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
  constructor(private _noteRouter: Router, private _noteLocation: Location) {
    super(_noteRouter, _noteLocation);
    this.buildService("notes");
    super.defaultResource = {
      id: -1,
      name: "Default note",
      content: "This is a default note",
      date: new Date(2000, 1, 1)
    };
    super.resources = Object.assign([], NOTES);
  }

  /**
   * Récupérer toutes les notes
   */
  fetch(): Note[] {
    return <Note[]>super.fetch();
  }

  /**
   * Obtenir une note
   * @param id Identifiant
   */
  fetchOne(id: number): Note {
    return <Note>super.fetchOne(id);
  }
}
