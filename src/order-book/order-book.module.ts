import { Module } from '@nestjs/common';
import { OrderBookController } from './controllers/order-book/order-book.controller';
import { BinanceService } from './services/binance-exchange.service';
import { BitmartService } from './services/bitmart-exchange.service';
import { ExchangeServiceFactory } from './services/exchange-factory.service';
import { ExchangeEntityFactory } from './entities/exchange-factory.entity';

@Module({
  imports: [],
  controllers: [
    OrderBookController
  ],
  providers: [
    BinanceService,
    BitmartService,
    ExchangeServiceFactory,
    ExchangeEntityFactory,
  ],
})
export class OrderBookModule { }
