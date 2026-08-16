/** Static BDT → foreign currency rates (base prices remain in BDT). */
export const EXCHANGE_RATES = {
  BDT: 1,
  USD: 0.0091,
  GBP: 0.0072,
  EUR: 0.0084,
  JPY: 1.35,
};

export const CURRENCY_CONFIG = {
  BDT: { symbol: '৳', decimals: 0, code: 'BDT' },
  USD: { symbol: '$', decimals: 2, code: 'USD' },
  GBP: { symbol: '£', decimals: 2, code: 'GBP' },
  EUR: { symbol: '€', decimals: 2, code: 'EUR' },
  JPY: { symbol: '¥', decimals: 0, code: 'JPY' },
};

export function convertFromBDT(amountBDT, currencyCode) {
  const rate = EXCHANGE_RATES[currencyCode] ?? 1;
  const decimals = CURRENCY_CONFIG[currencyCode]?.decimals ?? 0;
  const converted = amountBDT * rate;
  const factor = 10 ** decimals;
  return Math.round(converted * factor) / factor;
}

export function formatAmountFromBDT(amountBDT, currencyCode = 'BDT') {
  return formatCurrency(convertFromBDT(amountBDT, currencyCode), currencyCode);
}

export function formatCurrency(amount, currencyCode = 'BDT') {
  const config = CURRENCY_CONFIG[currencyCode] ?? CURRENCY_CONFIG.BDT;
  const formatted = Number(amount).toLocaleString(undefined, {
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  });
  return `${config.symbol} ${formatted}`;
}

export function computeOrderTotals(subtotalBDT, currencyCode = 'BDT') {
  const taxBDT = Math.floor(subtotalBDT * 0.1);
  const totalBDT = subtotalBDT + taxBDT;
  return {
    subtotalBDT,
    taxBDT,
    totalBDT,
    subtotal: convertFromBDT(subtotalBDT, currencyCode),
    tax: convertFromBDT(taxBDT, currencyCode),
    total: convertFromBDT(totalBDT, currencyCode),
    currency: currencyCode,
    currencySymbol: CURRENCY_CONFIG[currencyCode]?.symbol ?? '৳',
    exchangeRate: EXCHANGE_RATES[currencyCode] ?? 1,
  };
}

export function formatOrderMoney(amount, order) {
  const code = order?.currency ?? 'BDT';
  return formatCurrency(amount, code);
}
