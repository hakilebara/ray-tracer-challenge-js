import { matrix } from './matrix.js';

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
