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

  color_to_ppm_string(color) {
    let red = this.rgb_clamp(Math.round(color.red * 255))
    let green = this.rgb_clamp(Math.round(color.green * 255));
    let blue = this.rgb_clamp(Math.round(color.blue * 255));

    return `${red} ${green} ${blue}`;
  }

  canvas_to_ppm() {
    let ppm_string = `P3\n${this.width} ${this.height}\n255`;

    for (let j = 0; j < this.height; j++) {
      let rgb_pixel_arr = [];
      for (let i = 0; i < this.width; i++) {
        rgb_pixel_arr.push(...this.color_to_ppm_string(this.grid[i][j]).split(' '));
      }

      let line = '';
      let counter = 0;
      rgb_pixel_arr.reduce((previous, current) => { // makes sure a line < 70 characters
        if (counter > 70) {
          line = line.replace(/\s+$/, ''); // remove empty space at the end of the line
          line += '\n';
          counter = 0;
        }
        line += current + ' ';
        counter += (current + ' ').length;
      }, line);

      line = line.replace(/\s+$/, ''); // remove empty space at the end of the line
      ppm_string = ppm_string.concat('\n', line);
    }
    return ppm_string + '\n';
  }
}

export function canvas(width, height) {
  return new Canvas(width, height);
}
