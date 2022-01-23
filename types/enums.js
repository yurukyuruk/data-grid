"use strict";
exports.__esModule = true;
exports.ColumnType = exports.SortDirection = void 0;
var SortDirection;
(function (SortDirection) {
    SortDirection[SortDirection.ASC] = SortDirection.ASC;
    SortDirection[SortDirection.DESC] = SortDirection.DESC;
})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
var ColumnType;
(function (ColumnType) {
    ColumnType[ColumnType["NUMBER"] = 0] = "NUMBER";
    ColumnType[ColumnType["STRING"] = 1] = "STRING";
    ColumnType[ColumnType["DATE"] = 2] = "DATE";
})(ColumnType = exports.ColumnType || (exports.ColumnType = {}));
