import { point } from './point.js';
import { vector } from './vector.js';
import { intersects, position, ray, sphere } from './ray.js';

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

test('A ray intersects a sphere at two points', () => {
  let r = ray(point(0, 0, -5), vector(0, 0, 1));
  let s = sphere();
  let xs = intersects(s, r);
  expect(xs.length).toBe(2);
  expect(xs[0]).toBe(4.0);
  expect(xs[1]).toBe(6.0);
});

test('A ray misses a sphere', () => {
  let r = ray(point(0, 2, -5), vector(0, 0, 1));
  let s = sphere();
  let xs = intersects(s, r);
  expect(xs.length).toBe(0);
});

test('A ray originates inside a sphere', () => {
  let r = ray(point(0, 0, 0), vector(0, 0, 1));
  let s = sphere();
  let xs = intersects(s, r);
  expect(xs.length).toBe(2);
  expect(xs[0]).toBe(-1.0);
  expect(xs[1]).toBe(1.0);
});

test('A sphere is behind a ray', () => {
  let r = ray(point(0, 0, 5), vector(0, 0, 1));
  let s = sphere();
  let xs = intersects(s, r);
  expect(xs.length).toBe(2);
  expect(xs[0]).toBe(-6.0);
  expect(xs[1]).toBe(-4.0);
});
