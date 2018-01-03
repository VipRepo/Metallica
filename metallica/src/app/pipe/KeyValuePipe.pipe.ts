import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keyValueObj', pure: false })
export class KeyValuePipe implements PipeTransform {

  transform(value: any, args: any[] = null): any {
    let locations = [];
    if(value){
      locations = Object.keys(value).map(k => { return { "key": k, "value": value[k] } });
    } 
    return locations;
  }
}
