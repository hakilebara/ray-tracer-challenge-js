import { identity_matrix } from './matrix.js';
import { normalize } from './vector.js';
import { point } from './point.js';

export class Sphere {
  transform = identity_matrix;
}

export function set_transform(s, t) {
  s.transform = t;
}

export function sphere() {
  return new Sphere();
}

export function normal_at(s, p) {
  return normalize(p.substract(point(0, 0, 0)));
}
