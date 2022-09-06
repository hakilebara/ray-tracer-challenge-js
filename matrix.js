import assert from 'node:assert';

export class Matrix extends Array {

  constructor(...params) {
    super();
    for (let i = 0; i < params.length; i++) {
      assert(params[i] instanceof Array, "Matrix only takes arrays as params");
      this[i] = params[i];
    }
    assert(
      params.every(elmt => elmt.length === params[0].length),
      "Matrix rows must be of the same size"
    );
  }
}

export function matrix(...params) {
  return new Matrix(...params);
}
