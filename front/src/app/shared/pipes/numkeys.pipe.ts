import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numkeys'
})
/**
 * Pipe permettant de récupérer le nombre de clés d'un objet
 */
export class NumkeysPipe implements PipeTransform {
  transform(value: {}, ...args: any[]): number {
    return Object.keys(value).length;
  }
}
