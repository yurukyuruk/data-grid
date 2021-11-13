"use strict";
exports.__esModule = true;
exports.SortingService = void 0;
var index_js_1 = require("./index.js");
var sortModel_js_1 = require("./sortModel.js");
var enums_js_1 = require("./types/enums.js");
var SortingService = /** @class */ (function () {
    function SortingService(data) {
        this.data = data;
    }
    SortingService.prototype.sortData = function (sortConfigDatas) {
        var _a;
        for (var _i = 0, sortConfigDatas_1 = sortConfigDatas; _i < sortConfigDatas_1.length; _i++) {
            var sortRule = sortConfigDatas_1[_i];
            var fieldType = index_js_1.config.getColumnTypeFromColumnName(sortRule.field);
            if (fieldType === enums_js_1.ColumnType.STRING) {
                this.data.sort(this.sortStringComparator(index_js_1.config.getColumnIdFromColumnName(sortRule.field), sortRule.direction));
            }
            else if (fieldType === enums_js_1.ColumnType.NUMBER) {
                this.data.sort(this.sortNumberComparator(sortRule.field, sortRule.direction));
            }
            else {
                this.data.sort(this.sortDateComperator((_a = index_js_1.config.columns.get(sortRule.field)) === null || _a === void 0 ? void 0 : _a.name, sortRule.direction));
            }
        }
        return this.data;
    };
    SortingService.prototype.sortStringComparator = function (sortField, sortDirection) {
        return function (a, b) {
            var result = 0;
            if (sortDirection === enums_js_1.SortDirection.ASCENDING) {
                result = a[sortField] > b[sortField] ? 1 : -1;
            }
            else if (sortDirection === enums_js_1.SortDirection.DESCENDING) {
                result = a[sortField] < b[sortField] ? 1 : -1;
            }
            return result;
        };
    };
    SortingService.prototype.sortNumberComparator = function (sortField, sortDirection) {
        return function (a, b) { return sortDirection === enums_js_1.SortDirection.ASCENDING ? a[sortField] - b[sortField] : b[sortField] - a[sortField]; };
    };
    SortingService.prototype.sortDateComperator = function (sortField, sortDirection) {
        return function (a, b) {
            var c = new Date(a[sortField]);
            var d = new Date(b[sortField]);
            if (sortDirection === "ascending") {
                return c - d;
            }
            else {
                return d - c;
            }
        };
    };
    return SortingService;
}());
exports.SortingService = SortingService;
console.log(sortModel_js_1.MySortingSection);
