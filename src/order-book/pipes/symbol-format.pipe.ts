import { BadRequestException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { EXCHANGE_CONFIG } from '../constants/exchange-config.enum';

@Injectable()
export class SymbolFormatPipe implements PipeTransform {
  transform(value: any) {
    const { exchange, base_coin, quote_coin } = value;

    try {
      const { PAIR_FORMAT } = EXCHANGE_CONFIG[exchange];

      return PAIR_FORMAT
        .replace(/:base_coin/g, base_coin)
        .replace(/:quote_coin/g, quote_coin);

    } catch (error) {
      throw new BadRequestException(`An error occurred while trying to format the pair`);
    }
  }
}
