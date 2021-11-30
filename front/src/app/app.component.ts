import { Component } from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'media-organizer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * Composant principal : représente la barre de navigation de l'application
 */
export class AppComponent {

  /**
   * Constructeur de AppComponent initialisant les assets enregistrés
   * @param _matIconRegistry Service d'enregistrement des icônes Material
   * @param _domSanitizer Filtreur du DOM pour éviter les injections XSS
   */
  constructor(private _matIconRegistry: MatIconRegistry, private _domSanitizer: DomSanitizer) {
    this._matIconRegistry.addSvgIcon('icon', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/icon.svg'));
    this._matIconRegistry.addSvgIcon('dailymotion', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/dailymotion.svg'));
    this._matIconRegistry.addSvgIcon('youtube', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/youtube.svg'));
    this._matIconRegistry.addSvgIcon('note', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/note.svg'));
    this._matIconRegistry.addSvgIcon('icon', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/icon.svg'));
    this._matIconRegistry.addSvgIcon('add', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/library_add.svg'));
    this._matIconRegistry.addSvgIcon('edit', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/edit.svg'));
    this._matIconRegistry.addSvgIcon('delete', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/delete.svg'));
    this._matIconRegistry.addSvgIcon('preview', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/preview.svg'));
  }
}
