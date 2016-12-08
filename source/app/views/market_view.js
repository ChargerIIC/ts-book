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
var MarketView = (function (_super) {
    __extends(MarketView, _super);
    function MarketView(metiator) {
        _super.call(this, metiator);
    }
    MarketView.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new framework_1.AppEvent("app.view.market.render", null, function (e, args) {
                _this.renderAsync(args)
                    .then(function (model) {
                    _this.bindDomEvents(model);
                })
                    .catch(function (e) {
                    _this.triggerEvent(new framework_1.AppEvent("app.error", e, null));
                });
            }),
        ]);
    };
    MarketView.prototype.dispose = function () {
        this.unbindDomEvents();
        this.unsubscribeToEvents();
    };
    MarketView.prototype.bindDomEvents = function (model) {
        var _this = this;
        var scope = $(this._container);
        $(".getQuote").on('click', scope, function (e) {
            var symbol = $(e.currentTarget).data('symbol');
            _this.getStockQuote(symbol);
        });
        $(scope).find('table').DataTable();
    };
    MarketView.prototype.unbindDomEvents = function () {
        var scope = this._container;
        $(".getQuote").off('click', scope);
        var table = $(scope).find('table').DataTable();
        table.destroy();
    };
    MarketView.prototype.getStockQuote = function (symbol) {
        this.triggerEvent(new framework_1.AppEvent("app.route", new framework_1.Route("symbol", "quote", [symbol]), null));
    };
    MarketView = __decorate([
        framework_1.ViewSettings("./source/app/templates/market.hbs", "#outlet")
    ], MarketView);
    return MarketView;
})(framework_1.View);
exports.MarketView = MarketView;
