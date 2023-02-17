import { identity_matrix } from './matrix.js';

export class Sphere {
  transform = identity_matrix;
}

export function set_transform(s, t) {
  s.transform = t;
}

export function sphere() {
  return new Sphere();
}
