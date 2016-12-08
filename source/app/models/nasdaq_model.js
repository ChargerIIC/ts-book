/// <reference path="../../framework/interfaces"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var framework_1 = require("../../framework/framework");
var NasdaqModel = (function (_super) {
    __extends(NasdaqModel, _super);
    function NasdaqModel(metiator) {
        _super.call(this, metiator);
    }
    NasdaqModel.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new framework_1.AppEvent("app.model.nasdaq.change", null, function (e, args) { _this.onChange(args); })
        ]);
    };
    NasdaqModel.prototype.dispose = function () {
        this.unsubscribeToEvents();
    };
    NasdaqModel.prototype.onChange = function (args) {
        var _this = this;
        this.getAsync("json", args)
            .then(function (data) {
            var stocks = { items: data, market: "NASDAQ" };
            _this.triggerEvent(new framework_1.AppEvent("app.view.market.render", stocks, null));
        })
            .catch(function (e) {
            _this.triggerEvent(new framework_1.AppEvent("app.error", e, null));
        });
    };
    NasdaqModel = __decorate([
        framework_1.ModelSettings("./data/nasdaq.json")
    ], NasdaqModel);
    return NasdaqModel;
})(framework_1.Model);
exports.NasdaqModel = NasdaqModel;
