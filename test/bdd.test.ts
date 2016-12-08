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

  it('should return the correct numeric value for pow \n', () => {
      var math : MathInterface = new MathDemo();
      var result = math.pow(3,5);
      var expected = 243;
      expect(result).to.be.a('number');
      expect(result).to.equal(expected);
     });

   it('should return the correct numeric value for pow (async) \n', (done) => {
       var math : MathInterface = new MathDemo();
       math.powAsync(3, 5, function(result) {
         var expected = 243;
         expect(result).to.be.a('number');
         expect(result).to.equal(expected);
         done(); // invoke done() inside your call back or fulfilled promises
       });
     });

   it('should throw an exception when no parameters passed \n', () => {
     var math : MathInterface = new MathDemo();
     var throwsF = function() { math.bad(/* missing args */) };
     expect(throwsF).to.throw(Error);
   });
});

describe('BDD test example for CalculatorWidget class \n', () => {

  before(function() {
    $("body").append('<div id="widget"/>');
  });

  beforeEach(function() {
    $("#widget").empty();
  });

  it('onSubmit should be invoked when #submit is clicked', () => {
    var math : MathInterface = new MathDemo();
    var calculator = new CalculatorWidget(math);
    calculator.render("#widget");
    $('#base').val("2");
    $('#exponent').val("3");

    // spy on onSubmit
    var onSubmitSpy = sinon.spy(calculator, "onSubmit");
    $("#submit").trigger("click");

    // assert calculator.onSubmit was invoked when click on #submit
    expect(onSubmitSpy.called).to.equal(true);
    expect(onSubmitSpy.callCount).to.equal(1);
    expect($("#result").val()).to.equal("8");
  });

  it('pass the right args to Math.pow', (done) => {
    var math : MathInterface = new MathDemo();

    // replace pow method with a method for testing
    sinon.stub(math, "pow", function(a, b) {
      // assert that CalculatorWidget.onSubmit invokes
      // math.pow with the right arguments
      expect(a).to.equal(2);
      expect(b).to.equal(3);
      done();
    });

    var calculator = new CalculatorWidget(math);
    calculator.render("#widget");
    $('#base').val("2");
    $('#exponent').val("3");

    $("#submit").trigger("click");
  });

});
