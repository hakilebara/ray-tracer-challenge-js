import assert from 'node:assert';
import { Tuple, tuple } from './tuple.js';

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

  multiplyBy(object) {
    if (object instanceof Tuple) {
      let t = tuple(0, 0, 0, 0);

      for (let i = 0; i < 4; i++) {
          t[i] = this[i][0] * object[0] +
                    this[i][1] * object[1] +
                    this[i][2] * object[2] +
                    this[i][3] * object[3];
      }
      return t;
    }
    else {
      let M = new Matrix (
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      );

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          M[i][j] = this[i][0] * object[0][j] +
                    this[i][1] * object[1][j] +
                    this[i][2] * object[2][j] +
                    this[i][3] * object[3][j];
        }
      }
      return M;
    }
  }
}

export function transpose(matrix) {
  let M = new Matrix (
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  );

  for (let i = 0; i < 4; i++) {
    M[0][i] = matrix[i][0];
    M[1][i] = matrix[i][1];
    M[2][i] = matrix[i][2];
    M[3][i] = matrix[i][3];
  }
  return M;
}

/**
 *
 * determinant( [a, b],
 *              [c, d] ) = a*d - b*c
 *
 */
export function determinant(matrix) {
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
}

export function submatrix(matrix, row, column) {
  let subm = [...matrix];
  subm.splice(row, 1);
  for (let i = 0; i < subm.length; i++) {
    subm[i].splice(column, 1);
  }
  return subm;
}

export const identity_matrix = new Matrix(
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1]
)

export function matrix(...params) {
  return new Matrix(...params);
}
