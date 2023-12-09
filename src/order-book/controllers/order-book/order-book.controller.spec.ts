import { Test, TestingModule } from '@nestjs/testing';
import { OrderBookController } from './order-book.controller';
// import { ExchangeServiceFactory } from 'src/order-book/services/factory-exchange.service';
import { EEXCHANGE_NAMES } from 'src/order-book/enums/exchange-names.enum';
import { BinanceService } from 'src/order-book/services/binance-exchange.service';
import { BitmartService } from 'src/order-book/services/bitmart-exchange.service';
import { BinanceOrderBookModel } from 'src/order-book/models/binance-exchange.model';
import { getOrderBookDto } from 'src/order-book/dto/get-order-book.dto';
import { ExchangeServiceFactory } from 'src/order-book/services/exchange-service-factory';
import { HttpException } from '@nestjs/common';
import { BitmartOrderBookModel } from 'src/order-book/models/bitmart-exchange.model';

describe('OrderBookController', () => {
  let orderBookController: OrderBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderBookController],
      providers: [
        BinanceService,
        BitmartService,
        ExchangeServiceFactory,
      ],
    }).compile();

    orderBookController = module.get<OrderBookController>(OrderBookController);
  });

  describe('getOrderBook', () => {
    it('should return order book data model of type BinanceOrderBookModel', async () => {
      const mockRequest: getOrderBookDto = {
        limit: '2',
        exchange: EEXCHANGE_NAMES.BINANCE,
        base_coin: 'BTC',
        quote_coin: 'USDT'
      };

      jest.spyOn(orderBookController, 'getOrderBook');

      const response = await orderBookController.getOrderBook(mockRequest);

      expect(response instanceof BinanceOrderBookModel).toBe(true);

      expect(response).toHaveProperty('timestamp');
      expect(response).toHaveProperty('bids');
      expect(response).toHaveProperty('asks');

      expect(response.bids).toBeInstanceOf(Array);
      expect(response.asks).toBeInstanceOf(Array);

      response.bids.forEach(bid => {
        expect(bid).toHaveLength(2);
      });

      response.asks.forEach(ask => {
        expect(ask).toHaveLength(2);
      });
    });

    it('should return an error HttpException when input exchange does not exists', async () => {
      const mockRequest = {
        limit: '2',
        exchange: 'UNKNOWN',
        base_coin: 'ETH',
        quote_coin: 'USDT'
      };

      jest.spyOn(orderBookController, 'getOrderBook');

      await expect(orderBookController.getOrderBook(mockRequest as getOrderBookDto)).rejects.toThrow(HttpException);
    });

  });
});
