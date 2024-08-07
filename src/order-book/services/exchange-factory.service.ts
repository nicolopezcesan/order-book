import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EXCHANGE_NAMES } from '../enums/exchange-names.enum';
import { BinanceService } from './binance-exchange.service';
import { BitmartService } from './bitmart-exchange.service';

type TExchangeService = BinanceService | BitmartService;

export interface IExchangeServiceFactory {
  getService(params: string): TExchangeService;
}

@Injectable()
export class ExchangeServiceFactory implements IExchangeServiceFactory {
  private exchangeServices: Record<EXCHANGE_NAMES, TExchangeService>

  constructor(
    private binanceService: BinanceService,
    private bitmartService: BitmartService,
  ) {
    this.exchangeServices = {
      [EXCHANGE_NAMES.BINANCE]: this.binanceService,
      [EXCHANGE_NAMES.BITMART]: this.bitmartService,
    };
  }

  getService(exchange: EXCHANGE_NAMES): TExchangeService | never {
    const service = this.exchangeServices[exchange];

    if (!service) {
      throw new HttpException(`Service not found for "${exchange}" exchange`, HttpStatus.NOT_FOUND);
    }

    return service;
  }
}
