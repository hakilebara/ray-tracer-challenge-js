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

  rgb_clamp(c) {
    return Math.min(Math.max(c, 0), 255);
  }

  color_to_ppm_pixel(color) {
    let red = this.rgb_clamp(Math.round(color.red * 255))
    let green = this.rgb_clamp(Math.round(color.green * 255));
    let blue = this.rgb_clamp(Math.round(color.blue * 255));

    return `${red} ${green} ${blue}`;
  }

  canvas_to_ppm() {
    let ppm_string = `P3\n${this.width} ${this.height}\n255`;
    for (let j = 0; j < this.height; j++) {
      let line = '';
      for (let i = 0; i < this.width; i++) {
        line += this.color_to_ppm_pixel(this.grid[i][j]) + ' ';
      }
      line = line.replace(/\s+$/, ''); // remove empty space at the end of the line
      ppm_string = ppm_string.concat('\n', line);
    }
    return ppm_string;
  }
}

export function canvas(width, height) {
  return new Canvas(width, height);
}
