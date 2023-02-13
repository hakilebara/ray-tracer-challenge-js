const EPSILON = 0.00001;

export function isEqual(a, b) {
  return (Math.abs(a - b) < EPSILON) ? true : false;
}
