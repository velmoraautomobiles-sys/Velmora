export const USD_TO_GBP_RATE = 0.79;

export function formatUSD(amount: number): string {
  return `$${Math.round(amount).toLocaleString('en-US')}`;
}

export function formatGBP(amountUSD: number): string {
  const gbpAmount = Math.round(amountUSD * USD_TO_GBP_RATE);
  return `£${gbpAmount.toLocaleString('en-GB')}`;
}

export function formatPriceDual(amountUSD: number, mode: 'DUAL' | 'USD' | 'GBP' = 'DUAL'): {
  usd: string;
  gbp: string;
  combined: string;
} {
  const usd = formatUSD(amountUSD);
  const gbp = formatGBP(amountUSD);
  
  let combined = `${usd} / ${gbp}`;
  if (mode === 'USD') combined = usd;
  if (mode === 'GBP') combined = gbp;

  return { usd, gbp, combined };
}

export function formatRateDual(amountUSD: number, unit: 'day' | 'mo' | 'wk', mode: 'DUAL' | 'USD' | 'GBP' = 'DUAL'): {
  usd: string;
  gbp: string;
  combined: string;
} {
  const usd = `${formatUSD(amountUSD)}/${unit}`;
  const gbp = `${formatGBP(amountUSD)}/${unit}`;

  let combined = `${usd} • ${gbp}`;
  if (mode === 'USD') combined = usd;
  if (mode === 'GBP') combined = gbp;

  return { usd, gbp, combined };
}
