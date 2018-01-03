import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class CommodityService {

  commoditiesURL: string;

  constructor(private http: HttpClient) {
    this.commoditiesURL = AppConfig.endpoints.commodities;
  }

  getCommodities() {
    return this.http.get(this.commoditiesURL)
    .map(commodities => this.transform(commodities));
  }

  transform(value: any): any {
    let locations = [];
    if(value){
      locations = Object.keys(value).map(k => { return { "key": k, "value": value[k] } });
    } 
    return locations;
  }
}
