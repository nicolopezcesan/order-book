import axios from "axios";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { EXCHANGE_CONFIG } from "../constants/exchange-config.enum";
import { EXCHANGE_NAMES } from "../enums/exchange-names.enum";
import { getOrderBookDto } from "../dto/get-order-book.dto";
import { BinanceOrderBookEntity } from "../entities/binance-exchange.entity";
import { BitmartOrderBookEntity } from "../entities/bitmart-exchange.entity";

export interface IExchangeService {
  getOrderBook(getOrderBookDto: getOrderBookDto): Promise<TExchangeEntity>;
}

export type TExchangeEntity = BinanceOrderBookEntity | BitmartOrderBookEntity;

export type OrderBookEntityCreator = (data: any) => TExchangeEntity;

@Injectable()
export abstract class AbstractExchangeService implements IExchangeService {
  public baseUrl: string;
  public pairFormat: string;
  public orderBookEntity: OrderBookEntityCreator;

  constructor(
    exchange: EXCHANGE_NAMES,
    orderBookEntity: OrderBookEntityCreator
  ) {
    this.baseUrl = EXCHANGE_CONFIG[exchange].URL;
    this.pairFormat = EXCHANGE_CONFIG[exchange].PAIR_FORMAT;
    this.orderBookEntity = orderBookEntity;
  }

  getSymbol(base_coin: string, quote_coin: string): string {
    return this.pairFormat
      .replace(/:base_coin/g, base_coin)
      .replace(/:quote_coin/g, quote_coin);
  }

  async getOrderBook(getOrderBookDto: getOrderBookDto): Promise<TExchangeEntity> {
    try {
      const { base_coin, quote_coin, limit } = getOrderBookDto;
      const symbol = this.getSymbol(base_coin, quote_coin);

      const request = { params: { limit, symbol } };
      const response = await axios.get(this.baseUrl, request);
      return this.orderBookEntity(response.data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
