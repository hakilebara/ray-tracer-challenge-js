export class Ray {
  origin; // point
  direction; // vector

  constructor(origin, direction) {
    this.origin = origin;
    this.direction = direction;
  }
}

export function ray(...params) {
  return new Ray(...params);
}

export function position(ray, t) {
  // to find the position, you multiply the ray's direction by t
  // to find the total distance travaled, and then add that to the
  // ray's origin.
  // ray.origin + ray.direction * t
  return ray.origin.add(ray.direction.multiplyBy(t));
}
