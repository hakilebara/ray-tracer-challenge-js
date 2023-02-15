import { point } from './point.js';
import { vector } from './vector.js';
import { intersects, ray } from './ray.js';
import { sphere } from './sphere.js';

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
