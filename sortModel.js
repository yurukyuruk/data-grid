"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.MySortingSection = void 0;
var SortingRule_js_1 = require("./SortingRule.js");
var sortingService_js_1 = require("./sortingService.js");
var index_js_1 = require("./index.js");
var configService_js_1 = require("./configService.js");
var template = {
    template: "\n  <style>  \n  .sort-data-button-area {\n    padding: 2.1rem;\n    background-color: rgb(252, 252, 184);\n    display: flex;\n    justify-content: center;\n    margin-right: -1rem;\n  }\n  .sort-data-button {\n    border: 1px solid black;\n    background-color: rgb(235, 144, 101);\n    cursor: pointer;\n    outline: 2px solid white;\n    outline-offset: 1rem;\n    width: 8rem;\n  }\n  .sort-data-button:hover {\n    transform: scale(1.1);\n  }\n  .sorting {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: rgb(252, 252, 184);\n    position: absolute;\n    top: 45%;\n    left: 30%;\n    z-index: 1;\n    max-height: 50vh;\n    border: 2px solid rgb(235, 144, 101);\n  }\n  .sort-lines {\n    display: flex;\n    flex-direction: column;\n  }\n  .sort-field {\n    width: 20vw;\n    border: black 1px solid;\n    text-align-last: center;\n    margin: 5px;\n  }\n  .sort-direction {\n    width: 20vw;\n    border: black 1px solid;\n    text-align-last: center;\n    margin: 5px 5px 5px 1px;\n  }\n  .sort-field, .sort-direction {\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: 0.9rem;\n    text-align: center;\n  }\n  .option-default {\n    display: none;\n  }\n  .close-button {\n    align-self: flex-end;\n    border: black 1px solid;\n    background-color: rgb(235, 144, 101);\n    cursor: pointer;\n    margin: 1px 1px 0 0;\n  }\n  .close-button:hover {\n    background-color: white;\n  }\n\n  .sort-adding-button {\n    align-self: center;\n    padding: 0 2px;\n    margin: 5px;\n    cursor: pointer;\n    background-color: white;\n    border: 1px solid black;\n  }\n  .reset-button {\n    border: black 1px solid;\n    width: 8vw;\n    margin: 5px;\n    margin-bottom: 10px;\n    cursor: pointer;\n    padding-top: 0;\n    padding-bottom: 0;\n    background-color: white;\n  }\n  .submit-button {\n    border: black 1px solid;\n    width: 8vw;\n    margin: 5px;\n    cursor: pointer;\n    margin-bottom: 10px;\n    padding-top: 0;\n    padding-bottom: 0;\n    background-color: white;\n  }\n  .reset-button:hover, .submit-button:hover, .sort-adding-button:hover {\n    background-color: rgb(235, 144, 101);\n  }\n  .sort-data-button, .sort-adding-button, .close-button, .reset-button, .submit-button, .addition-symbol {\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: 0.9rem;\n    text-align: center;\n  }\n  input[data-sort-button-visible=\"false\"] {\n    display: none;\n  }\n  div[data-sort-button-area-visible=\"false\"] {\n    display: none;\n  }\n  section[data-sort-fields-visible=\"false\"] {\n    display: none;\n  }\n</style>\n<div class=\"sort-data-button-area\" data-sort-button-area-visible=\"true\">\n  <input class=\"sort-data-button\" data-sort-button-visible=\"true\" type=\"button\" value=\"SORT DATA\">\n</div>\n<section class=\"sorting\" data-sort-fields-visible=\"false\">\n  <input class=\"close-button\" type=\"button\" value=\"x\">\n  <div class=\"sort-lines\"> \n    <" + SortingRule_js_1.SortingRule.TAG + "></" + SortingRule_js_1.SortingRule.TAG + ">\n  </div>\n  <input class=\"sort-adding-button\" type=\"button\" value=\"+\">\n  <div class=\"submit-buttons\">\n    <input class=\"reset-button\" type=\"reset\" value=\"reset\">\n    <input class=\"submit-button\" type=\"submit\" value=\"apply\">\n  </div>\n</section>        \n  "
}.template;
var MySortingSection = /** @class */ (function (_super) {
    __extends(MySortingSection, _super);
    function MySortingSection() {
        var _this = _super.call(this) || this;
        _this.shadowRoot = _this.attachShadow({ mode: "open" });
        _this.shadowRoot.innerHTML = template;
        _this.getElementReferences();
        _this.setButtons();
        _this.allFields = ["sort by", "id", "gender", "first name", "last name", "birth date", "age", "e-mail", "address"];
        _this.sortOptions = [_this.shadowRoot.querySelector(SortingRule_js_1.SortingRule.TAG)];
        _this.sortOptions[0].setSortByOptions(_this.allFields);
        _this.initializeListeners();
        return _this;
    }
    MySortingSection.prototype.setButtons = function () {
        this.submitButton.disabled = false;
        this.sortAddingButton.disabled = true;
    };
    MySortingSection.prototype.initializeListeners = function () {
        var _this = this;
        this.sortDataButton.addEventListener("click", function () {
            var _a;
            _this.sortDataButtonArea.setAttribute("data-sort-button-area-visible", "false");
            _this.sortDataButton.setAttribute("data-sort-button-visible", "false");
            _this.sortingArea.setAttribute("data-sort-fields-visible", "true");
            _this.table.classList.toggle("blured");
            var sortInformation = JSON.parse((_a = localStorage.getItem("sortInformation")) !== null && _a !== void 0 ? _a : "[]");
            if (sortInformation !== null && sortInformation.length === 1 && sortInformation[0].field !== "sort by") {
                _this.sortOptions[0].fieldOption = sortInformation[0].field;
                _this.sortOptions[0].sortDirection.disabled = false;
                _this.sortOptions[0].directionOption = sortInformation[0].direction;
            }
            else if (sortInformation !== null && sortInformation.length > 1) {
                _this.sortOptions[0].fieldOption = sortInformation[0].field;
                _this.sortOptions[0].sortDirection.disabled = false;
                _this.sortOptions[0].directionOption = sortInformation[0].direction;
                for (var i = 1; i < sortInformation.length; i++) {
                    _this.createNewSortLine();
                    _this.sortOptions[i].fieldOption = sortInformation[i].field;
                    _this.sortOptions[i].sortDirection.disabled = false;
                    _this.sortOptions[i].directionOption = sortInformation[i].direction;
                }
            }
        });
        this.closeButton.addEventListener("click", function () {
            _this.sortDataButtonArea.setAttribute("data-sort-button-area-visible", "true");
            _this.sortDataButton.setAttribute("data-sort-button-visible", "true");
            _this.sortingArea.setAttribute("data-sort-fields-visible", "false");
            _this.table.classList.toggle("blured");
            _this.sortAddingButton.disabled = true;
            _this.submitButton.disabled = true;
            _this.sortLines.innerHTML = "";
            _this.sortOptions = [];
            _this.createNewSortLine();
            _this.sortOptions[0].sortDirection.disabled = true;
        });
        this.resetButton.addEventListener("click", function () {
            _this.sortAddingButton.disabled = true;
            _this.submitButton.disabled = true;
            _this.sortLines.innerHTML = "";
            _this.sortOptions = [];
            _this.createNewSortLine();
            _this.sortOptions[0].sortDirection.disabled = true;
            index_js_1.config.clearSortInformation();
        });
        this.submitButton.addEventListener("click", function () {
            _this.sortAddingButton.disabled = true;
            _this.submitButton.disabled = true;
            index_js_1.sortingService.sortData(index_js_1.config.setSortInformation(index_js_1.config.getSortOptions(_this.sortOptions)));
            var toSort = new CustomEvent("to-sort", {
                bubbles: true,
                composed: true
            });
            _this.shadowRoot.dispatchEvent(toSort);
            index_js_1.config.saveSortInformation(_this.sortOptions);
        });
        this.sortOptions[0].sortLine.addEventListener("change", function () {
            if (_this.sortOptions[0].fieldOption !== "sort by" && _this.sortOptions[0].directionOption !== "sort direction") {
                _this.sortAddingButton.disabled = false;
            }
        });
        this.sortAddingButton.addEventListener("click", function () {
            _this.submitButton.disabled = true;
            _this.sortAddingButton.disabled = true;
            _this.disableLastSortLine();
            _this.getPreviousChosenFields();
            _this.createNewSortLine();
        });
    };
    MySortingSection.prototype.disableLastSortLine = function () {
        this.sortOptions[this.sortOptions.length - 1].disableSelects();
    };
    MySortingSection.prototype.getPreviousChosenFields = function () {
        return this.sortOptions.map(function (option) { return option.fieldOption; });
    };
    MySortingSection.prototype.getRemainingFields = function () {
        var previousChosenField = this.getPreviousChosenFields();
        console.log(this.allFields.filter(function (field) { return !previousChosenField.includes(field); }));
        return this.allFields.filter(function (field) { return !previousChosenField.includes(field); });
    };
    MySortingSection.prototype.canAddNewSortingRule = function () {
        return this.getRemainingFields().length > 1;
    };
    MySortingSection.prototype.createNewSortLine = function () {
        var _this = this;
        var newSortLine = new SortingRule_js_1.SortingRule(this.getRemainingFields());
        this.sortOptions.push(newSortLine);
        newSortLine.addEventListener("is-direction-set", function () {
            _this.submitButton.disabled = false;
            if (_this.canAddNewSortingRule()) {
                _this.sortAddingButton.disabled = false;
            }
        });
        this.sortLines.append(newSortLine);
    };
    MySortingSection.prototype.getElementReferences = function () {
        this.sortingArea = this.shadowRoot.querySelector(".sorting");
        this.sortDataButtonArea = this.shadowRoot.querySelector(".sort-data-button-area");
        this.sortDataButton = this.shadowRoot.querySelector(".sort-data-button");
        this.sortAddingButton = this.shadowRoot.querySelector(".sort-adding-button");
        this.submitButton = this.shadowRoot.querySelector(".submit-button");
        this.resetButton = this.shadowRoot.querySelector(".reset-button");
        this.closeButton = this.shadowRoot.querySelector(".close-button");
        this.table = document.querySelector('#data-table');
        this.sortLines = this.shadowRoot.querySelector(".sort-lines");
    };
    MySortingSection.TAG = "my-sorting-section";
    return MySortingSection;
}(HTMLElement));
exports.MySortingSection = MySortingSection;
customElements.define(MySortingSection.TAG, MySortingSection);
console.log(configService_js_1.ConfigService);
console.log(sortingService_js_1.SortingService);
