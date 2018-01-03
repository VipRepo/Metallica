import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class CounterpartyService {

  counterpartiesURL: string;

  constructor(private http: HttpClient) {
    this.counterpartiesURL = AppConfig.endpoints.counterparties;
  }

  getCounterparties() {
    return this.http.get(this.counterpartiesURL)
    .map(counterparties => this.transform(counterparties));;
  }

  transform(value: any): any {
    let locations = [];
    if(value){
      locations = Object.keys(value).map(k => { return { "key": k, "value": value[k] } });
    } 
    return locations;
  }
}
