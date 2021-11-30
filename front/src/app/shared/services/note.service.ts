import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {NOTES} from "../../_static/notes";
import {Note} from "../types/note.type";

@Injectable({
  providedIn: 'root'
})
/**
 * Services pour l'ajout/modification/suppression d'une note
 */
export class NoteService extends BaseService {
  /**
   * Note par défaut
   * @private
   */
  private _defaultNote: Note;

  /**
   * Notes
   * @private
   */
  private _notes: Note[];

  /**
   * Constructeur de NoteService
   */
  constructor() {
    super();
    this.buildService("notes");
    this._defaultNote = {id: -1, name: "Default note", content: "This is a default note", date: new Date(2000, 1, 1)};
    this._notes = NOTES;
  }

  /**
   * Récupérer toutes les notes
   */
  fetch(): Note[] {
    return this._notes;
  }

  /**
   * Obtenir une note
   * @param id Identifiant
   */
  fetchOne(id: number): Note {
    return this._notes[id] || this._defaultNote;
  }



  /**
   * Ajouter une note
   * @param note Nouvelle note
   */
  addOne(note: Note): boolean {
    if (!this._notes.find(note => {
      return note.name === note.name;
    })) {
      this._notes.concat(note);
      return true;
    }

    return false;
  }

  /**
   * Mettre à jour une note
   * @param id Identifiant
   * @param note Nouvelle note
   */
  updateOne(id: number, note: Note): boolean {
    if (this._notes[id]) {
      this._notes[id] = note;
      return true;
    }

    return false;
  }

  /**
   * Supprimer une note
   * @param id Identifiant
   */
  deleteOne(id: number): boolean {
    if (this._notes[id]) {
      delete this._notes[id];
      return true;
    }

    return false;
  }
}
