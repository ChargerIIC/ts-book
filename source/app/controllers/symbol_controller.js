/// <reference path="../../framework/interfaces"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var framework_1 = require("../../framework/framework");
var quote_model_1 = require("../models/quote_model");
var chart_model_1 = require("../models/chart_model");
var symbol_view_1 = require("../views/symbol_view");
var chart_view_1 = require("../views/chart_view");
var SymbolController = (function (_super) {
    __extends(SymbolController, _super);
    function SymbolController(metiator) {
        _super.call(this, metiator);
        this._quoteModel = new quote_model_1.QuoteModel(metiator);
        this._chartModel = new chart_model_1.ChartModel(metiator);
        this._symbolView = new symbol_view_1.SymbolView(metiator);
        this._chartView = new chart_view_1.ChartView(metiator);
    }
    SymbolController.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new framework_1.AppEvent("app.controller.symbol.quote", null, function (e, symbol) { _this.quote(symbol); })
        ]);
        this._quoteModel.initialize();
        this._chartModel.initialize();
        this._symbolView.initialize();
        this._chartView.initialize();
    };
    SymbolController.prototype.dispose = function () {
        this.unsubscribeToEvents();
        this._symbolView.dispose();
        this._quoteModel.dispose();
        this._chartView.dispose();
        this._chartModel.dispose();
    };
    SymbolController.prototype.quote = function (symbol) {
        this.triggerEvent(new framework_1.AppEvent("app.model.quote.change", symbol, null));
    };
    return SymbolController;
})(framework_1.Controller);
exports.SymbolController = SymbolController;
