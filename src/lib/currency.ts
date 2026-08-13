export const supportedCurrencies = [
  "EUR",
  "USD",
  "GBP",
  "CHF",
  "JPY",
  "CNY",
  "CAD",
  "AUD",
  "BRL",
] as const;

export type SupportedCurrency = (typeof supportedCurrencies)[number];

// Indicative rates relative to 1 EUR — for on-page display conversion only,
// not for real transactions. Refresh periodically or replace with a live FX API.
const ratesFromEur: Record<SupportedCurrency, number> = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.84,
  CHF: 0.95,
  JPY: 163,
  CNY: 7.8,
  CAD: 1.47,
  AUD: 1.63,
  BRL: 5.9,
};

export function convertToCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: SupportedCurrency
): number | null {
  const from = ratesFromEur[fromCurrency as SupportedCurrency];
  const to = ratesFromEur[toCurrency];
  if (!from || !to) return null;
  const inEur = amount / from;
  return inEur * to;
}

export function isSupportedCurrency(value: string): value is SupportedCurrency {
  return (supportedCurrencies as readonly string[]).includes(value);
}
