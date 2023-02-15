import { point } from './point.js';
import { dot } from './vector.js';

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

export function intersects(sphere, ray) {
  // the vector from the sphere center to the ray origin
  // remember: the sphere is centered at the world origin
  let sphere_to_ray = ray.origin.substract(point(0, 0, 0));

  let a = dot(ray.direction, ray.direction);
  let b = 2 * dot(ray.direction, sphere_to_ray);
  let c = dot(sphere_to_ray, sphere_to_ray) - 1;
  let discriminant = (b**2) - 4 * a * c;

  if (discriminant < 0) return [];

  let t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
  let t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

  return t1 < t2 ? [t1, t2] : [t2, t2];
}
