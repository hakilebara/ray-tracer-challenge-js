import { point } from './point.js';
import { vector } from './vector.js';
import { intersects, position, ray } from './ray.js';

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
