import { Tuple } from './tuple.js';

export class Color extends Tuple {
  get red() { return this[0] }
  get green() { return this[1] }
  get blue() { return this[2] }
}

export function color(r, g, b) {
  return Color.of(r, g, b);
}
