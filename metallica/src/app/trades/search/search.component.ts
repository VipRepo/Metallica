import { Component, OnInit, AfterViewInit } from "@angular/core";
import { TradeService } from "../trades.service";
import { RefDataService } from "../../services/refdata.service";
import { Trade } from '../model/trade.model';

@Component({
  selector: "search-trades",
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: []
})
export class SearchComponent implements OnInit {
    query: any= {};
    locations: any;
    counterparties: any;
    commodities: any;

    public constructor(private tradeService: TradeService,
      private refDataService: RefDataService) {
        
    }

    ngOnInit() {
      this.loadAllTrades();
      this.loadCounterparties();
      this.loadCommodities();
      this.loadLocations();
    }

    loadAllTrades() {
      this.tradeService.getTrades()
      .subscribe(trades => {
        // console.log(`Trades  {{trades}}`);
        this.convertTradeAndPublish(trades);
      }, err => {
        console.log("Error" + err);
      });
    }

    onSubmit() {
      let fd = this.query.fromDate;
      fd.setMinutes( fd.getMinutes() - fd.getTimezoneOffset() );
      let td = this.query.toDate;
      td.setMinutes( td.getMinutes() - td.getTimezoneOffset() );
        console.log(JSON.stringify(this.query));
        this.tradeService.findTrades(fd.toISOString().substring(0, 10),
          td.toISOString().substring(0, 10), this.query.selectedCommodity, 
          this.query.side, this.query.selectedCounterParty, this.query.selectedLocation)
        .subscribe(trades => {
          console.log(`Trades  {{trades}}`);
         this.convertTradeAndPublish(trades);
        }, err => {
          console.log("Error" + JSON.stringify(err));
        });
    }

    convertTradeAndPublish(trades){
      let tradesRecieved = trades.map((trade: any) => {
        return new Trade(trade._id,
        trade.tradeDate.substring(0, 10), trade.commodity,
        trade.side, trade.counterparty,
        trade.price, trade.quantity,
        trade.location, trade.version)});

        this.tradeService.publishTrades(tradesRecieved);
    }

    loadLocations() {
      this.refDataService.locations$
        .subscribe(locations => {
          console.log("Locaitons in search component: " + locations)
          this.locations = locations;
        }, err => {
          console.log("Error" + err);
          throw err;
        });
    }
  
    loadCounterparties() {
      this.refDataService.counterparties$
        .subscribe(counterparties => {
          this.counterparties = counterparties;
        }, err => {
          console.log("Error" + err);
          throw err;
        });
    }
  
    loadCommodities() {
      this.refDataService.commodities$
        .subscribe(commodities => {
          
          this.commodities = commodities;
          console.log("commodity recieved"+ JSON.stringify(this.commodities));
        }, err => {
          console.log("Error" + err);
          throw err;
        });
    }
}