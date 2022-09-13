import { Pipe, PipeTransform } from '@angular/core';
import { League, Team } from '../interfaces/interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(values: any[], search: string): any[] {
    if(search.length === 0)
      return values;
    return values.filter(v => v.name.toLowerCase().includes(search.toLowerCase()));
  }

}
