import { canvas } from './canvas.js';
import { point } from './point.js';
import { color } from './color.js';
import { sphere } from './sphere.js';
import { intersect, ray } from './ray.js';
import { normalize } from './vector.js';
import { hit } from './intersection.js';

// start the ray at z = -5
let ray_origin = point(0, 0, -5);

// put the wall at z
let wall_z = 10;

let wall_size = 7;

let canvas_pixels = 100;

let pixel_size = wall_size / canvas_pixels;

let half = wall_size / 2;

let c = canvas(canvas_pixels, canvas_pixels);

let pixel_color = color(1, 0, 0);
let shape = sphere();

for (let y = 0; y < canvas_pixels; y++) {
  let world_y = half - pixel_size * y;

  for (let x = 0; x < canvas_pixels; x++) {
    let world_x = -half + pixel_size * x;
    
    let position = point(world_x, world_y, wall_z);
    
    let r = ray(ray_origin, normalize(position.substract(ray_origin)));
    let xs = intersect(shape, r);

    if (hit(xs)) {
      c.write_pixel(x, y, pixel_color);
    }
  }
}

// function draw(canvas, point) {}


console.log(c.canvas_to_ppm());
