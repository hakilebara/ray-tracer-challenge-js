import { canvas } from './canvas.js';
import { color } from './color.js';

test('Creating a canvas', () => {
  let c = canvas(10, 20);
  expect(c.width).toBe(10);
  expect(c.height).toBe(20);
  for (let i = 0; i < c.width; i++) {
    for (let j = 0; j <c.height; j++) {
      expect(c.pixel_at(i,j)).toEqual(color(0, 0, 0));
    }
  }
});

test('Writing pixels to a canvas', () => {
  let c = canvas(10, 20);
  let red = color(1, 0, 0);
  c.write_pixel(2, 3, red);
  expect(c.pixel_at(2, 3)).toEqual(red);
});

test('Constructing the PPM header', () => {
  let c = canvas(5, 3);
  let ppm = "P3\n5 3\n255";
  // lines 1-3 of ppm
  expect(c.canvas_to_ppm().split('\n').slice(0,3).join('\n')).toEqual(ppm);
});

test('Constructing the PPM pixel data', () => {
  let c = canvas(5, 3);
  let c1 = color(1.5, 0, 0);
  let c2 = color(0, 0.5, 0);
  let c3 = color(-0.5, 0, 1);
  c.write_pixel(0, 0, c1)
  c.write_pixel(2, 1, c2)
  c.write_pixel(4, 2, c3)
  let ppm = c.canvas_to_ppm();
  let expected_ppm = "255 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 128 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0 0 0 0 0 0 255";
  expect(ppm.split('\n').slice(3, 6).join('\n')).toEqual(expected_ppm);
});

test('Splitting long lines in PPM files', () => {
  let c = canvas(10, 2);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 2; j++) {
      c.write_pixel(i, j, color(1, 0.8, 0.6));
    }
  }
  let ppm = c.canvas_to_ppm();
  let expected_ppm = "255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204 153\n255 204 153 255 204 153 255 204 153 255 204 153\n255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204 153\n255 204 153 255 204 153 255 204 153 255 204 153";
  expect(ppm.split('\n').slice(3, 7).join('\n')).toEqual(expected_ppm);
});

test('PPM files are terminated by a newline character', () => {
  let c = canvas(5, 3);
  let ppm = c.canvas_to_ppm();
  expect(ppm.slice(-1)).toBe('\n');
});
