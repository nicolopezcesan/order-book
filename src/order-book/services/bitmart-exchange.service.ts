import axios from 'axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BitmartOrderBookEntity, IBitmartOrderBookEntity } from '../entities/bitmart-exchange.entity';
import { EXCHANGE_NAMES } from '../enums/exchange-names.enum';
import { AbstractExchangeService } from './exchange-abstract.service';

@Injectable()
export class BitmartService extends AbstractExchangeService {
  constructor() {
    super(
      EXCHANGE_NAMES.BITMART,
      (data) => new BitmartOrderBookEntity(data)
    );
  }
}
