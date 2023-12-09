import { Controller, Get, HttpException, HttpStatus, Query, Res, ValidationPipe } from '@nestjs/common';
import { getOrderBookDto } from 'src/order-book/dto/get-order-book.dto';
import { ExchangeServiceFactory } from 'src/order-book/services/exchange-service-factory';

@Controller('order-book')
export class OrderBookController {
  constructor(
    private exchangeServiceFactory: ExchangeServiceFactory,
  ) { }

  @Get('/')
  async getOrderBook(@Query() query: getOrderBookDto) {
    try {
      const { limit, exchange, base_coin, quote_coin } = query;
      const exchangeService = this.exchangeServiceFactory.getService(exchange);
      const response = await exchangeService.getOrderBook({ limit, base_coin, quote_coin });
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
