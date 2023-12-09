import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderBookModule } from './order-book/order-book.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrderBookModule,
  ],
})
export class AppModule { }
