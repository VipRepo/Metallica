import { Injectable } from "@angular/core";
import { LocationService } from "./locations.service";
import { CounterpartyService } from "./counterparties.service";
import { CommodityService } from "./commodities.service";
import { Observable, Subject } from 'rxjs';

@Injectable()
export class RefDataService {

  private locationSource = new Subject<any>();
  private commoditySource = new Subject<any>();
  private counterpartySource = new Subject<any>();
    locations$: any =  this.locationSource.asObservable();
    commodities$: any =  this.commoditySource.asObservable();
    counterparties$: any =  this.counterpartySource.asObservable();

    locations: any;
    counterparties: any;
    commodities: any;

    constructor( private locationService: LocationService,
        private commodityService: CommodityService,
        private counterpartyService: CounterpartyService){

            this.loadLocations();
            this.loadCounterparties();
            this.loadCommodities();
    }

    loadLocations() {
        this.locationService.getLocations()
          .subscribe(locations => {
            console.log("Locaitons: " + locations);
            this.locations = locations;
            this.locationSource.next(locations);
          }, err => {
            console.log("Error" + err);
            throw err;
          });
      }

      getLocations() {
        if(this.locations) {
          return Observable.of(this.locations);
        }
        else {
          return this.locations$;
        }
      }
    
      loadCounterparties() {
        this.counterpartyService.getCounterparties()
          .subscribe(counterparties => {
           this.counterparties = counterparties;
            this.counterpartySource.next(counterparties);
          }, err => {
            console.log("Error" + err);
            throw err;
          });
      }

      getCounterparties() {
        if(this.counterparties) {
          return Observable.of(this.counterparties);
        }
        else {
          return this.counterparties$;
        }
      }
    
      loadCommodities() {
        this.commodityService.getCommodities()
          .subscribe(commodities => {
            
           this.commodities = commodities;
            this.commoditySource.next(commodities);
          }, err => {
            console.log("Error" + err);
            throw err;
          });
      }

      getCommodities() {
        if(this.commodities) {
          return Observable.of(this.commodities);
        }
        else {
          return this.commodities$;
        }
      }
}