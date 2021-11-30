import {Component} from '@angular/core';
import {NoteService} from "../shared/services/note.service";
import {OnlineVideoService} from "../shared/services/online-video.service";

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
/**
 * Composant global recensant les différents formulaires d'ajouts de ressources
 */
export class AddResourceComponent {

  /**
   * Constructuer de AddResourceComponent
   * @param _noteService Service pour la gestion des notes
   * @param _onlineVideoService Service pour la gestion des vidéos
   */
  constructor(private _noteService: NoteService, private _onlineVideoService: OnlineVideoService) {
  }

  /**
   * Aller à l'accueil
   */
  goToHome() {
    this._noteService.navigateByUrl('/media-organizer');
  }
}
