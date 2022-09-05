import { point } from './point.js';
import { vector } from './vector.js';
import { canvas } from './canvas.js';
import { color } from './color.js';

class Projectile {
  position; //point
  velocity; //vector

  constructor(position, velocity) {
    this.position = position;
    this.velocity = velocity;
  }
}

class Environment {
  gravity; //vector
  wind; //vector

  constructor(gravity, wind) {
    this.gravity = gravity;
    this.wind = wind;
  }
}

function tick(env, proj) {
  let position = proj.position.add(proj.velocity);
  let velocity = proj.velocity.add(env.gravity).add(env.wind);
  return new Projectile(position, velocity);
}

// projectile starts one unit above the origin.
// velocity is normalized to 1 unit/tick
let start = point(0, 1, 0);
let velocity = vector(1, 1.8, 0).normalize().multiplyBy(11.25) ;
let p = new Projectile(start, velocity);

// gravity -0.1 unit/tick, and wind is -0.01 unit/tick
let gravity = vector(0, -0.1, 0);
let wind = vector(-0.01, 0, 0);
let e = new Environment(gravity, wind);

let c = canvas(900, 500);

let x = 0;
let y = 500 - Math.round(p.position.y);
c.write_pixel(x, y, color(1, 0, 0));
while(p.position.y >= 0) {
  p = tick(e, p);
  x += 1;
  y = 500 - Math.round(p.position.y);
  c.write_pixel(x, y, color(1, 0, 0));
}

console.log(c.canvas_to_ppm())
