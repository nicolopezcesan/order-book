import axios from 'axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BinanceOrderBookEntity, IBinanceOrderBookEntity } from '../entities/binance-exchange.entity';
import { EXCHANGE_NAMES } from '../enums/exchange-names.enum';
import { AbstractExchangeService } from './exchange-abstract.service';

@Injectable()
export class BinanceService extends AbstractExchangeService {
  constructor() {
    super(
      EXCHANGE_NAMES.BINANCE,
      (data) => new BinanceOrderBookEntity(data)
    );
  }
}



