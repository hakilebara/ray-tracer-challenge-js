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
})
