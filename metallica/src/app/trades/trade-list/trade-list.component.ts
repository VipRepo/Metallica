import { Component, OnInit, Input } from "@angular/core";
import { Trade } from '../model/trade.model';
import { DatePipe } from '@angular/common';
import { Side } from '../model/side.model';

@Component({
  selector: "app-trade-list",
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
  providers: [DatePipe]
})
export class TradeListComponent implements OnInit {

  @Input()
  trades: Trade[] = null;

  selectedRow: Number;
  selectedTrade: Trade;

  constructor(private datePipe: DatePipe) {

  }

  setClickedRow(index: any, trade) {
    this.selectedRow = index;
    this.selectedTrade = trade;
  }
  public ngOnInit(): void {
    // this.selectedTrade = this.trades[0];
    // this.selectedRow = 0;
  }

  public addNewTrade() {
    this.selectedTrade = new Trade(null,
      this.datePipe.transform(Date.now(), 'yyyy-MM-dd'), "",
      Side.BUY, "",
      null, null,
      "", 0);
  }

  addTrade(trade) {
    this.selectedTrade = trade;
    this.trades = this.trades.filter(t => t.tradeId != trade.tradeId);
    this.trades.push(trade);
  }

  updateTrade(trade) {
    this.selectedTrade = trade;
    this.trades = this.trades.filter(t => t.tradeId != trade.tradeId);
    this.trades.push(trade);

  }

  deleteTrade(tradeId) {
    this.trades = this.trades.filter(t => t.tradeId != tradeId);
    this.addNewTrade();
  }

}
