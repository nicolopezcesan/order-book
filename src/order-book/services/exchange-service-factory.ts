import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EEXCHANGE_NAMES } from '../enums/exchange-names.enum';
import { BinanceService } from './binance-exchange.service';
import { BitmartService } from './bitmart-exchange.service';
import { IExchangeServiceFactory } from '../interfaces/order-book.interface';

@Injectable()
export class ExchangeServiceFactory implements IExchangeServiceFactory {
  constructor(
    private binanceService: BinanceService,
    private bitmartService: BitmartService,
  ) { }

  getService(exchange: string) {
    switch (exchange) {
      case EEXCHANGE_NAMES.BINANCE:
        return this.binanceService;

      case EEXCHANGE_NAMES.BITMART:
        return this.bitmartService;

      default:
        throw new HttpException(`Service not found for "${exchange}" exchange`, HttpStatus.NOT_FOUND);
    }
  }
}
