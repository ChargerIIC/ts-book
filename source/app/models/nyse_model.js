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
var NyseModel = (function (_super) {
    __extends(NyseModel, _super);
    function NyseModel(metiator) {
        _super.call(this, metiator);
    }
    NyseModel.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new framework_1.AppEvent("app.model.nyse.change", null, function (e, args) { _this.onChange(args); })
        ]);
    };
    NyseModel.prototype.dispose = function () {
        this.unsubscribeToEvents();
    };
    NyseModel.prototype.onChange = function (args) {
        var _this = this;
        this.getAsync("json", args)
            .then(function (data) {
            var stocks = { items: data, market: "NYSE" };
            _this.triggerEvent(new framework_1.AppEvent("app.view.market.render", stocks, null));
        })
            .catch(function (e) {
            _this.triggerEvent(new framework_1.AppEvent("app.error", e, null));
        });
    };
    NyseModel = __decorate([
        framework_1.ModelSettings("./data/nyse.json")
    ], NyseModel);
    return NyseModel;
})(framework_1.Model);
exports.NyseModel = NyseModel;
