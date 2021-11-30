import {Pipe, PipeTransform} from '@angular/core';
import {formatDate} from "@angular/common";
import {Resource} from "../types/any.type";

@Pipe({
  name: 'format'
})
/**
 * Pipe permettant de transformer les entrées des ressources dans le format souhaité
 */
export class FormatPipe implements PipeTransform {
  transform(resources: Resource[], ...args: any[]): Resource[] {
    let newResources = (resources && Object.keys(resources[0]) ? resources : [] as Resource[]);

    if (newResources.length) {
      newResources.map((resource: Resource) => {
        resource.dateAsString = formatDate(resource.date, "yyyy/MM/dd", "fr-FR");
      });
    }

    return resources;
  }
}
