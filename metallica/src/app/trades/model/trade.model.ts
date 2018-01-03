import { Side } from './side.model';

export class Trade {
  constructor(
    public tradeId: number,
    public tradeDate: string,
    public commodity: string,
    public side: Side,
    public counterparty: string,
    public price: number,
    public quantity: number,
    public location: string,
    public version: number
  ) {

  }
}
