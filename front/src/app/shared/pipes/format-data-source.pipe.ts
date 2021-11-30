import {Pipe, PipeTransform} from '@angular/core';
import {formatDate} from "@angular/common";
import {Resource} from "../types/any.type";
import {MatTableDataSource} from "@angular/material/table";

@Pipe({
  name: 'formatDataSource'
})
/**
 * Pipe permettant de transformer les entrées des ressources dans le format souhaité
 */
export class FormatDataSourcePipe implements PipeTransform {
  transform(resources: MatTableDataSource<Resource>, ...args: any[]): MatTableDataSource<Resource> {
    let resourcesData = resources.data;
    let newResources = (resources && Object.keys(resourcesData[0]) ? resourcesData : [] as Resource[]);

    if (newResources.length) {
      newResources.map((resource: Resource) => {
        if (resource.date) {
          resource.dateAsString = formatDate(resource.date, "yyyy/MM/dd", "fr-FR");
        }
      });
    }

    resources.data = newResources;
    return resources;
  }
}
