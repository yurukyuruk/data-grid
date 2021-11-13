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
exports.SortingRule = void 0;
var template = {
    template: "\n    <style>  \n    .sort-field {\n        width: 20vw;\n        border: black 1px solid;\n        text-align-last: center;\n        margin: 5px;\n      }\n      .sort-direction {\n        width: 20vw;\n        border: black 1px solid;\n        text-align-last: center;\n        margin: 5px;\n      }\n      .option-default {\n        display: none;\n      }\n      .sort-field, .sort-direction {\n        font-family: Arial, Helvetica, sans-serif;\n        font-size: 0.9rem;\n        text-align: center;\n      }\n      \n      .sort-line {\n        display:flex;\n      }\n  </style>\n    <div class=\"sort-line\">\n      <select class=\"sort-field\" name=\"fields\">\n      </select>\n      <select class=\"sort-direction\" name=\"direction\">\n        <option class=\"option-default\" value=\"sort direction\" selected>sort direction</option>\n        <option value=\"ascending\">ascending</option>\n        <option value=\"descending\">descending</option>\n      </select>   \n    </div>       \n    "
}.template;
var SortingRule = /** @class */ (function (_super) {
    __extends(SortingRule, _super);
    function SortingRule(sortFields) {
        var _this = _super.call(this) || this;
        _this.shadowRoot = _this.attachShadow({ mode: "open" });
        _this.shadowRoot.innerHTML = template;
        _this.getElementReferences();
        _this.initilizeListeners();
        _this.setSortByOptions(sortFields);
        _this.setButtons();
        return _this;
    }
    Object.defineProperty(SortingRule.prototype, "fieldOption", {
        get: function () {
            return this.sortField.value;
        },
        set: function (value) {
            this.sortField.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SortingRule.prototype, "directionOption", {
        get: function () {
            return this.sortDirection.value;
        },
        set: function (value) {
            this.sortDirection.value = value;
        },
        enumerable: false,
        configurable: true
    });
    SortingRule.prototype.setButtons = function () {
        this.sortDirection.disabled = true;
    };
    SortingRule.prototype.initilizeListeners = function () {
        var _this = this;
        this.sortField.addEventListener("change", function () {
            if (_this.fieldOption !== "sort by") {
                _this.sortDirection.disabled = false;
            }
        });
        this.sortDirection.addEventListener("change", function () {
            var isDirectionSet = new CustomEvent("is-direction-set", {
                bubbles: true,
                composed: true
            });
            _this.shadowRoot.dispatchEvent(isDirectionSet);
        });
    };
    SortingRule.prototype.disableSelects = function () {
        this.sortField.disabled = true;
        this.sortDirection.disabled = true;
    };
    SortingRule.prototype.setSortByOptions = function (sortFields) {
        var _this = this;
        if (sortFields === undefined) {
            return void 0;
        }
        sortFields.forEach(function (item) {
            var fieldOptionElement = document.createElement("option");
            fieldOptionElement.textContent = item;
            fieldOptionElement.value = item;
            if (item === sortFields[0]) {
                fieldOptionElement.className = "option-default";
            }
            _this.sortField.append(fieldOptionElement);
        });
    };
    SortingRule.prototype.getElementReferences = function () {
        this.sortField = this.shadowRoot.querySelector(".sort-field");
        this.sortDirection = this.shadowRoot.querySelector(".sort-direction");
        this.sortLine = this.shadowRoot.querySelector(".sort-line");
    };
    SortingRule.TAG = "sorting-rule";
    return SortingRule;
}(HTMLElement));
exports.SortingRule = SortingRule;
customElements.define(SortingRule.TAG, SortingRule);
