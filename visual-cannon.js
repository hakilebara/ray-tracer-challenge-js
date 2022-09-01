import { Point } from './point.js';
import { Vector } from './vector.js';

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
let p = new Projectile(new Point(0, 1, 0), new Vector(1, 20, 0).normalize());

// gravity -0.1 unit/tick, and wind is -0.01 unit/tick
let e = new Environment(new Vector(0, -0.1, 0), new Vector(-0.01, 0, 0));

let t = 0;
console.log(t, p.position.y);
while(p.position.y >= 0) {
  p = tick(e, p);
  t += 1;
  console.log(t, p.position.y);
}

