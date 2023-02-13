import { isEqual } from './utils.js';

export class Tuple extends Array {
  get x() { return this[0] }
  get y() { return this[1] }
  get z() { return this[2] }
  get w() { return this[3] }

  isPoint() {
    return this.w === 1.0;
  }

  isVector() {
    return this.w === 0.0;
  }

  add(tuple) {
    return this.map((element, index) => element + tuple[index]);
  }

  substract(tuple) {
    return this.map((element, index) => element - tuple[index]);
  }

  negate() {
    let zero = new Tuple(0, 0, 0, 0);
    return zero.substract(this);
  }

  multiplyBy(object) {
    return object instanceof Tuple 
      ? this.map((element, index) => element * object[index]) 
      : this.map((element) => element * object);
  }

  divideBy(object) {
    return object instanceof Tuple 
      ? this.map((element, index) => element / object[index]) 
      : this.map((element) => element / object);
  }

  magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2);
  }

  equal(tuple) {
    return this.every((element, index) => isEqual(element, tuple[index]));
  }
}

export function tuple (x, y, z, w) {
  return Tuple.of(x, y, z, w);
}
