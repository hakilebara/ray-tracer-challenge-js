import { point } from './point.js';
import { vector } from './vector.js';
import { intersects, position, ray, transform } from './ray.js';
import { translation, scaling } from './matrix.js';

test('Creating and querying a ray', () => {
  let origin = point(1, 2, 3);
  let direction = vector(4, 5, 6);
  let r = ray(origin, direction);
  expect(r.origin).toEqual(origin);
  expect(r.direction).toEqual(direction);
});

test('Computing a point from a distance', () => {
  let r = ray(point(2, 3, 4), vector(1, 0, 0));
  expect(position(r, 0)).toEqual(point(2, 3, 4));
});

test('Translating a ray', () => {
  let r = ray(point(1, 2, 3), vector(0, 1, 0));
  let m = translation(3, 4, 5);
  let r2 = transform(r, m);
  expect(r2.origin).toEqual(point(4, 6, 8));
  expect(r2.direction).toEqual(vector(0, 1, 0));
});

test('Scaling a ray', () => {
  let r = ray(point(1, 2, 3), vector(0, 1, 0));
  let m = scaling(2, 3, 4);
  let r2 = transform(r, m);
  expect(r2.origin).toEqual(point(2, 6, 12));
  expect(r2.direction).toEqual(vector(0, 3, 0));
})
