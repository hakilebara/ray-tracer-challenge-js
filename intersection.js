export class Intersection {
  t; // value of the intersection
  obj; // object that was intersected

  constructor(t, obj) {
    this.t = t;
    this.obj = obj;
  }
}

export function intersection(...params) {
  return new Intersection(...params);
}
