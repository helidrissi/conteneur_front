import { Pipe, PipeTransform } from '@angular/core';
import {User} from './models/user'

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

 /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(items: User[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      //return it.toLocaleLowerCase().includes(searchText);
      return it.libelle.toLocaleLowerCase().includes(searchText);
    });
    
  }

}
