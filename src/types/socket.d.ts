interface ExchangeItem {
  name: string;
  symbol: string;
  abreviation: import("@/enums/currency").CodeCurrency;
  last_value: number;
}
