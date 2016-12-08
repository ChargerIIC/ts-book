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
var ChartModel = (function (_super) {
    __extends(ChartModel, _super);
    function ChartModel(metiator) {
        _super.call(this, metiator);
    }
    ChartModel.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new framework_1.AppEvent("app.model.chart.change", null, function (e, args) { _this.onChange(args); })
        ]);
    };
    ChartModel.prototype.dispose = function () {
        this.unsubscribeToEvents();
    };
    ChartModel.prototype.onChange = function (args) {
        var _this = this;
        var p = {
            Normalized: false,
            NumberOfDays: 365,
            DataPeriod: "Day",
            Elements: [
                { Symbol: args, Type: "price", Params: ["ohlc"] }
            ]
        };
        var queryString = "parameters=" + encodeURIComponent(JSON.stringify(p));
        this.getAsync("jsonp", queryString)
            .then(function (data) {
            var chartData = _this.formatModel(args, data);
            _this.triggerEvent(new framework_1.AppEvent("app.view.chart.render", chartData, null));
        })
            .catch(function (e) {
            _this.triggerEvent(new framework_1.AppEvent("app.error", e, null));
        });
    };
    ChartModel.prototype.formatModel = function (symbol, data) {
        var chartData = {
            title: symbol,
            series: []
        };
        var series = [
            { name: "open", data: data.Elements[0].DataSeries.open.values },
            { name: "close", data: data.Elements[0].DataSeries.close.values },
            { name: "high", data: data.Elements[0].DataSeries.high.values },
            { name: "low", data: data.Elements[0].DataSeries.low.values }
        ];
        for (var i = 0; i < series.length; i++) {
            var serie = {
                name: series[i].name,
                data: []
            };
            for (var j = 0; j < series[i].data.length; j++) {
                var val = series[i].data[j];
                var d = new Date(data.Dates[j]).getTime();
                serie.data.push([d, val]);
            }
            chartData.series.push(serie);
        }
        return chartData;
    };
    ChartModel = __decorate([
        framework_1.ModelSettings("http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp")
    ], ChartModel);
    return ChartModel;
})(framework_1.Model);
exports.ChartModel = ChartModel;
