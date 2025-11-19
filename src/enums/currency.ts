export enum CodeCurrency {
  PYG = "PYG",
  BRL = "BRL",
  USD = "USD",
  ARS = "ARS",
  PIX = "PIX",
}

export const TranslateCodeCurrency = {
  [CodeCurrency.PYG]: "Guaraní",
  [CodeCurrency.BRL]: "Real",
  [CodeCurrency.USD]: "Dólar",
  [CodeCurrency.ARS]: "Peso Argentino",
  [CodeCurrency.PIX]: "PIX",
};

export const CurrencyImages = {
  [CodeCurrency.PYG]: "/png/circle-py.png",
  [CodeCurrency.BRL]: "/png/circle-br.png",
  [CodeCurrency.USD]: "/png/circle-country.png",
  [CodeCurrency.ARS]: "/png/circle-ar.png",
  [CodeCurrency.PIX]: "/png/circle-pix.png",
};

export const localeStringData: ILocaleData = {
  PYG: {
    locales: "es-PY",
    options: {
      style: "currency",
      currency: "PYG",
      maximumFractionDigits: 2,
    },
  },
  BRL: {
    locales: "en-BR",
    options: {
      style: "currency",
      currency: "BRL",
      currencyDisplay: "symbol",
      maximumFractionDigits: 2,
    },
  },
  ARS: {
    locales: "es-ar",
    options: {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 2,
      currencyDisplay: "code",
    },
  },
  USD: {
    locales: "en-US",
    options: {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    },
  },
  PIX: {
    locales: "en-BR",
    options: {
      style: "currency",
      currency: "BRL",
      currencyDisplay: "symbol",
      maximumFractionDigits: 2,
    },
  },
};
