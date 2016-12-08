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
var SymbolView = (function (_super) {
    __extends(SymbolView, _super);
    function SymbolView(metiator) {
        _super.call(this, metiator);
    }
    SymbolView.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new framework_1.AppEvent("app.view.symbol.render", null, function (e, model) {
                _this.renderAsync(model)
                    .then(function (model) {
                    _this.bindDomEvents(model);
                    _this.triggerEvent(new framework_1.AppEvent("app.model.chart.change", model.quote.Symbol, null));
                })
                    .catch(function (e) {
                    _this.triggerEvent(new framework_1.AppEvent("app.error", e, null));
                });
            }),
        ]);
    };
    SymbolView.prototype.dispose = function () {
        this.unbindDomEvents();
        this.unsubscribeToEvents();
    };
    SymbolView.prototype.bindDomEvents = function (model) {
        var scope = $(this._container);
    };
    SymbolView.prototype.unbindDomEvents = function () {
        var scope = this._container;
    };
    SymbolView = __decorate([
        framework_1.ViewSettings("./source/app/templates/symbol.hbs", "#outlet")
    ], SymbolView);
    return SymbolView;
})(framework_1.View);
exports.SymbolView = SymbolView;
