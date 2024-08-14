import { AbstractOrderBookEntity } from "./abstract-exchange.entity";

export interface IBinanceOrderBookEntity {
  lastUpdateId: number
  bids: Array<[string, string]>
  asks: Array<[string, string]>
}

export class BinanceOrderBookEntity extends AbstractOrderBookEntity<IBinanceOrderBookEntity> {
  constructor(data: IBinanceOrderBookEntity) {
    super(data);
  }

  protected processModel(data: IBinanceOrderBookEntity): void {
    this.timestamp = data.lastUpdateId;
    this.bids = data.bids;
    this.asks = data.asks;
  }
}
