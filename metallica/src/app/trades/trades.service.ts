import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';
import { Trade } from './model/trade.model';
import { AppConfig } from '../config/app.config';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TradeService {
  // private headers: HttpHeaders;
  private tradeUrl: string;
  private tradeSource = new Subject<any>();
  trades$ = this.tradeSource.asObservable();

  private handleError(error: any) {
    if (error instanceof Response) {
      return Observable.throw(error.json()['error'] || 'backend server error');
    }
    return Observable.throw(error || 'backend server error');
  }

  constructor(private http: HttpClient) {
    this.tradeUrl = AppConfig.endpoints.trades;
    // this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getTrades(): Observable<Trade[]> {
    return this.http.get(this.tradeUrl)
      .map((res: Response) => res)
      .catch((error: any) => this.handleError(error));
  }

  findTrades(fromDate, toDate, commodity, side, counterparty, location): Observable<Trade[]> {
    let params = new HttpParams()
    .set('side', side)
    .set('counterparty', counterparty)
    .set('commodity', commodity)
    .set('location', location)
    .set('fromDate', fromDate)
    .set('toDate', toDate);
    return this.http.get(this.tradeUrl+'/query' , {
      params: params
    })
      .map((res: Response) => res)
      .catch((error: any) => this.handleError(error));
  }

  createTrade(trade): Observable<Trade> {
    return this.http.post(this.tradeUrl, trade)
      .map((res: Response) => res)
      .catch((error: any) => this.handleError(error));
  }

  updateTrade(trade): Observable<Trade> {
    return this.http.put(this.tradeUrl, trade)
      .map((res: Response) => res)
      .catch((error: any) => this.handleError(error));
  }

  deleteTrade(tradeId): Observable<Trade> {
    return this.http.delete(this.tradeUrl + '/' + tradeId)
      .map((res: Response) => res)
      .catch((error: any) => this.handleError(error));
  }

  publishTrades(trades: any) {
    this.tradeSource.next(trades);
  }

}
