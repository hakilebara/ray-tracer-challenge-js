import { tuple } from './tuple.js';
import { point } from './point.js';
import { vector } from './vector.js';
import { color } from './color.js';

test('A tuple with w=1.0 is a point', () => {
  let a = tuple(4.3, -4.2, 3.1, 1.0);
  expect(a.x).toBe(4.3);
  expect(a.y).toBe(-4.2);
  expect(a.z).toBe(3.1);
  expect(a.w).toBe(1.0);
  expect(a.isPoint()).toBe(true);
  expect(a.isVector()).toBe(false);
});

test('A tuple with w=0 is a vector', () => {
  let a = tuple(4.3, -4.2, 3.1, 0.0);
  expect(a.x).toBe(4.3);
  expect(a.y).toBe(-4.2);
  expect(a.z).toBe(3.1);
  expect(a.w).toBe(0.0);
  expect(a.isPoint()).toBe(false);
  expect(a.isVector()).toBe(true);
});

test('point() creates tupes with w=1', () => {
  let a = tuple(4, -4, 3, 1);
  let p = point(4, -4, 3);
  expect(p).toEqual(a);
});

test('vector() creates tuples with w=0', () => {
  let a = tuple(4, -4, 3, 0)
  let v = vector(4, -4, 3);
  expect(v).toEqual(a);
});

test('Adding two tuples', () => {
  let a1 = tuple(3, -2, 5, 1);
  let a2 = tuple(-2, 3, 1, 0);
  expect(a1.add(a2)).toEqual(tuple(1, 1, 6, 1));
});

test('Substracting two points', () => {
  let p1 = point(3, 2, 1);
  let p2 = point(5, 6, 7);
  expect(p1.substract(p2)).toEqual(vector(-2, -4, -6));
});

test('Substracting a vector from a point', () => {
  let p = point(3, 2, 1);
  let v = vector(5, 6, 7);
  expect(p.substract(v)).toEqual(point(-2, -4, -6));
});

test('Substracting two vectors', () => {
  let v1 = vector(3, 2, 1);
  let v2 = vector(5, 6, 7);
  expect(v1.substract(v2)).toEqual(vector(-2, -4, -6));
});

test('Substracting a vector from the zero vector', () => {
  let zero = vector(0, 0, 0);
  let v = vector(1, -2, 3);
  expect(zero.substract(v)).toEqual(vector(-1, 2, -3));
});

test('Negating a tuple', () => {
  let a = tuple(1, -2, 3, -4);
  expect(a.negate()).toEqual(tuple(-1, 2, -3, 4));
});

test('Multiplying a tuple by a scalar', () => {
  let a = tuple(1, -2, 3, -4);
  expect(a.multiplyBy(3.5)).toEqual(tuple(3.5, -7, 10.5, -14));
});

test('Multiplying a tuple by a fraction', () => {
  let a = tuple(1, -2, 3, -4);
  expect(a.multiplyBy(0.5)).toEqual(tuple(0.5, -1, 1.5, -2));
});

test('Dividing a tuple by a scalar', () => {
  let a = tuple(1, -2, 3, -4);
  expect(a.divideBy(2)).toEqual(tuple(0.5, -1, 1.5, -2));
});

test('Computing the magnitude of vector(1, 0, 0)', () => {
  let v = vector(1, 0, 0);
  expect(v.magnitude()).toBe(1);
});

test('Computing the magnitude of vector(0, 1, 0)', () => {
  let v = vector(0, 1, 0);
  expect(v.magnitude()).toBe(1);
});

test('Computing the magnitude of vector(0, 0, 1)', () => {
  let v = vector(0, 0, 1);
  expect(v.magnitude()).toBe(1);
});

test('Computing the magnitude of vector(1, 2, 3)', () => {
  let v = vector(1, 2, 3);
  expect(v.magnitude()).toBe(Math.sqrt(14));
});

test('Computing the magnitude of vector(-1, -2, -3)', () => {
  let v = vector(-1, -2, -3);
  expect(v.magnitude()).toBe(Math.sqrt(14));
});

test('Normalizing vector(4, 0, 0) gives (1, 0, 0)', () => {
  let v = vector(4, 0, 0);
  expect(v.normalize()).toEqual(vector(1, 0, 0));
});

test('Normalizing vector(1, 2, 3)', () => {
  let v = vector(1, 2, 3);
  expect(v.normalize().equal(vector(0.26726, 0.53452, 0.80178))).toBe(true);
});

test('The magnitude of a normalized vector', () => {
  let v = vector(1, 2, 3);
  let norm = v.normalize();
  expect(norm.magnitude()).toBe(1);
});

test('The dot product of two tuples', () => {
  let a = vector(1, 2, 3);
  let b = vector(2, 3, 4);
  expect(a.dot(b)).toBe(20);
});

test('The cross product of two vectors', () => {
  let a = vector(1, 2, 3);
  let b = vector(2, 3, 4);
  expect(a.cross(b)).toEqual(vector(-1, 2, -1));
  expect(b.cross(a)).toEqual(vector(1, -2, 1));
});

test('Colors are (red, green, blue) tuples', () => {
  let c = color(-0.5, 0.4, 1.7);
  expect(c.red).toBe(-0.5);
  expect(c.green).toBe(0.4);
  expect(c.blue).toBe(1.7);
});

test('Adding colors', () => {
  let c1 = color(0.9, 0.6, 0.75);
  let c2 = color(0.7, 0.1, 0.25);
  expect(c1.add(c2)).toEqual(color(1.6, 0.7, 1.0));
});

test('Substracting colors', () => {
  let c1 = color(0.9, 0.6, 0.75);
  let c2 = color(0.5, 0.1, 0.25);
  expect(c1.substract(c2)).toEqual(color(0.4, 0.5, 0.5));
});

test('Multiplying a color by a scalar', () => {
  let c = color(0.2, 0.3, 0.4);
  expect(c.multiplyBy(2)).toEqual(color(0.4, 0.6, 0.8));
});

test('Multiplying colors', () => {
  let c1 = color(1, 0.2, 0.3);
  let c2 = color(0.9, 1, 0.1);
  expect(c1.multiplyBy(c2)).toEqual(color(0.9, 0.2, 0.03));
});
