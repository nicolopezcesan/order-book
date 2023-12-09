import { IOrderBookModel } from "../interfaces/order-book.interface";
import { AbstractOrderBookModel } from "./abstract-exchange.model";

export interface IBitmartOrderBookResponse {
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

 export class BitmartOrderBookModel extends AbstractOrderBookModel<IBitmartOrderBookResponse> {
  constructor(data: IBitmartOrderBookResponse) {
    super(data);
  }

  protected processModel(data: IBitmartOrderBookResponse): void {
    this.timestamp = data.data.ts;
    this.bids = data.data.bids;
    this.asks = data.data.asks;
  }
}
 