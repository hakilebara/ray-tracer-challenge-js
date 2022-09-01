import { Tuple } from './tuple.js';

export function point (x, y, z) {
  return Tuple.of(x, y, z, 1.0);
}
