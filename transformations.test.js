import { point } from './point.js';
import { inverse, translation, scaling, rotation_x, rotation_y, rotation_z, shearing } from './matrix.js';
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
});

test('Rotating a point around the x axis', () => {
  let p = point(0, 1, 0);
  let half_quarter = rotation_x(Math.PI / 4);
  let full_quarter = rotation_x(Math.PI / 2);
  expect(
    half_quarter
    .multiplyBy(p)
    .equal(
      point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2)
    )
  ).toBe(true);

  expect(
    full_quarter
    .multiplyBy(p)
    .equal(point(0, 0, 1))
  ).toBe(true);
});

test('The inverse of an x-rotation rotates in the opposite direction', () => {
  let p = point(0, 1, 0);
  let half_quarter = rotation_x(Math.PI / 4);
  let inv = inverse(half_quarter);
  expect(
    inv
    .multiplyBy(p)
    .equal(
      point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2)
    )
  ).toBe(true);
});

test('Rotating a point around the y axis', () => {
  let p = point(0, 0, 1);
  let half_quarter = rotation_y(Math.PI / 4);
  let full_quarter = rotation_y(Math.PI / 2);
  expect(
    half_quarter
    .multiplyBy(p)
    .equal(
      point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2)
    )
  ).toBe(true);

  expect(
    full_quarter
    .multiplyBy(p)
    .equal(point(1, 0, 0))
  ).toBe(true);
});

test('Rotating a point around the z axis', () => {
  let p = point(0, 1, 0);
  let half_quarter = rotation_z(Math.PI / 4);
  let full_quarter = rotation_z(Math.PI / 2);
  expect(
    half_quarter
    .multiplyBy(p)
    .equal(
      point(-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0)
    )
  ).toBe(true);

  expect(
    full_quarter
    .multiplyBy(p)
    .equal(point(-1, 0, 0))
  ).toBe(true);
});

test('A shearing transformation moves x in proportion to y', () => {
  let transform = shearing(1, 0, 0, 0, 0, 0);
  let p = point(2, 3, 4);
  expect(
    transform
    .multiplyBy(p)
    .equal(point(5, 3, 4))
  ).toBe(true);
});

test('A shearing transformation moves x in proportion to z', () => {
  let transform = shearing(0, 1, 0, 0, 0, 0);
  let p = point(2, 3, 4);
  expect(
    transform
    .multiplyBy(p)
    .equal(point(6, 3, 4))
  ).toBe(true);
});

test('A shearing transformation moves y in proportion to x', () => {
  let transform = shearing(0, 0, 1, 0, 0, 0);
  let p = point(2, 3, 4);
  expect(
    transform
    .multiplyBy(p)
    .equal(point(2, 5, 4))
  ).toBe(true);
});

test('A shearing transformation moves y in proportion to z', () => {
  let transform = shearing(0, 0, 0, 1, 0, 0);
  let p = point(2, 3, 4);
  expect(
    transform
    .multiplyBy(p)
    .equal(point(2, 7, 4))
  ).toBe(true);
});

test('A shearing transformation moves z in proportion to x', () => {
  let transform = shearing(0, 0, 0, 0, 1, 0);
  let p = point(2, 3, 4);
  expect(
    transform
    .multiplyBy(p)
    .equal(point(2, 3, 6))
  ).toBe(true);
});

test('A shearing transformation moves z in proportion to y', () => {
  let transform = shearing(0, 0, 0, 0, 0, 1);
  let p = point(2, 3, 4);
  expect(
    transform
    .multiplyBy(p)
    .equal(point(2, 3, 7))
  ).toBe(true);
});

test('Individual transformations are applied in sequence', () => {
  let p = point(1, 0, 1);
  let A = rotation_x(Math.PI / 2);
  let B = scaling(5, 5, 5);
  let C = translation(10, 5, 7);

  //apply rotation first
  let p2 = A.multiplyBy(p);
  expect(
    p2.equal(point(1, -1, 0))
  ).toBe(true);
  // then apply scaling
  let p3 = B.multiplyBy(p2);
  expect(
    p3.equal(point(5, -5, 0))
  ).toBe(true);
  // then apply translation
  let p4 = C.multiplyBy(p3);
  expect(
    p4.equal(point(15, 0, 7))
  ).toBe(true);
});

test('Chained transformations must be applied in reverse order', () => {
  let p = point(1, 0, 1);
  let A = rotation_x(Math.PI / 2);
  let B = scaling(5, 5, 5);
  let C = translation(10, 5, 7);
  let T = C.multiplyBy(B).multiplyBy(A);
  expect(
    T.multiplyBy(p).equal(point(15, 0, 7))
  ).toBe(true);
})
