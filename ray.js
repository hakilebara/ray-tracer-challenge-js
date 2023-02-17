import { point } from './point.js';
import { dot } from './vector.js';
import { intersection } from './intersection.js';
import { inverse } from './matrix.js';

export class Ray {
  origin; // point
  direction; // vector

  constructor(origin, direction) {
    this.origin = origin;
    this.direction = direction;
  }
}

export function position(ray, t) {
  // to find the position, you multiply the ray's direction by t
  // to find the total distance travaled, and then add that to the
  // ray's origin.
  // ray.origin + ray.direction * t
  return ray.origin.add(ray.direction.multiplyBy(t));
}

export function intersect(sphere, ray) {
  let ray2 = transform(ray, inverse(sphere.transform));

  // the vector from the sphere center to the ray origin
  // remember: the sphere is centered at the world origin
  // remember: substracting two points gives a vector
  let sphere_to_ray = ray2.origin.substract(point(0, 0, 0));

  let a = dot(ray2.direction, ray2.direction);
  let b = 2 * dot(ray2.direction, sphere_to_ray);
  let c = dot(sphere_to_ray, sphere_to_ray) - 1;
  let discriminant = (b**2) - 4 * a * c;

  if (discriminant < 0) return [];

  let t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
  let t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

  let i1 = intersection(t1, sphere);
  let i2 = intersection(t2, sphere);

  return t1 < t2 ? [i1, i2] : [i2, i1];
}

export function transform(ray, matrix) {
  let origin = matrix.multiplyBy(ray.origin);
  let direction = matrix.multiplyBy(ray.direction);
  return new Ray(origin, direction);
}

export function ray(...params) {
  return new Ray(...params);
}
