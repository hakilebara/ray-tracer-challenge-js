import { isEqual } from './utils.js';

test('Comparing floating point numbers', () => {
  let x = 160/532;
  let y = 0.30075; 
  expect(x).not.toEqual(y);
  expect(isEqual(x, y)).toBe(true);
});
