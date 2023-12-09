import { Injectable } from "@nestjs/common";
import { EXCHANGE_CONFIG } from "../constants/exchange-config.enum";
import { EEXCHANGE_NAMES } from "../enums/exchange-names.enum";

@Injectable()
export abstract class AbtractExchangeConfigService {
  public baseUrl: string;
  public pairFormat: string;

  constructor(exchange: EEXCHANGE_NAMES) {
    this.baseUrl = EXCHANGE_CONFIG[exchange].URL;
    this.pairFormat = EXCHANGE_CONFIG[exchange].PAIR_FORMAT;
  }

  getSymbol(base_coin: string, quote_coin: string): string {
    return this.pairFormat
      .replace(/:base_coin/g, base_coin)
      .replace(/:quote_coin/g, quote_coin);
  }
}