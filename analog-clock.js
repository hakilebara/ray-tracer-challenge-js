import { canvas } from './canvas.js';
import { point } from './point.js';
import { color } from './color.js';
import { rotation_z } from './matrix.js';

function draw(canvas, point) {
  let delta_x = canvas.width  / 2;
  let delta_y = canvas.height / 2;

  let x = Math.round(point.x * (3/8 * canvas.width) + delta_x);
  let y = Math.round(delta_y - point.y * (3/8 * canvas.height));

  canvas.write_pixel(x, y, color(1, 1, 1));
}

let c = canvas(250, 250);
let twelve = point(0, 1, 0);
draw(c, twelve);

for (let i = 1; i < 12; i++) {
  let r = rotation_z(i * Math.PI / 6);
  let hour = r.multiplyBy(twelve);
  draw(c, hour);
}

console.log(c.canvas_to_ppm())
