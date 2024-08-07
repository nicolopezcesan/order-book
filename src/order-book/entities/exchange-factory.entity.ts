import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EXCHANGE_NAMES } from '../enums/exchange-names.enum';
import { BinanceOrderBookEntity } from './binance-exchange.entity';
import { BitmartOrderBookEntity } from './bitmart-exchange.entity';

type TExchangeEntity = BinanceOrderBookEntity | BitmartOrderBookEntity;

export interface IExchangeEntityFactory {
  getEntity(exchange: EXCHANGE_NAMES): TExchangeEntity;
}

@Injectable()
export class ExchangeEntityFactory implements IExchangeEntityFactory {
  private exchangeEntities: Record<EXCHANGE_NAMES, TExchangeEntity>

  constructor(
    private binanceEntity: BinanceOrderBookEntity,
    private bitmartEntity: BitmartOrderBookEntity,
  ) {
    this.exchangeEntities = {
      [EXCHANGE_NAMES.BINANCE]: this.binanceEntity,
      [EXCHANGE_NAMES.BITMART]: this.bitmartEntity,
    };
  }

  getEntity(exchange: EXCHANGE_NAMES): TExchangeEntity {
    const entity = this.exchangeEntities[exchange];

    if (!entity) {
      throw new HttpException(`Entity not found for "${exchange}" exchange`, HttpStatus.NOT_FOUND);
    }

    return entity;
  }
}
