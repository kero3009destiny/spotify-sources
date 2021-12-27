export const SYMBOL_POSITIONS = {
  START: 'start',
  END: 'end',
  HIDE: 'hide',
};

/**
 * builds an object to be used by format-number for formatting based on the
 * backend's countryCurrency model
 **/
export function transformCountryCurrencyToFormatNumberOptions({
  code,
  decimals = 2,
  decimalSeparator = '.',
  symbol = '$',
  symbolPosition = 'start',
  space = false,
  thousandsSeparator = ',',
  useCodeAsSymbol = false,
}) {
  const formatNumberOptions = {
    integerSeparator: thousandsSeparator,
    decimal: decimalSeparator,
  };

  if (typeof decimals === 'number') {
    formatNumberOptions.round = decimals;
    formatNumberOptions.padRight = decimals;
  }

  const renderedSymbol = useCodeAsSymbol ? code : symbol;

  switch (symbolPosition) {
    case SYMBOL_POSITIONS.START: {
      formatNumberOptions.prefix = space
        ? `${renderedSymbol} `
        : renderedSymbol;
      break;
    }
    case SYMBOL_POSITIONS.END: {
      formatNumberOptions.suffix = space
        ? ` ${renderedSymbol}`
        : renderedSymbol;
      break;
    }
    case SYMBOL_POSITIONS.NONE:
    default:
      break;
  }

  return formatNumberOptions;
}
