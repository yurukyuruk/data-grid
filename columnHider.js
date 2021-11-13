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
exports.ColumnHider = void 0;
var index_js_1 = require("./index.js");
var template = {
    template: "\n    <style>  \n    .column-hider-button-area {\n        background-color: rgb(252, 252, 184);\n        display: flex;\n        justify-content: center;\n        padding: 2.1rem;\n      }\n      .column-hider-button {\n        border: 1px solid black;\n        background-color: rgb(235, 144, 101);\n        cursor: pointer;\n        outline: 2px solid white;\n        outline-offset: 1rem;   \n        font-family: Arial, Helvetica, sans-serif;\n        font-size: 0.9rem;\n        text-align: center;\n        width: 8rem;\n      }\n      .column-hider-button:hover {\n        transform: scale(1.1);\n      }\n      .column-checkboxes-area {\n        \n        display: flex;\n        flex-direction: column;\n        align-items: flex-end;\n        background-color: rgb(252, 252, 184);\n        position: absolute;\n        top: 45%;\n        left: 30%;\n        z-index: 1;\n        max-width: 35vw;\n        flex-wrap: wrap;\n        border: 2px solid rgb(235, 144, 101);\n      }\n      .column-hider-close-button {\n        align-self: flex-end;\n        border: black 1px solid;\n        background-color: rgb(235, 144, 101);\n        cursor: pointer;\n        margin: 1px 1px 0 0;\n      }\n      .column-hider-close-button:hover {\n        background-color: white;\n      }\n      .column-checkboxes {\n          display: flex;\n          flex-wrap: wrap;\n          justify-content: center;\n      }\n      .column-checkbox {\n        max-width: 200px;\n        min-width: 100px;\n        font-family: Arial, Helvetica, sans-serif;\n        font-size: 0.88rem;\n      }\n      input[type='checkbox']{\n        width: 10px !important;\n        height: 10px !important;\n        margin: 5px;\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        -o-appearance: none;\n        appearance: none;\n        outline: 2px solid rgb(255, 255, 255);\n        font-size: 0.8em;\n        text-align: center;\n        line-height: 1em;\n        background: rgb(252, 252, 184);\n      }\n      \n      input[type='checkbox']:checked:after {\n        content: '\u2714';\n        color: rgb(235, 144, 101);\n      }\n      .id-checkbox:hover, .gender-checkbox:hover, .first-name-checkbox:hover, .last-name-checkbox:hover,\n      .birth-date-checkbox:hover, .age-checkbox:hover, .email-checkbox:hover, .address-checkbox:hover {\n          cursor: pointer;\n      }\n      div[data-column-hider-button-area-visible=\"false\"] {\n        display: none;\n      }\n      div[data-column-checkboxes-area-visible=\"false\"] {\n          display: none;\n      }\n      .reset-apply-buttons {\n          display: flex;\n          align-self: center;\n      }\n    .reset-button {\n        border: black 1px solid;\n        width: 8vw;\n        margin: 5px;\n        margin-bottom: 10px;\n        cursor: pointer;\n        padding-top: 0;\n        padding-bottom: 0;\n        background-color: white;\n        font-family: Arial, Helvetica, sans-serif;\n        font-size: 0.9rem;\n        text-align: center;\n    }\n    .reset-button:hover {\n        background-color: rgb(235, 144, 101);\n    }\n    \n  </style>\n<div class=\"column-hider-button-area\" data-column-hider-button-area-visible=\"true\">\n  <input class=\"column-hider-button\" type=\"button\" value=\"HIDE COLUMN\">\n</div>\n<div class=\"column-checkboxes-area\" data-column-checkboxes-area-visible=\"false\">\n    <div>\n        <input class=\"column-hider-close-button\" type=\"button\" value=\"x\">\n    </div>\n    <div class=\"column-checkboxes\">\n    </div>\n    <div class=\"reset-apply-buttons\">\n        <input class=\"reset-button\" type=\"button\" value=\"reset\">\n    </div>\n</div>\n\n    "
}.template;
var ColumnHider = /** @class */ (function (_super) {
    __extends(ColumnHider, _super);
    function ColumnHider() {
        var _this = _super.call(this) || this;
        _this.shadowRoot = _this.attachShadow({ mode: "open" });
        _this.shadowRoot.innerHTML = template;
        _this.columnHiderButtonArea = _this.shadowRoot.querySelector(".column-hider-button-area");
        _this.columnHiderButton = _this.shadowRoot.querySelector(".column-hider-button");
        _this.columnCheckboxesArea = _this.shadowRoot.querySelector(".column-checkboxes-area");
        _this.columnHiderCloseButton = _this.shadowRoot.querySelector(".column-hider-close-button");
        _this.columnCheckboxes = _this.shadowRoot.querySelector(".column-checkboxes");
        _this.resetButton = _this.shadowRoot.querySelector(".reset-button");
        _this.initilizeListeners();
        return _this;
    }
    ColumnHider.prototype.createAndSetCheckboxes = function (columnNames) {
        var _loop_1 = function (i) {
            var checkboxHolder = document.createElement("div");
            checkboxHolder.classList.add("column-checkbox");
            checkboxHolder.setAttribute("data-column-checkbox-checked", "true");
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.classList.add((columnNames[i] + "-checkbox"));
            checkbox.setAttribute("checked", "checked");
            checkbox.addEventListener("click", function () {
                var wholeColumnData = document.querySelectorAll("." + columnNames[i] + "-data");
                var checkboxElementsStateChange = wholeColumnData[0].getAttribute("data-column-checkbox-checked") === "true" ? false : true;
                wholeColumnData.forEach(function (data) { return data.setAttribute("data-column-checkbox-checked", checkboxElementsStateChange.toString()); });
                checkboxHolder.setAttribute("data-column-checkbox-checked", checkboxElementsStateChange.toString());
                if (i === columnNames.length - 1) {
                    for (var i_1 = 0; i_1 < index_js_1.config.getAddressColumnHtmlClassNames().length; i_1++) {
                        var addressHeader = document.querySelector("." + index_js_1.config.getAddressColumnHtmlClassNames()[i_1] + "-header");
                        var addressCheckboxElementsStateChange = addressHeader.getAttribute("data-column-checkbox-checked") === "false" ? true : false;
                        addressHeader.setAttribute("data-column-checkbox-checked", addressCheckboxElementsStateChange.toString());
                    }
                    var _loop_2 = function (i_2) {
                        var wholeAddressColumnData = document.querySelectorAll("." + index_js_1.config.getAddressColumnHtmlClassNames()[i_2] + "-data");
                        var addressCheckboxElementsStateChange = wholeAddressColumnData[0].getAttribute("data-column-checkbox-checked") === "false" ? true : false;
                        wholeAddressColumnData.forEach(function (data) { return data.setAttribute("data-column-checkbox-checked", addressCheckboxElementsStateChange.toString()); });
                    };
                    for (var i_2 = 0; i_2 < index_js_1.config.getAddressColumnHtmlClassNames().length; i_2++) {
                        _loop_2(i_2);
                    }
                }
            });
            var checkboxLabel = document.createElement("label");
            checkboxLabel.textContent = columnNames[i];
            checkboxHolder.appendChild(checkbox);
            checkboxHolder.appendChild(checkboxLabel);
            this_1.columnCheckboxes.appendChild(checkboxHolder);
        };
        var this_1 = this;
        for (var i = 0; i < columnNames.length; i++) {
            _loop_1(i);
        }
    };
    ColumnHider.prototype.initilizeListeners = function () {
        var _this = this;
        this.columnHiderButton.addEventListener("click", function () {
            var _a;
            _this.createAndSetCheckboxes(index_js_1.config.getColumnHtmlClassNames());
            _this.getElementReferences();
            _this.columnHiderButtonArea.setAttribute("data-column-hider-button-area-visible", "false");
            _this.columnCheckboxesArea.setAttribute("data-column-checkboxes-area-visible", "true");
            var columnVisibilityInformation = JSON.parse((_a = localStorage.getItem("columnVisibilityInformation")) !== null && _a !== void 0 ? _a : "");
            _this.allColumnCheckboxes = _this.shadowRoot.querySelectorAll(".column-checkbox");
            if (localStorage.getItem("columnVisibilityInformation") !== null) {
                for (var i = 0; i < _this.allColumnCheckboxes.length; i++) {
                    _this.allColumnCheckboxes[i].setAttribute("data-column-checkbox-checked", columnVisibilityInformation[i]);
                    if (_this.allColumnCheckboxes[i].getAttribute("data-column-checkbox-checked") === "false") {
                        _this.allColumnCheckboxes[i].firstElementChild.removeAttribute("checked");
                    }
                }
            }
        });
        this.columnHiderCloseButton.addEventListener("click", function () {
            index_js_1.config.saveColumnVisibilityStatus(_this.allColumnCheckboxes);
            _this.columnHiderButtonArea.setAttribute("data-column-hider-button-area-visible", "true");
            _this.columnCheckboxesArea.setAttribute("data-column-checkboxes-area-visible", "false");
            _this.columnCheckboxes.innerHTML = "";
        });
        this.resetButton.addEventListener("click", function () {
            if (_this.allColumnCheckboxes === undefined) {
                return void 0;
            }
            _this.columnCheckboxes.innerHTML = "";
            _this.createAndSetCheckboxes(index_js_1.config.getColumnHtmlClassNames());
            var wholeColumnData = document.querySelectorAll("[data-column-checkbox-checked]");
            wholeColumnData.forEach(function (data) { return data.setAttribute("data-column-checkbox-checked", "true"); });
            _this.allColumnCheckboxes.forEach(function (data) { return data.setAttribute("data-column-checkbox-checked", "true"); });
            index_js_1.config.clearColumnVisibilityInformation();
        });
    };
    ColumnHider.prototype.getElementReferences = function () {
        this.columnCheckboxes = this.shadowRoot.querySelector(".column-checkboxes");
    };
    ColumnHider.TAG = "column-hider";
    return ColumnHider;
}(HTMLElement));
exports.ColumnHider = ColumnHider;
customElements.define(ColumnHider.TAG, ColumnHider);
