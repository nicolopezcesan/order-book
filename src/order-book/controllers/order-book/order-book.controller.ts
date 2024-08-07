import { Controller, Get, HttpException, HttpStatus, Query, Res, ValidationPipe } from '@nestjs/common';
import { getOrderBookDto } from 'src/order-book/dto/get-order-book.dto';
import { ExchangeServiceFactory } from 'src/order-book/services/exchange-factory.service';

@Controller('order-book')
export class OrderBookController {
  constructor(
    private exchangeServiceFactory: ExchangeServiceFactory,
  ) { }

  @Get('/')
  async getOrderBook(@Query() orderBookDto: getOrderBookDto) {
    try {
      const { exchange } = orderBookDto;
      const exchangeService = this.exchangeServiceFactory.getService(exchange);
      return await exchangeService.getOrderBook(orderBookDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
