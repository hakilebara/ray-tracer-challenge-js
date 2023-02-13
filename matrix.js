import assert from 'node:assert';
import { Tuple, tuple } from './tuple.js';
import { isEqual } from './utils.js';

export class Matrix extends Array {

  constructor(...params) {
    super();
    for (let i = 0; i < params.length; i++) {
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

export function determinant(matrix) {
  let size = matrix[0].length;
  if (size === 2)
    // To find the determinanat of a 2x2 matrix
    // determinant( [a, b],
    //              [c, d] ) = a*d - b*c
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  if (size > 2) {
    // To find the determinant of larger matrices,
    // take any one of the rows or columns, then
    // for each of the elements multiply the element
    // by its cofactor and add the products together
    let detm = 0;
    for (let i = 0; i < size; i++) {
      detm += matrix[0][i] * cofactor(matrix, 0, i);
    }
    return detm;
  }
}

export function submatrix(matrix, row, column) {
  const subm = copy(matrix);
  subm.splice(row, 1);
  for (let i = 0; i < subm.length; i++) {
    subm[i].splice(column, 1);
  }
  return subm;
}

export function copy(matrix) {
  let deepCopy = JSON.parse(JSON.stringify(matrix));
  return new Matrix(...deepCopy);
}

export const identity_matrix = new Matrix(
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1]
)

export function minor(matrix, row, column) {
  return determinant(submatrix(matrix, row, column));
}

export function cofactor(matrix, row, column) {
  let sign = (row + column) % 2 ? -1 : 1; // if row + column is an odd number, negate the minor
  return minor(matrix, row, column) * sign;
}

export function isInvertible(matrix) {
  // if its determinant is 0 a matrix is not invertible
  return determinant(matrix) === 0 ? false : true;
}

export function inverse(matrix) {
  if (!isInvertible(matrix)) return;
  let inverted_matrix = copy(matrix);
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      let cof = cofactor(matrix, row, col);
      // note that [col][row] here instead of [row][col]
      // transposes the matrix
      inverted_matrix[col][row] = cof / determinant(matrix);
    }
  }
  return inverted_matrix;
}

export function areMatrixEqual(m1, m2) {
  if (m1.length != m2.length) return false;
  if (m1[0].length != m2[0].length) return false;

  for (let row = 0; row < m1.length; row++) {
    for (let col = 0; col < m1[row].length; col++) {
      if (!isEqual(m1[row][col], m2[row][col])) return false;
    }
  }
  return true;
}

export function matrix(...params) {
  return new Matrix(...params);
}
