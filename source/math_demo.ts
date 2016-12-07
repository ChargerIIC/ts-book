///<reference path="./interfaces.d.ts" />

class MathDemo implements MathInterface{
  public PI : number;

  constructor() {
    this.PI = 3.14159265359;
  }

  public pow(base: number, exponent: number) {
    var result = base;
    for(var i = 1; i < exponent; i++){
      result = result * base;
    }
    return result;
  }

  public powAsyncSlow(base: number, exponent: number, cb : (result : number) => void) {
    var delay = 45; //ms
    setTimeout(() => {
      var result = this.pow(base, exponent);
      cb(result);
    }, delay);
  }
}
export { MathDemo };
