
export interface IOrderBookEntity {
  timestamp: number;
  bids: Array<[string, string]>;
  asks: Array<[string, string]>;
}

// export abstract class AbstractOrderBookEntity<T> implements IOrderBookEntity {
export abstract class AbstractOrderBookEntity<T> {
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