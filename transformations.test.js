import { point } from './point.js';
import { Matrix, inverse, translation, scaling } from './matrix.js';
import { vector } from './vector.js';

test('Multiplying by a translation matrix', () => {
  let transform = translation(5, -3, 2);
  let p = point(-3, 4, 5);
  expect(transform.multiplyBy(p)).toEqual(point(2, 1, 7));
});

// if you take the reverse of a translation matrix, you get another translation matrix that moves point in reverse
test('Multiplying by the inverse of a translation matrix', () => {
  let transform = translation(5, -3, 2);
  let inv = inverse(transform);
  let p = point(-3, 4 ,5);
  expect(inv.multiplyBy(p)).toEqual(point(-8, 7, 3));
});

// multiplying a translation matrix by a vector should not change the vector.
// Remember, a vector is just an arrow. Moving it around in space does not change the direction it points
test('Translation does not affect vectors', () => {
  let transform = translation(5, -3, 2);
  let v = vector(-3, 4, 5);
  expect(transform.multiplyBy(v)).toEqual(v);
});

test('A scaling matrix applied to a point', () => {
  let transform = scaling(2, 3, 4);
  let p = point(-4, 6, 8);
  expect(transform.multiplyBy(p)).toEqual(point(-8, 18, 32));
});

test('A scaling matrix applied to a vector', () => {
  let transform = scaling(2, 3, 4);
  let v = vector(-4, 6, 8);
  expect(transform.multiplyBy(v)).toEqual(vector(-8, 18, 32));
});

test('Multiplying by the inverse of a scaling matrix', () => {
  let transform = scaling(2, 3, 4);
  let inv = inverse(transform);
  let v = vector(-4, 6, 8);
  expect(inv.multiplyBy(v)).toEqual(vector(-2, 2, 2));
});

test('Reflection is scaling by a negative value', () => {
  let transform = scaling(-1, 1, 1);
  let p = point(2, 3, 4);
  expect(transform.multiplyBy(p)).toEqual(point(-2, 3, 4));
})
