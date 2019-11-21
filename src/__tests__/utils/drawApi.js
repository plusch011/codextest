import DrawApi from "../../ultils/drawApi";


describe('DrawApi', () => {
  test('new invocation should create instance of DrawApi', function () {
    const drawApi = new DrawApi();
    expect(drawApi.cnv).toBeNull();
    expect(drawApi.width).toBeNull();
    expect(drawApi.height).toBeNull();
  });

  test('createCanvas(w, h) to create 2d Array', function () {
    const drawApi = new DrawApi();
    drawApi.createCanvas(10, 5);

    expect(drawApi.cnv).toBeInstanceOf(Array);
    expect(drawApi.cnv.length).toBe(5);
    expect(drawApi.cnv[0].length).toBe(10);

  });

  test('line(x1, y1, x2, y2) to draw line with "x" pattern', function () {
    const drawApi = new DrawApi();
    const [x1, y1, x2, y2] = [1, 2, 4, 2];
    drawApi.createCanvas(10, 5);
    drawApi.line(x1, y1, x2, y2);

    for(let i = x1; i <= x2; i++) {
      expect(drawApi.cnv[y1][i]).toBe('x');
    }
  });

  test('rectangle(x1, y1, x2, y2) to draw rectangle with "x" pattern', function () {
    const drawApi = new DrawApi();
    const [x1, y1, x2, y2] = [1, 2, 4, 4];
    drawApi.createCanvas(10, 5);
    drawApi.rectangle(x1, y1, x2, y2);

    for(let i = x1; i <= x2; i++) {
      expect(drawApi.cnv[y1][i]).toBe('x');
      expect(drawApi.cnv[y2][i]).toBe('x');
    }

    for(let i = y1; i <= y2; i++) {
      expect(drawApi.cnv[i][x1]).toBe('x');
      expect(drawApi.cnv[i][x2]).toBe('x');
    }
  });

  test('bucketFill(x, y, color) to fill cnv with color pattern', function () {
    const drawApi = new DrawApi();
    const [x, y, color] = [1, 2, 'a'];
    drawApi.createCanvas(10, 5);
    drawApi.bucketFill(x, y, color);

    for(let i = 0; i < 5; i++) {
      for(let n = 0; n < 10; n++) {
        expect(drawApi.cnv[i][n]).toBe(color);
      }
    }
  });

  test('render() to add edges to cnv', function () {
    const drawApi = new DrawApi();
    const [x, y, color] = [1, 2, 'a'];
    drawApi.createCanvas(3, 4);
    const result = drawApi.render();


    expect(result).toBe(`-----
|   |
|   |
|   |
|   |
-----
`);

  });
});
