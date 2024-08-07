import axios from "axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EXCHANGE_CONFIG } from "../constants/exchange-config.enum";
import { EXCHANGE_NAMES } from "../enums/exchange-names.enum";
import { getOrderBookDto } from "../dto/get-order-book.dto";
import { ExchangeEntityFactory } from "../entities/exchange-factory.entity";

export interface IExchangeService<T> {
  getOrderBook(getOrderBookDto: getOrderBookDto): Promise<T>;
}

@Injectable()
export abstract class AbstractExchangeService<T> implements IExchangeService<T> {
  private exchange: EXCHANGE_NAMES;
  public baseUrl: string;
  public pairFormat: string;

  constructor(exchange: EXCHANGE_NAMES) {
    this.exchange = exchange;
    this.baseUrl = EXCHANGE_CONFIG[exchange].URL;
    this.pairFormat = EXCHANGE_CONFIG[exchange].PAIR_FORMAT;
  }

  getSymbol(base_coin: string, quote_coin: string): string {
    return this.pairFormat
      .replace(/:base_coin/g, base_coin)
      .replace(/:quote_coin/g, quote_coin);
  }

  async getOrderBook(getOrderBookDto: getOrderBookDto): Promise<T> {
    try {
      const { base_coin, quote_coin, limit } = getOrderBookDto;
      const symbol = this.getSymbol(base_coin, quote_coin);

      const request = { params: { limit, symbol } };
      // add service that let us handle endpoint in each service and return his own entity
      const response = await axios.get(this.baseUrl, request); 

      const Entity = this.exchangeServiceFactory.getEntity(this.exchange);
      return new Entity(response);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
