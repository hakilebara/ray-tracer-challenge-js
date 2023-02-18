import { Tuple, tuple } from './tuple.js';

export function normalize(v) {
  let magnitude = v.magnitude();
  return tuple(
    v.x / magnitude,
    v.y / magnitude,
    v.z / magnitude,
    v.w / magnitude
  );
}

export class Vector extends Tuple {
  normalize() {
    let magnitude = this.magnitude();
    return tuple(
      this.x / magnitude,
      this.y / magnitude,
      this.z / magnitude,
      this.w / magnitude
    );
  }

  cross(v) {
    return vector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }
}

export function dot(v1, v2) {
  return v1.x * v2.x +
         v1.y * v2.y +
         v1.z * v2.z +
         v1.w * v2.w;
}

export function vector(x, y, z, w) {
  return Vector.of(x, y, z, 0.0);
}
