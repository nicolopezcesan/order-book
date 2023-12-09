import { Module } from '@nestjs/common';
import { OrderBookController } from './controllers/order-book/order-book.controller';
import { BinanceService } from './services/binance-exchange.service';
import { BitmartService } from './services/bitmart-exchange.service';
import { ExchangeServiceFactory } from './services/exchange-service-factory';

@Module({
  imports: [],
  controllers: [OrderBookController],
  providers: [
    BinanceService,
    BitmartService,
    ExchangeServiceFactory,
  ],
})
export class OrderBookModule { }
