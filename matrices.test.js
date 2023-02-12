import { determinant, identity_matrix, matrix, minor, submatrix, transpose } from './matrix.js';
import { tuple } from './tuple.js';

test('Constructing and inspecting a 4x4 matrix', () => {
  let M = matrix(
    [1,    2,    3,    4   ],
    [5.5,  6.5,  7.5,  8.5 ],
    [9,    10,   11,   12  ],
    [13.5, 14.5, 15.5, 16.5]);

  expect(M[0][0]).toBe(1);
  expect(M[0][3]).toBe(4);
  expect(M[1][0]).toBe(5.5);
  expect(M[1][2]).toBe(7.5);
  expect(M[2][2]).toBe(11);
  expect(M[3][0]).toBe(13.5);
  expect(M[3][2]).toBe(15.5);
});

test('A 2x2 matrix ought to be representable', () => {
  let M = matrix(
    [-3, 5],
    [1, -2]
  );

  expect(M[0][0]).toBe(-3);
  expect(M[0][1]).toBe(5);
  expect(M[1][0]).toBe(1);
  expect(M[1][1]).toBe(-2);
});

test('A 3x3 matrix ought to be representable', () => {
  let M = matrix(
    [-3, 5, 0],
    [1, -2, -7],
    [0, 1, 1]
  );

  expect(M[0][0]).toBe(-3);
  expect(M[1][1]).toBe(-2);
  expect(M[2][2]).toBe(1);
});

test('Matrix equality with identical matrices', () => {
  let A = matrix(
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 8, 7, 6],
    [5, 4, 3, 2],
  );

  let B = matrix(
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 8, 7, 6],
    [5, 4, 3, 2],
  );

  expect(A).toEqual(B);
});

test('Matrix equality with different matrics', () => {
  let A = matrix(
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 8, 7, 6],
    [5, 4, 3, 2],
  );

  let B = matrix(
    [2, 3, 4, 5],
    [6, 7, 8, 9],
    [8, 7, 6, 5],
    [4, 3, 2, 1],
  );

  expect(A).not.toEqual(B);
});

test('Multiplying two matrices', () => {
  let A = matrix(
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 8, 7, 6],
    [5, 4, 3, 2],
  );

  let B = matrix(
    [-2, 1, 2, 3 ],
    [ 3, 2, 1, -1],
    [ 4, 3, 6, 5 ],
    [ 1, 2, 7, 8 ],
  );

  expect(A.multiplyBy(B)).toEqual(matrix(
    [20, 22,  50,  48],
    [44, 54, 114, 108],
    [40, 58, 110, 102],
    [16, 26,  46,  42],
  ));
});

test('A matrix multiplied by a tuple', () => {
  let A = matrix(
    [1, 2, 3, 4],
    [2, 4, 4, 2],
    [8, 6, 4, 1],
    [0, 0, 0, 1],
  );
  let b = tuple(1, 2, 3, 1);
  expect(A.multiplyBy(b)).toEqual(tuple(18, 24, 33, 1));
});

test('Multiplying a matrix by the identity matrix', () => {
  let A = matrix(
    [0, 1,  2,  4],
    [1, 2,  4,  8],
    [2, 4,  8, 16],
    [4, 8, 16, 32],
  );
  expect(A.multiplyBy(identity_matrix)).toEqual(A);
});

test('Multiplying the identity matrix by a tuple', () => {
  let A = tuple(1, 2, 3, 4);
  expect(identity_matrix.multiplyBy(A)).toEqual(A);
});

test('Transposing a matrix', () => {
  let A = matrix(
    [0, 9, 3, 0],
    [9, 8, 0, 8],
    [1, 8, 5, 3],
    [0, 0, 5, 8]
  );
  let B = matrix(
    [0, 9, 1, 0],
    [9, 8, 8, 0],
    [3, 0, 5, 5],
    [0, 8, 3, 8]
  );

  expect(transpose(A)).toEqual(B);
});

test('Transposing the identity matrix', () => {
  expect(transpose(identity_matrix)).toEqual(identity_matrix);
});

test('Calculating the determinant of a 2x2 matrix', () => {
  let A = matrix(
    [ 1, 5],
    [-3, 2]
  );
  expect(determinant(A)).toBe(17);
});

test('A submatrix of a 3x3 matrix is a 2x2 matrix', () => {
  let A = matrix(
    [ 1, 5,  0],
    [-3, 2,  7],
    [ 0, 6, -3]
  );

  expect(submatrix(A, 0, 2))
    .toEqual(matrix(
      [-3, 2],
      [ 0, 6]
    ));
});

test('A submatrix of a 4x4 matrix is a 3x3 matrix', () => {
  let A = matrix(
    [-6, 1,  1, 6],
    [-8, 5,  8, 6],
    [-1, 0,  8, 2],
    [-7, 1, -1, 1]
  );
  expect(submatrix(A, 2, 1))
    .toEqual(matrix(
      [-6,  1, 6],
      [-8,  8, 6],
      [-7, -1, 1]
    ));
});

test('Calculating the minaor of a 3x3 matrix', () => {
  let A = matrix(
    [3,  5,  0],
    [2, -1, -7],
    [6, -1,  5]
  );
  let B = submatrix(A, 1, 0);
  expect(determinant(B)).toBe(25);
  expect(minor(A, 1, 0)).toBe(25);
});
