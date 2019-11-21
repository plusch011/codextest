import DrawApi from "./drawApi";

export default class Compilator {
  constructor() {
    this.draw = new DrawApi();
    this.instructions = null;
  }

  parseString(str) {
    this.instructions = str.split('\n')
      .map(el => el.trim().split(' '));
  }

  perform(instruction) {
    const args = instruction.slice(1);
    switch(instruction[0]) {
      case 'C':
        const arggs = [...args.map(x => +x)];
        this.draw.createCanvas(...arggs);
        return this.draw.render();
        break;

      case 'L':
        if(!this.draw.cnv) {
          return 'Error: cnv doesnt exists';
        }
        this.draw.line(...args.map(x => +x));
        return this.draw.render();
        break;

      case 'R':
        if(!this.draw.cnv) {
          return 'Error: cnv doesnt exists';
        }
        this.draw.rectangle(...args.map(x => +x));
        return this.draw.render();
        break;

      case 'B':
        if(!this.draw.cnv) {
          return 'Error: cnv doesnt exists';
        }
        this.draw.bucketFill(+args[0], +args[1], args[2]);
        return this.draw.render();
        break;
      case '':
        return '';

      default:
        return 'Argument Error';
    }
  }

  compile(str) {
    this.parseString(str);
    const result = this.instructions
      .reduce((result, instruction) => `${result}${this.perform(instruction)}`, '');
    this.draw.cnv = null;
    return result;
  }
}
