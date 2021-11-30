import {Component} from '@angular/core';
import {NOTES} from "../../_static/notes";
import {Note, NOTE_KEYS} from "../../shared/types/note.type";
import {ResourceList} from "../../shared/types/any.type";

@Component({
  selector: 'note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent{

  constructor() {}

  get newResources(): ResourceList {
    let resources = NOTES;
    resources.map((value:Note) =>  {
      value.descriptor = value.content;
    })

    return resources;
  }

  get columns() {
    return NOTE_KEYS;
  }
}
