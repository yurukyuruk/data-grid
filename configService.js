"use strict";
exports.__esModule = true;
exports.ConfigService = void 0;
var SortingRule_js_1 = require("./SortingRule.js");
var columnHider_js_1 = require("./columnHider.js");
var ConfigService = /** @class */ (function () {
    function ConfigService() {
        this.columns = [
            {
                id: "id",
                displayName: "id",
                htmlClassName: "id",
                type: "string"
            },
            {
                id: "gender",
                displayName: "gender",
                htmlClassName: "gender",
                type: "string"
            },
            {
                id: "firstName",
                displayName: "first name",
                htmlClassName: "first-name",
                type: "string"
            },
            {
                id: "lastName",
                displayName: "last name",
                htmlClassName: "last-name",
                type: "string"
            },
            {
                id: "birthDate",
                displayName: "birth date",
                htmlClassName: "birth-date",
                type: "date"
            },
            {
                id: "age",
                displayName: "age",
                htmlClassName: "age",
                type: "number"
            },
            {
                id: "email",
                displayName: "e-mail",
                htmlClassName: "email",
                type: "string"
            },
            {
                id: "address",
                displayName: "address",
                htmlClassName: "address",
                type: "string",
                children: [
                    {
                        id: "country",
                        displayName: "country",
                        htmlClassName: "country",
                        type: "string"
                    },
                    {
                        id: "state",
                        displayName: "state",
                        htmlClassName: "state",
                        type: "string"
                    },
                    {
                        id: "city",
                        displayName: "city",
                        htmlClassName: "city",
                        type: "string"
                    },
                    {
                        id: "street",
                        displayName: "street",
                        htmlClassName: "street",
                        type: "string"
                    },
                    {
                        id: "houseNumber",
                        displayName: "house number",
                        htmlClassName: "house-number",
                        type: "number"
                    }
                ]
            }
        ];
    }
    ConfigService.prototype.getHtmlClassNamesOfColumns = function () {
        var htmlClassNamesOfColumns = [];
        this.columns.forEach(function (column) {
            var currentColumn = column;
            if (currentColumn) {
                htmlClassNamesOfColumns.push(currentColumn.htmlClassName);
            }
        });
        return htmlClassNamesOfColumns;
    };
    ConfigService.prototype.getColumnIdFromColumnDisplayName = function (columnName) {
        var column = this.columns.find(function (column) { return column.displayName === columnName; });
        if (column) {
            return column.id;
        }
    };
    ConfigService.prototype.getColumnTypeFromColumnDisplayName = function (columnName) {
        var column = this.columns.find(function (column) { return column.displayName === columnName; });
        if (column) {
            return column.type;
        }
    };
    ConfigService.prototype.getColumnsWhichHaveChilderenColumns = function () {
        return this.columns.filter(function (column) { return column.children !== undefined; });
    };
    ConfigService.prototype.getHtmlClassNamesOfAllChildColumns = function () {
        var htmlClassNamesOfAllChildColumns = [];
        this.getColumnsWhichHaveChilderenColumns().forEach(function (column) {
            var htmlClassNames = [];
            column.children.forEach(function (childColumn) {
                htmlClassNames.push(childColumn.htmlClassName);
            });
            htmlClassNamesOfAllChildColumns.push(htmlClassNames);
        });
        debugger;
        return htmlClassNamesOfAllChildColumns;
    };
    ConfigService.prototype.saveColumnVisibilityStatus = function (allColumnCheckboxes) {
        var columnsVisibilityStatus = [];
        allColumnCheckboxes.forEach(function (columnCheckbox) {
            var _a;
            columnsVisibilityStatus.push((_a = columnCheckbox.getAttribute("data-column-checkbox-checked")) !== null && _a !== void 0 ? _a : "");
        });
        localStorage.setItem("columnVisibilityInformation", JSON.stringify(columnsVisibilityStatus)); //save them with column names
        return columnsVisibilityStatus;
    };
    ConfigService.prototype.saveAddressColumnVisibilityStatus = function (addressHeader) {
        localStorage.setItem("addressColumnVisibilityStatus", JSON.stringify(addressHeader.getAttribute("data-address-section-expanded")));
    };
    ConfigService.prototype.saveSortInformation = function (sortOptions) {
        localStorage.setItem("sortInformation", JSON.stringify(this.getSortOptions(sortOptions)));
    };
    ConfigService.prototype.getSortOptions = function (sortOptions) {
        return sortOptions.map(function (option) {
            return {
                field: option.fieldOption,
                direction: option.directionOption
            };
        });
    };
    ConfigService.prototype.setSortInformation = function (sortOptionsList) {
        var _this = this;
        sortOptionsList.forEach(function (sortOptions) {
            var _a;
            sortOptions.type = (_a = _this.columns.get(sortOptions.field)) === null || _a === void 0 ? void 0 : _a.type;
        });
        return sortOptionsList;
    };
    ConfigService.prototype.clearSortInformation = function () {
        localStorage.removeItem("sortInformation");
    };
    ConfigService.prototype.clearColumnVisibilityInformation = function () {
        localStorage.removeItem("columnVisibilityInformation");
    };
    return ConfigService;
}());
exports.ConfigService = ConfigService;
console.log(SortingRule_js_1.SortingRule);
console.log(columnHider_js_1.ColumnHider);
//save sortinformation and evetryting about local storage and as a field in here.
//solve storing map in local storage.
//get rid type methods in sort modal
//take care of local storage. operations connected with local storage should go through here.
//get rid of apply button in columnhider
