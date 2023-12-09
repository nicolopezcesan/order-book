import { IOrderBookModel } from "../interfaces/order-book.interface";

export abstract class AbstractOrderBookModel<T> implements IOrderBookModel {
  public timestamp: number;
  public bids: Array<[string, string]>;
  public asks: Array<[string, string]>;

  constructor(data: T) {
    this.processModel(data);
    this.bids = this.sortBids();
    this.asks = this.sortAsks();
  }

  protected abstract processModel(data: T): void;

  private sortBids() {
    return this.bids.sort((a, b) => Number(b[0]) - Number(a[0]));
  }

  private sortAsks() {
    return this.asks.sort((a, b) => Number(a[0]) - Number(b[0]));
  }
}