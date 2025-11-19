interface ILocaleData {
  [key: string]: {
    locales: Intl.LocalesArgument;
    options: ILocaleOptions;
  };
}

interface ILocaleOptions {
    style: keyof Intl.NumberFormatOptionsStyleRegistry | undefined;
    currency: string | undefined;
    currencyDisplay?:
      | keyof Intl.NumberFormatOptionsCurrencyDisplayRegistry
      | undefined;
    maximumFractionDigits: number | undefined;
  }
  