import { hit, intersection, intersections } from './intersection.js';
import { sphere } from './sphere.js';

test('An intersection encapsulates t and object', () => {
  let s = sphere();
  let i = intersection(3.5, s);
  expect(i.t).toBe(3.5);
  expect(i.obj).toEqual(s);
});

test('Aggregating intersections', () => {
  let s = sphere();
  let i1 = intersection(1, s);
  let i2 = intersection(2, s);
  let xs = intersections(i1, i2);
  expect(xs.length).toBe(2);
  expect(xs[0].obj).toEqual(s);
  expect(xs[1].obj).toEqual(s);
});

test('The hit, when all intersections have positive t', () => {
  let s = sphere();
  let i1 = intersection(1, s);
  let i2 = intersection(2, s);
  let xs = intersections(i2, i1);
  let i = hit(xs);
  expect(i).toEqual(i1);
});

test('The hit, whne some interactions have negative t', () => {
  let s = sphere();
  let i1 = intersection(-1, s);
  let i2 = intersection(1, s);
  let xs = intersections(i2, i1);
  let i = hit(xs);
  expect(i).toEqual(i2);
});

test('The hit, when all intersections have negative t', () => {
  let s = sphere();
  let i1 = intersection(-2, s);
  let i2 = intersection(-1, s);
  let xs = intersections(i2, i1);
  let i = hit(xs);
  expect(i).toBeUndefined;
});

test('The hit is always the lowest nonnegative intersection', () => {
  let s = sphere();
  let i1 = intersection(5, s);
  let i2 = intersection(7, s);
  let i3 = intersection(-3, s);
  let i4 = intersection(2, s);
  let xs = intersections(i1, i2, i3, i4);
  let i = hit(xs);
  expect(i).toEqual(i4);
});
