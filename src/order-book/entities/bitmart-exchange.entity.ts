import { AbstractOrderBookEntity } from "./abstract-exchange.entity";

export interface IBitmartOrderBookEntity {
  code: number
  trace: string
  message: string
  data: {
    ts: number
    symbol: string
    bids: Array<[string, string]>
    asks: Array<[string, string]>
  };
};

 export class BitmartOrderBookEntity extends AbstractOrderBookEntity<IBitmartOrderBookEntity> {
  constructor(data: IBitmartOrderBookEntity) {
    super(data);
  }

  protected processModel(data: IBitmartOrderBookEntity): void {
    this.timestamp = data.data.ts;
    this.bids = data.data.bids;
    this.asks = data.data.asks;
  }
}
 