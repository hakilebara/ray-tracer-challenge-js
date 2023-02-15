import { intersection } from './intersection.js';
import { sphere } from './sphere.js';

test('An intersection encapsulates t and object', () => {
  let s = sphere();
  let i = intersection(3.5, s);
  expect(i.t).toBe(3.5);
  expect(i.obj).toEqual(s);
});
