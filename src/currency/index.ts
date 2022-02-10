import { CurrencyCode } from '@srclaunch/types';

export function getDigitsFromValue(value = '') {
  return value.replace(/(-(?!\d))|[^0-9|-]/g, '') || '';
}

export function padDigits(digits: string): number {
  const desiredLength = 3;
  const actualLength = digits.length;

  if (actualLength >= desiredLength) {
    return Number.parseFloat(digits);
  }

  const amountToAdd = desiredLength - actualLength;
  const padding = '0'.repeat(amountToAdd);

  return Number.parseFloat(padding + digits);
}

export function removeLeadingZeros(number: string | number): string {
  const strFromNum = number.toString();

  return strFromNum.replace(/^0+([0-9]+)/, '$1');
}

export function addDecimalToNumber(number: number, separator: string): string {
  const strFromNum = number.toString();

  const centsStartingPosition = strFromNum.length - 2;
  const dollars = removeLeadingZeros(
    strFromNum.substring(0, centsStartingPosition),
  );
  const cents = strFromNum.substring(centsStartingPosition);

  return dollars + separator + cents;
}

export function toCurrency(value: number, separator = '.'): string {
  const strFromNum = value.toString();

  const digits = getDigitsFromValue(strFromNum.toString());
  const digitsWithPadding = padDigits(digits);

  return addDecimalToNumber(digitsWithPadding, separator);
}

export function formatCurrency({
  amount,
  currency,
}: {
  amount: number;
  currency: CurrencyCode;
}): string {
  switch (currency) {
    case CurrencyCode.UnitedStatesDollar:
      return `$${amount
        .toFixed(amount % 1 !== 0 ? 2 : 0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    default:
      return `$${amount
        .toFixed(amount % 1 !== 0 ? 2 : 0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }
}
