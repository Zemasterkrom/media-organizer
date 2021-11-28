import { Component } from '@angular/core';
import {Category} from "../shared/types/category.type";
import {CATEGORIES} from "../_static/categories";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/**
 * Composant de l'accueil permettant la sélection d'une catégorie ou l'ajout d'une ressource
 */
export class HomeComponent {

  /**
   * Catégories disponibles
   */
  private readonly _categories:Category[]

  /**
   * Constructeur de HomeComponent
   */
  constructor() {
    this._categories = CATEGORIES;
  }


  /**
   * Obtenir les catégories disponibles
   * @return Catégories disponibles
   */
  get categories(): Category[] {
    return this._categories;
  }
}
