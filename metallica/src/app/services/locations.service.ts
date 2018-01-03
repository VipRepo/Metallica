import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class LocationService {

  locationsURL: string;

  constructor(private http: HttpClient) {
    this.locationsURL = AppConfig.endpoints.locations;
  }

  getLocations() {
    return this.http.get(this.locationsURL)
    .map(locations => this.transform(locations));;
  }

  transform(value: any): any {
    let locations = [];
    if(value){
      locations = Object.keys(value).map(k => { return { "key": k, "value": value[k] } });
    } 
    return locations;
  }
}
