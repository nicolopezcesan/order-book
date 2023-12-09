import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { EXCHANGE_CONFIG } from '../constants/exchange-config.enum';

@Injectable()
export class ExchangeValidationPipe implements PipeTransform {
  transform(value: any) {
    const { exchange } = value;

    try {
      if (EXCHANGE_CONFIG[exchange]) {
        return value;
      }
    } catch (error) {
      throw new BadRequestException(`Exchange not found for "${exchange}"`);
    }
  }
}
