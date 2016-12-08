///<reference path="../../typings/tsd.d.ts" />
var app_1 = require("../../source/framework/app");
var View_1 = require("../../source/framework/View");
var expect = chai.expect;
describe("App class spec \n", function () {
    it('It should set its own properties correctly \n', function (done) {
        var appSettings = {
            defaultController: "home",
            defaultAction: "index",
            layout: new View_1.View(),
            controllers: new Array()
        };
        var app = new app_1.App();
        expect(app.start).to.be.a('function');
        done();
    });
});
