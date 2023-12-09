import { BinanceService } from "../services/binance-exchange.service";
import { BitmartService } from "../services/bitmart-exchange.service";

export interface IGetOrderBookParams {
  // symbol: string;
  base_coin: string;
  quote_coin: string;
  limit: string;
}

export interface IExchangeService<T> {
  getOrderBook(params: IGetOrderBookParams): Promise<T>;
}

export interface IExchangeServiceFactory {
  getService(params: string): BinanceService | BitmartService;
}

export interface IOrderBookModel {
  timestamp: number;
  bids: Array<[string, string]>;
  asks: Array<[string, string]>;
}
