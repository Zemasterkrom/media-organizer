import { Component } from '@angular/core';
import {Router} from "@angular/router";

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
   * @param _router Router pour naviguer sur différentes URL
   */
  constructor(private _router:Router) { }

  /**
   * Aller à l'accueil
   */
  goToHome() {
    this._router.navigateByUrl('/media-organizer');
  }
}
