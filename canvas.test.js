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
