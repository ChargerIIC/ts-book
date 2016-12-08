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
var QuoteModel = (function (_super) {
    __extends(QuoteModel, _super);
    function QuoteModel(metiator) {
        _super.call(this, metiator);
    }
    QuoteModel.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new framework_1.AppEvent("app.model.quote.change", null, function (e, args) { _this.onChange(args); })
        ]);
    };
    QuoteModel.prototype.dispose = function () {
        this.unsubscribeToEvents();
    };
    QuoteModel.prototype.onChange = function (args) {
        var _this = this;
        var s = { symbol: args };
        this.getAsync("jsonp", s)
            .then(function (data) {
            var quote = _this.formatModel(data);
            _this.triggerEvent(new framework_1.AppEvent("app.view.symbol.render", quote, null));
        })
            .catch(function (e) {
            _this.triggerEvent(new framework_1.AppEvent("app.error", e, null));
        });
    };
    QuoteModel.prototype.formatModel = function (data) {
        data.Change = data.Change.toFixed(2);
        data.ChangePercent = data.ChangePercent.toFixed(2);
        data.Timestamp = new Date(data.Timestamp).toLocaleDateString();
        data.MarketCap = (data.MarketCap / 1000000).toFixed(2) + "M.";
        data.ChangePercentYTD = data.ChangePercentYTD.toFixed(2);
        return { quote: data };
    };
    QuoteModel = __decorate([
        framework_1.ModelSettings("http://dev.markitondemand.com/Api/v2/Quote/jsonp")
    ], QuoteModel);
    return QuoteModel;
})(framework_1.Model);
exports.QuoteModel = QuoteModel;
