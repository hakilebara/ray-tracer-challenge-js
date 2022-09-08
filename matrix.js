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

  multiplyBy(matrix) {
    let M = new Matrix (
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    );

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        M[i][j] = this[i][0] * matrix[0][j] +
                  this[i][1] * matrix[1][j] +
                  this[i][2] * matrix[2][j] +
                  this[i][3] * matrix[3][j];
      }
    }

    return M;
  }
}

export function matrix(...params) {
  return new Matrix(...params);
}
