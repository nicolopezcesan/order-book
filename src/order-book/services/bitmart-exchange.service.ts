import axios from 'axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IExchangeService, IGetOrderBookParams } from '../interfaces/order-book.interface';
import { BitmartOrderBookModel, IBitmartOrderBookResponse } from '../models/bitmart-exchange.model';
import { EEXCHANGE_NAMES } from '../enums/exchange-names.enum';
import { AbtractExchangeConfigService } from './abstract-exchange-config-service';

@Injectable()
export class BitmartService extends AbtractExchangeConfigService implements IExchangeService<BitmartOrderBookModel> {
  constructor() {
    super(EEXCHANGE_NAMES.BITMART);
  }

  async getOrderBook(_params: IGetOrderBookParams): Promise<BitmartOrderBookModel> {
    try {
      const { limit, base_coin, quote_coin } = _params;
      const symbol = this.getSymbol(base_coin, quote_coin);
  
      const request = { limit, symbol };
      const response: { data: IBitmartOrderBookResponse } = await axios.get(this.baseUrl, { params: request });
      const data = new BitmartOrderBookModel(response.data)
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

