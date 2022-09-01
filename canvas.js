import { color } from './color.js';

class Canvas {
  width;
  height;
  grid;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = Array(width);

    for (let i = 0; i < width; i++) { // columns
      this.grid[i] = Array(height)
      for (let j = 0; j < height; j++) { // rows
        this.grid[i][j] = color(0, 0, 0);
      }
    }
  }
  
  pixel_at(x, y) {
    return this.grid[x][y];
  }

  write_pixel(x, y, color) {
    this.grid[x][y] = color;
  }

  canvas_to_ppm() {
    let ppm_string = `P3\n${this.width} ${this.height}\n255`;
    return ppm_string;
  }
}

export function canvas(width, height) {
  return new Canvas(width, height);
}
