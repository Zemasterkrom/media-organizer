import {Component, Input} from '@angular/core';
import {Category} from "../shared/types/category.type";

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css'],
})
/**
 * Carte pour sélectionner une catégorie
 */
export class CategoryCardComponent {

  /**
   * Catégorie associée à la carte
   */
  private _category: Category;

  /**
   * Constructeur de CategoryCardComponent
   */
  constructor() {
    this._category = {} as Category;
  }


  /**
   * Obtenir la catégorie associée à la carte
   * @return Catégorie associée à la carte
   */
  get category(): Category {
    return this._category;
  }

  /**
   * Mettre à jour la catégorie de la carte
   * @param value Catégorie à associer à la carte
   */
  @Input()
  set category(value: Category) {
    this._category = value;
  }
}
