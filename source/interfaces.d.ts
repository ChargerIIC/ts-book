interface MathInterface {
  PI : number;
  pow(base: number, exponent: number);
  powAsync(base: number, exponent: number, cb : (result : number) => void);
  bad(foo? : any) : void; //really?
}
