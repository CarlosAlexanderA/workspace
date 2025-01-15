export function calculatePercentage(
  numbers: number[],
  total: number
): number[] {
  const percentageArray: number[] = [];

  numbers.forEach((number) => {
    const percetage = Math.round((number / total) * 100);
    percentageArray.push(percetage);
  });
  return percentageArray;
}
