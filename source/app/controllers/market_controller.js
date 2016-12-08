/// <reference path="../../framework/interfaces"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var framework_1 = require("../../framework/framework");
var market_view_1 = require("../views/market_view");
var nasdaq_model_1 = require("../models/nasdaq_model");
var nyse_model_1 = require("../models/nyse_model");
var MarketController = (function (_super) {
    __extends(MarketController, _super);
    function MarketController(metiator) {
        _super.call(this, metiator);
        this._marketView = new market_view_1.MarketView(metiator);
        this._nasdaqModel = new nasdaq_model_1.NasdaqModel(metiator);
        this._nyseModel = new nyse_model_1.NyseModel(metiator);
    }
    MarketController.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new framework_1.AppEvent("app.controller.market.nasdaq", null, function (e, args) { _this.nasdaq(args); }),
            new framework_1.AppEvent("app.controller.market.nyse", null, function (e, args) { _this.nyse(args); })
        ]);
        this._marketView.initialize();
        this._nasdaqModel.initialize();
        this._nyseModel.initialize();
    };
    MarketController.prototype.dispose = function () {
        this.unsubscribeToEvents();
        this._marketView.dispose();
        this._nasdaqModel.dispose();
        this._nyseModel.dispose();
    };
    MarketController.prototype.nasdaq = function (args) {
        this._metiator.publish(new framework_1.AppEvent("app.model.nasdaq.change", null, null));
    };
    MarketController.prototype.nyse = function (args) {
        this._metiator.publish(new framework_1.AppEvent("app.model.nyse.change", null, null));
    };
    return MarketController;
})(framework_1.Controller);
exports.MarketController = MarketController;
