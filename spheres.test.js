import { point } from './point.js';
import { normalize, vector } from './vector.js';
import { intersect, ray } from './ray.js';
import { normal_at, set_transform, sphere } from './sphere.js';
import { identity_matrix, scaling, translation } from './matrix.js';

test('A ray intersects a sphere at two points', () => {
  let r = ray(point(0, 0, -5), vector(0, 0, 1));
  let s = sphere();
  let xs = intersect(s, r);
  expect(xs.length).toBe(2);
  expect(xs[0].t).toBe(4.0);
  expect(xs[1].t).toBe(6.0);
});

test('A ray misses a sphere', () => {
  let r = ray(point(0, 2, -5), vector(0, 0, 1));
  let s = sphere();
  let xs = intersect(s, r);
  expect(xs.length).toBe(0);
});

test('A ray originates inside a sphere', () => {
  let r = ray(point(0, 0, 0), vector(0, 0, 1));
  let s = sphere();
  let xs = intersect(s, r);
  expect(xs.length).toBe(2);
  expect(xs[0].t).toBe(-1.0);
  expect(xs[1].t).toBe(1.0);
});

test('A sphere is behind a ray', () => {
  let r = ray(point(0, 0, 5), vector(0, 0, 1));
  let s = sphere();
  let xs = intersect(s, r);
  expect(xs.length).toBe(2);
  expect(xs[0].t).toBe(-6.0);
  expect(xs[1].t).toBe(-4.0);
});

test('Intersect sets the object on the intersection', () => {
  let r = ray(point(0, 0, -5), vector(0, 0, 1));
  let s = sphere();
  let xs = intersect(s, r);
  expect(xs.length).toBe(2);
  expect(xs[0].obj).toEqual(s);
  expect(xs[1].obj).toEqual(s);
});

test('A sphere\'s default transformation', () => {
  let s = sphere();
  expect(s.transform).toEqual(identity_matrix);
});

test('Changing a sphere\'s transformation', () => {
  let s = sphere();
  let t = translation(2, 3, 4);
  set_transform(s, t);
  expect(s.transform).toEqual(t);
});

test('Intersecting a scaled sphere with a ray', () => {
  let r = ray(point(0, 0, -5), vector(0, 0, 1));
  let s = sphere();
  set_transform(s, scaling(2, 2, 2));
  let xs = intersect(s, r);
  expect(xs.length).toBe(2);
  expect(xs[0].t).toBe(3);
  expect(xs[1].t).toBe(7);
});

test('The normal on a sphere at a point on the x axis', () => {
  let s = sphere();
  let n = normal_at(s, point(1, 0, 0));
  expect(n).toEqual(vector(1, 0, 0));
});

test('The normal on a sphere at a point on the y axis', () => {
  let s = sphere();
  let n = normal_at(s, point(0, 1, 0));
  expect(n).toEqual(vector(0, 1, 0));
});

test('The normal on a sphare at a point on the z axis', () => {
  let s = sphere();
  let n = normal_at(s, point(0, 0, 1));
  expect(n).toEqual(vector(0, 0, 1));
});

test('The normal on a sphere at a nonaxial point', () => {
  let s = sphere();
  let n = normal_at(s, point(Math.sqrt(3)/3, Math.sqrt(3)/3, Math.sqrt(3)/3));
  expect(n).toEqual(vector(Math.sqrt(3)/3, Math.sqrt(3)/3, Math.sqrt(3)/3));
});

test('The normal is a normalized vector', () => {
  let s = sphere();
  let n = normal_at(s, point(Math.sqrt(3)/3, Math.sqrt(3)/3, Math.sqrt(3)/3));
  expect(n).toEqual(normalize(n));
})
