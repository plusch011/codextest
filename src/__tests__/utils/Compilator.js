import Compilator from "../../ultils/Compilator";
import DrawApi from "../../ultils/drawApi";

describe('Compilator', () => {
  test('new invocation should create instance of Compilator', function () {
    const compilator = new Compilator();
    expect(compilator.draw).toBeInstanceOf(DrawApi);
    expect(compilator.instructions).toBeNull();
  });

  test('parseString(str) to parse string to an array', function () {
    const compilator = new Compilator();
    compilator.parseString('C 20 1');

    expect(compilator.instructions[0]).toBeInstanceOf(Array);
    expect(compilator.instructions[0][0]).toBe('C');
    expect(compilator.instructions[0][1]).toBe('20');
    expect(compilator.instructions[0][2]).toBe('1');

  });

  test('perform(instruction) to return compilated instruction', function () {
    const compilator = new Compilator();
    compilator.parseString('C 2 1');
    const result = compilator.perform(compilator.instructions[0]);

    expect(result).toBe(`----
|  |
----
`);


  });

  test('compile(str) to perform complex computing', function () {
    const compilator = new Compilator();
    const result = compilator.compile(`C 10 6
L 1 2 6 2
L 6 3 6 4`);
    console.log(result);
    expect(result).toBe(`------------
|          |
|          |
|          |
|          |
|          |
|          |
------------
------------
|          |
|          |
| xxxxxx   |
|          |
|          |
|          |
------------
------------
|          |
|          |
| xxxxxx   |
|      x   |
|      x   |
|          |
------------
`);
  });
});