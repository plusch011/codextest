class DrawApi {
  constructor() {
    this.width = null;
    this.height = null;
    this.cnv = null;
  }

  createCanvas(width, height) {
    const col = Array(height).fill(' ');
    this.cnv = Array.from(col, _ => Array(width).fill(' '));
    this.width = width;
    this.height = height;
  }

  line(x1, y1, x2, y2) {
    if(x1 - x2) {
      if(x1 > x2) {
        [x1, x2] = [x2, x1];
      }
      for(let i = x1; i <= x2; i++) {
        if(!this.cnv[y1] || !this.cnv[y1][i]) {
          continue
        }
        this.cnv[y1][i] = 'x';
      }
    } else {
      if(y1 > y2) {
        [y1, y2] = [y2, y1];
      }
      for(let i = y1; i <= y2; i++) {
        if(!this.cnv[i] || !this.cnv[i][x1]) {
          continue
        }
        this.cnv[i][x1] = 'x';
      }
    }
  }


  bucketFill(x, y, color) {
    if(!this.cnv[y] || !this.cnv[y][x]) {
      return;
    }

    const startColor = this.cnv[y][x];

    const stack = [{ x, y }];

    while(stack.length) {
      const coords = stack.pop();
      const { x, y } = coords;

      if(!this.cnv[y] || !this.cnv[y][x]) {
        continue;
      }

      if(this.cnv[y][x] === startColor) {
        this.cnv[y][x] = color;
        stack.push(
          { x: x - 1, y: y },
          { x: x + 1, y: y },
          { x: x, y: y - 1 },
          { x: x, y: y + 1 });
      }
    }
  }

  rectangle(x1, y1, x2, y2) {
    this.line(x1,y1,x2,y1);
    this.line(x1,y2,x2,y2);
    this.line(x1,y1,x1,y2);
    this.line(x2,y1,x2,y2);
  }

  render() {
    const renderCnv = Array.from(this.cnv, el => Array.from(el));
    renderCnv.forEach(row => {
      row.push('|');
      row.unshift('|');
    });
    renderCnv.push(Array(this.width + 2).fill('-'));
    renderCnv.unshift(Array(this.width + 2).fill('-'));
    const result = renderCnv.reduce((result, row) => {
      return `${result}${row.join('')}\n`
    }, '');
    return result;
  }
}

export default DrawApi;