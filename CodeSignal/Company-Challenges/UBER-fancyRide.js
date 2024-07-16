function solution(l, fares) {
  let result = '';
  const UBER_CARS = ['UberX', 'UberXL', 'UberPlus', 'UberBlack', 'UberSUV'];
  fares.forEach((item, index) => {
    const total = item * l;
    if (item <= 20 && total <= 20) {
      result = UBER_CARS[index];
    }
  });
  return result;
}
const l = 30;
const fares = [0.3, 0.5, 0.7, 1, 1.3];
solution(l, fares);
