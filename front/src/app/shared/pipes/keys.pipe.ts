import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'keys'
})
/**
 * Pipe permettant de récupérer les clés d'un objet
 */
export class KeysPipe implements PipeTransform {
  transform(value: {}, ...args: any[]): string[] {
    return Object.keys(value);
  }
}
