import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], userFilter: string): any[] {
    // check if serach is undefined
     if (!userFilter) { return value; }
    // return updated value
    userFilter = userFilter.toLowerCase();
    return value.filter(it =>  {
      return it.name.toLowerCase().includes(userFilter);
    });
  }

}
