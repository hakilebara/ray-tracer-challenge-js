import { Tuple, tuple } from './tuple.js';

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

  dot(v) {
    return this.x * v.x +
           this.y * v.y +
           this.z * v.z +
           this.w * v.w
  } 

  cross(v) {
    return vector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }
}

export function vector(x, y, z, w) {
  return Vector.of(x, y, z, 0.0);
}
