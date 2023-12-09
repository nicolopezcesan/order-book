import { EEXCHANGE_NAMES } from "../enums/exchange-names.enum";

interface IExchangeConfig {
  URL: string;
  PAIR_FORMAT: string;
};

export const EXCHANGE_CONFIG: Record<EEXCHANGE_NAMES, IExchangeConfig> = Object.freeze({
  [EEXCHANGE_NAMES.BINANCE]: {
    URL: 'https://api.binance.com/api/v3/depth',
    PAIR_FORMAT: ':base_coin:quote_coin'
  },
  [EEXCHANGE_NAMES.BITMART]: {
    URL: 'https://api-cloud.bitmart.com/spot/quotation/v3/books',
    PAIR_FORMAT: ':base_coin_:quote_coin'
  },
});
