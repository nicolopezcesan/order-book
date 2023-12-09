import { AbstractOrderBookModel } from "./abstract-exchange.model";

export interface IBinanceOrderBookResponse {
  lastUpdateId: number
  bids: Array<[string, string]>
  asks: Array<[string, string]>
}

export class BinanceOrderBookModel extends AbstractOrderBookModel<IBinanceOrderBookResponse> {
  constructor(data: IBinanceOrderBookResponse) {
    super(data);
  }

  protected processModel(data: IBinanceOrderBookResponse): void {
    this.timestamp = data.lastUpdateId;
    this.bids = data.bids;
    this.asks = data.asks;
  }
}
