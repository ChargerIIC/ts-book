///<reference path="../typings/tsd.d.ts" />
///<reference path="../source/interfaces.d.ts" />

import { MathDemo } from "../source/math_demo";

var expect = chai.expect;

describe('BDD test example for MathDemo class \n', () => {

  before(function(){ /* invoked once before ALL tests */ });
  after(function(){ /* invoked once after ALL tests */ });
  beforeEach(function(){ /* invoked once before EACH test */ });
  afterEach(function(){ /* invoked once before EACH test */ });

  it('should return the correct numeric value for PI \n', () => {
    var math : MathInterface = new MathDemo();
    expect(math.PI).to.equals(3.14159265359);
    expect(math.PI).to.be.a('number');
  });

});
