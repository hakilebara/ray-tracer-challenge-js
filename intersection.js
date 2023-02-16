export class Intersection {
  t; // value of the intersection
  obj; // object that was intersected

  constructor(t, obj) {
    this.t = t;
    this.obj = obj;
  }
}

export function intersections(...params) {
  return params.sort((a, b) => a.t - b.t);
}

export function hit(intersections) {
  return intersections.find(i => i.t > 0);
}

export function intersection(...params) {
  return new Intersection(...params);
}
