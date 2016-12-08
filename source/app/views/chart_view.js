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
var ChartView = (function (_super) {
    __extends(ChartView, _super);
    function ChartView(metiator) {
        _super.call(this, metiator);
    }
    ChartView.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new framework_1.AppEvent("app.view.chart.render", null, function (e, model) {
                _this.renderChart(model);
                _this.bindDomEvents(model);
            }),
        ]);
    };
    ChartView.prototype.dispose = function () {
        this.unbindDomEvents();
        this.unsubscribeToEvents();
    };
    ChartView.prototype.bindDomEvents = function (model) {
        var scope = $(this._container);
    };
    ChartView.prototype.unbindDomEvents = function () {
        var scope = this._container;
    };
    ChartView.prototype.renderChart = function (model) {
        $(this._container).highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: model.title
            },
            subtitle: {
                text: 'Click and drag in the plot area to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Price'
                }
            },
            legend: {
                enabled: true
            },
            tooltip: {
                shared: true,
                crosshairs: true
            },
            plotOptions: {
                area: {
                    marker: {
                        radius: 0
                    },
                    lineWidth: 0.1,
                    threshold: null
                }
            },
            series: model.series
        });
    };
    ChartView = __decorate([
        framework_1.ViewSettings(null, "#chart_container")
    ], ChartView);
    return ChartView;
})(framework_1.View);
exports.ChartView = ChartView;
