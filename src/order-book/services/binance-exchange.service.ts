import axios from 'axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IExchangeService, IGetOrderBookParams } from '../interfaces/order-book.interface';
import { BinanceOrderBookModel, IBinanceOrderBookResponse } from '../models/binance-exchange.model';
import { EEXCHANGE_NAMES } from '../enums/exchange-names.enum';
import { AbtractExchangeConfigService } from './abstract-exchange-config-service';

@Injectable()
export class BinanceService extends AbtractExchangeConfigService implements IExchangeService<BinanceOrderBookModel> {
  constructor() {
    super(EEXCHANGE_NAMES.BINANCE);
  }

  async getOrderBook(_params: IGetOrderBookParams): Promise<BinanceOrderBookModel> {
    try {
      const { limit, base_coin, quote_coin } = _params;
      const symbol = this.getSymbol(base_coin, quote_coin);
  
      const request = { limit, symbol };
      const response: { data: IBinanceOrderBookResponse } = await axios.get(this.baseUrl, { params: request });
      const data = new BinanceOrderBookModel(response.data)
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}

