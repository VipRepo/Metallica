import { Component, OnInit, AfterViewInit } from "@angular/core";
import * as io from 'socket.io-client';
import { AppConfig } from '../../config/app.config';
import { NotificationService } from "../../services/notification.service";

@Component({
  selector: "live-market",
  templateUrl: './live-market.component.html',
  styleUrls: ['./live-market.component.scss'],
  providers: []
})
export class LiveMarketComponent implements OnInit{
  
  notificationURL: string;
  private socket;
  marketPricelabel: string = "Market Price not available";

  public constructor(private notificationService: NotificationService) {
    this.notificationURL = AppConfig.endpoints.notifications;
  }

  ngOnInit() {
    this.initializeSocketConnection();
  }

  initializeSocketConnection() {
    this.socket = io(this.notificationURL);
    this.socket.on('MarketData', (data) => {
      console.log("Market price"+ data);
      this.marketPricelabel = JSON.parse(data)
      .map(e => e.name + '|' + e.location + '|' + e.price).join(`    `);

    //   data = JSON.parse(data);
    //   console.log("Trade", data);
    //   if(data != null) {
    //   let trade = new Trade(data._id,
    //     data.tradeDate.substring(0, 10), data.commodity,
    //     data.side, data.counterparty,
    //     data.price, data.quantity,
    //     data.location, data.version);
    //     this.trades = this.trades.filter(t => t.tradeId != trade.tradeId);
    //     this.trades.push(trade);
    //  this.notificationService.openSnackBar("New Trade created !!", null);
      // }
    });
  }
}