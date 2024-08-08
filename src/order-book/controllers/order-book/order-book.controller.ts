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
      const exchangeService = this.exchangeServiceFactory.getService(orderBookDto.exchange);
      const response = await exchangeService.getOrderBook(orderBookDto);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
