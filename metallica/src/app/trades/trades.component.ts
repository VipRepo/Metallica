import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Trade } from './model/trade.model';
import { Side } from './model/side.model';
import { TradeService } from './trades.service';
import { CounterpartyService } from '../services/counterparties.service';
import { LocationService } from '../services/locations.service';
import { CommodityService } from '../services/commodities.service';
import * as io from 'socket.io-client';
import { AppConfig } from '../config/app.config';
import { NotificationService } from "../services/notification.service";

@Component({
  selector: "app-trades",
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss'],
  providers: [TradeService]
})
export class TradesComponent implements OnInit {

  trades: Trade[] = [];
  notificationURL: string;
  private socket;

  public constructor(private tradeService: TradeService,
    private notificationService: NotificationService) {
    this.notificationURL = AppConfig.endpoints.notifications;
  }

  public ngOnInit(): void {
    this.loadTrades();
    this.initializeSocketConnection();
  }

  public ngAfterViewInit(): void {
  }


  loadTrades() {
    this.tradeService.trades$
    .subscribe(trades => {
      this.trades = trades;
    }, err => {
      console.log("Error" + err);
    });
  }


  initializeSocketConnection() {
    this.socket = io(this.notificationURL);
    this.socket.on('TradeCreate', (data) => {
      data = JSON.parse(data);
      console.log("Trade", data);
      if(data != null) {
      let trade = new Trade(data._id,
        data.tradeDate.substring(0, 10), data.commodity,
        data.side, data.counterparty,
        data.price, data.quantity,
        data.location, data.version);
        this.trades = this.trades.filter(t => t.tradeId != trade.tradeId);
        this.trades.push(trade);
     this.notificationService.openSnackBar("New Trade created !!", null);
      }
    });

    this.socket.on('TradeUpdate', (data) => {
      data = JSON.parse(data);
      console.log("Trade", data);
      if(data != null) {
      let trade = new Trade(data._id,
        data.tradeDate.substring(0, 10), data.commodity,
        data.side, data.counterparty,
        data.price, data.quantity,
        data.location, data.version);
        this.trades = this.trades.filter(t => t.tradeId != trade.tradeId);
        this.trades.push(trade);
     this.notificationService.openSnackBar("New Trade updated !!", null);
      }
    });

    this.socket.on('TradeDelete', (tradeId) => {
      tradeId = JSON.parse(tradeId);
      console.log("Trade to be deleted", tradeId);
        this.trades = this.trades.filter(t => t.tradeId != tradeId);
        this.notificationService.openSnackBar(`Trade deleted with id ${tradeId} !!`, null);
    });
  }
}
