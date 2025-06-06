export default function formatCurrencyData(
  data: number,
  currency: string
): string {
  const formatData = data.toLocaleString(currency);
  return formatData;
}
