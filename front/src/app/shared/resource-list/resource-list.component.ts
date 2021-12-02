import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Resource, ResourceList} from "../types/any.type";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableDataSource} from "@angular/material/table";
import {BaseService} from "../services/base.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'resource-list',
  styleUrls: ['resource-list.component.css'],
  templateUrl: 'resource-list.component.html',
  animations: [
    trigger('expansion', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
/**
 * Permet de construire un générateur de liste générique pour les items ajoutés
 */
export class ResourceListComponent implements OnChanges{
  form: FormGroup;
  query: string = '';

  /**
   * Colonnes à afficher
   * @protected
   */
  protected _columns: { [k: string]: any } = {};

  /**
   * Ressources à afficher (un seul type uniquement
   * @protected
   */
  public _resources: ResourceList;

  /**
   * Ressource dont on veut voir le détail (cliquée)
   * @protected
   */
  protected _expandedResource: undefined | Resource;

  /**
   * URL de visite de l'item
   * @protected
   */
  private _viewUrl: string;

  /**
   * URL d'édition de l'item
   * @protected
   */
  private _editUrl: string;

  /**
   * URL de suppression de l'item
   * @protected
   */
  private _deleteUrl: string;

  /**
   * Source de données de la table Material
   * @private
   */
  @Input()
  private readonly _dataSource: MatTableDataSource<Resource>;

  /**
   * Constructeur de ResourceListComponent
   * @param _service Service de base
   * @param _sanitizer Permet de filtrer les données et notamment autoriser (pour les contenus HTML)
   */
  constructor(private _service: BaseService, private _sanitizer: DomSanitizer) {
    this.query = "";
    this.form = new FormGroup({
      name: new FormControl(null),
      type: new FormControl(null),
    });
    this._resources = [] as ResourceList;
    this._columns = {};
    this._expandedResource = {} as Resource;
    this._viewUrl = "";
    this._editUrl = "";
    this._deleteUrl = "";
    this._dataSource = new MatTableDataSource<Resource>(this._resources);
  }

  /**
   * Mettre à jour la ressource activée de la liste
   * @param value Ressources à activer dans la liste
   */
  @Input()
  set expandedResource(value: Resource | undefined) {
    this._expandedResource = value;
  }

  /**
   * Obtenir la ressource active dans la liste
   */
  get expandedResource(): Resource | undefined {
    return this._expandedResource;
  }

  /**
   * Mettre à jour les colonnes de la liste en utilisant une liste clé/valeur
   * @param value Liste clé/valeur des colonnes
   */
  @Input()
  set columns(value: {}) {
    this._columns = value;
  }

  /**
   * Obtenir les colonnes de la liste
   */
  get columns(): {} {
    return this._columns;
  }

  /**
   * Obtenir les ressources de la liste
   */
  get resources(): ResourceList {
    return this._resources;
  }

  /**
   * Mettre à jour les ressources de la liste
   * @param value Ressources à associer à la liste
   */
  @Input()
  set resources(value: ResourceList) {
    this._resources = value;
    this._dataSource.data = this._resources;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.service) this._service = changes.service.currentValue;
    if (changes.resources) {
      this._dataSource.data = changes.resources.currentValue;
      this._service.resources = this._resources;
    }
  }

  /**
   * Mettre à jour le profil de la ressource (type de catégorie)
   * @param type Type de catégorie
   */
  @Input()
  set profile(type: string) {
    this._service.buildService(type);
  }

  /**
   * Obtenir la source de données de la table Material
   */
  get dataSource(): MatTableDataSource<Resource> {
    return this._dataSource;
  }

  /**
   * Afficher la ressource (détails)
   * @param resource Resource que l'on souhaite afficher
   */
  showResource(resource: Resource) {
    this._expandedResource = this._expandedResource === resource ? {} as Resource : resource;
  }

  /**
   * Obtenir l'URL de vue d'un item
   * @param id Identifiant d'un item
   */
  getViewUrl(id: string): string {
    return this._service.getViewUrl(id);
  }

  /**
   * Obtenir l'URL associée à la modification d'un item
   * @param id Identifiant d'un item
   */
  getEditUrl(id: string): string {
    return this._service.getEditUrl(id);
  }

  /**
   * Assurer que la donnée fournie est autorisée à être exécutée
   * @param resource Resource contnenant les données
   */
  trust(resource: Resource): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(<string>resource.descriptor);
  }

  /**
   * Mettre à jour le service à utiliser pour la gestion des ressources
   * @param service Service à utiliser
   */
  @Input()
  set service(service: BaseService) {
    this._service = service;
  }

  /**
   * Supprimer une ressource
   * @param resource Ressource à supprimer
   */
  delete(resource: Resource) {
    this._service.deleteOne(resource.id as string)
      .subscribe((id: string) => {
        this._resources = <ResourceList>(this._resources as Resource[]).filter((res: Resource) => res.id !== id)
        this._dataSource.data = this._resources;
      });
  }

  find() {
    if (this.form.valid) {
      this.query = '?';
      const link = this.form.value;
      for (const property in link) {
        if (link[property] && link[property] != '') {
          this.query += property + '=' + link[property] + '&';
        }
      }
      this.query = this.query.slice(0, this.query.length - 1);
      this._service.fetch(this.query)
          .subscribe(
              (res: Resource[]) => {
                this._resources = <ResourceList>(res);
                this._dataSource.data = this._resources;
              },
              (err) => {
                console.error(err);
              }
          );
    }
  }
}
