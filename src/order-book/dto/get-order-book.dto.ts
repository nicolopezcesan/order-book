import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { EXCHANGE_NAMES } from "src/order-book/enums/exchange-names.enum";

export class getOrderBookDto {
  @IsNotEmpty()
  @IsString()
  exchange: EXCHANGE_NAMES;

  @IsNotEmpty()
  @IsString()
  base_coin: string;

  @IsNotEmpty()
  @IsString()
  quote_coin: string;

  @IsOptional()
  @IsNumberString()
  limit: string = '20';
}