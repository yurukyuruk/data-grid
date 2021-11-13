"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.config = exports.sortingService = void 0;
var sortModel_js_1 = require("./sortModel.js");
var columnHider_js_1 = require("./columnHider.js");
var sortingService_js_1 = require("./sortingService.js");
var configService_js_1 = require("./configService.js");
var allAddressSectionElements;
var addressSummaryElements;
var dataRows = document.querySelector(".data-rows");
var addressHeader = document.querySelector("#address-section");
function createReferenceElement() {
    var dataRow = document.createElement("tr");
    dataRow.classList.add("row0");
    dataRow.classList.add("data-row");
    for (var i = 0; i < exports.config.getHtmlClassNamesOfColumns().length; i++) {
        var dataCell = document.createElement("td");
        dataCell.classList.add(exports.config.getHtmlClassNamesOfColumns()[i] + "-data");
        dataCell.setAttribute("data-column-checkbox-checked", "true");
        if (i === exports.config.getHtmlClassNamesOfColumns().length - 1) {
            dataCell.setAttribute("data-address-section-closed", "true");
            dataCell.setAttribute("data-address-section-closed", "true");
        }
        dataRow.append(dataCell);
    }
    exports.config.getHtmlClassNamesOfAllChildColumns().forEach(function (htmlClassNamesOfChildColumn) {
        for (var i = 0; i < htmlClassNamesOfChildColumn.length; i++) {
            var childDataCell = document.createElement("td");
            childDataCell.setAttribute("data-address-section-expanded", "false");
            childDataCell.setAttribute("data-column-checkbox-checked", "true");
            childDataCell.classList.add(htmlClassNamesOfChildColumn[i] + "-data");
            dataRow.appendChild(childDataCell);
        }
    });
    return dataRow;
}
function addDataToElement(element, eachPerson) {
    element.children[0].textContent = eachPerson.id;
    element.children[1].textContent = eachPerson.gender;
    element.children[2].textContent = eachPerson.firstName;
    element.children[3].textContent = eachPerson.lastName;
    element.children[4].textContent = eachPerson.birthDate;
    element.children[5].textContent = eachPerson.age.toString();
    element.children[6].textContent = eachPerson.email;
    element.children[7].textContent = eachPerson.address.city + ", " + eachPerson.address.street + ", " + eachPerson.address.houseNumber;
    element.children[8].textContent = eachPerson.address.country;
    element.children[9].textContent = eachPerson.address.state;
    element.children[10].textContent = eachPerson.address.city;
    element.children[11].textContent = eachPerson.address.street;
    element.children[12].textContent = eachPerson.address.houseNumber.toString();
}
function addClassName(newNumber) {
    return "row" + newNumber + " data-row";
}
var n = -1;
var allPersonsElements;
function addAllDataAtOnce(fetchedData, dataReferenceElement) {
    allPersonsElements = document.createDocumentFragment();
    fetchedData.forEach(function (person) {
        n += 1;
        var personElement = dataReferenceElement.cloneNode(true);
        addDataToElement(personElement, person);
        personElement.className = addClassName(n);
        allPersonsElements.append(personElement);
        if (fetchedData.indexOf(person) % 2 !== 0) {
            personElement.classList.add("colored-row");
        }
    });
    var dataRows = document.querySelector(".data-rows");
    dataRows.append(allPersonsElements);
    allAddressSectionElements = document.querySelectorAll("[data-address-section-expanded]");
    addressSummaryElements = document.querySelectorAll("[data-address-section-closed]");
}
var data;
var sortModel = document.querySelector(sortModel_js_1.MySortingSection.TAG);
fetch("https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/personData/persons-data-0.json").then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, response.json()];
            case 1:
                data = _a.sent();
                exports.sortingService = new sortingService_js_1.SortingService(data);
                addAllDataAtOnce(data, createReferenceElement());
                return [2 /*return*/];
        }
    });
}); }).then(function () {
    var _a;
    if (localStorage.getItem("sortInformation") !== null) {
        dataRows.innerHTML = "";
        var sortedData = exports.sortingService.sortData(exports.config.setSortInformation(JSON.parse((_a = localStorage.getItem("sortInformation")) !== null && _a !== void 0 ? _a : "[]")));
        addAllDataAtOnce(sortedData, createReferenceElement());
    }
}); /*.then(() => {
    const previousAddressSummaryElementState: string = JSON.parse(localStorage.getItem("addressColumnVisibilityStatus") ?? "");
    let previousAddressSectionElementsState: string;
    if(previousAddressSummaryElementState === "false") {
        previousAddressSectionElementsState = "true";
    } else {
        previousAddressSectionElementsState = "false";
    }
    allAddressSectionElements.forEach(addressElement => addressElement.setAttribute("data-address-section-expanded", previousAddressSectionElementsState));
    addressSummaryElements.forEach(element => element.setAttribute("data-address-section-closed", previousAddressSummaryElementState));
}).then(() => {
    let columnsVisibility: string[] = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "[]");
    
        for(let i = 0; i <  config.getHtmlClassNamesOfColumns().length; i++) {
            let eachDataColumnGroup: NodeListOf<Element> = document.querySelectorAll("." + config.getHtmlClassNamesOfColumns()[i] + "-data");
            eachDataColumnGroup.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[i]));
        }
        for(let i = 0; i < config.getAddressColumnHtmlClassNames().length; i++) {
            let eachAddressDataColumnHeader: HTMLTableCellElement = document.querySelector("." + config.getAddressColumnHtmlClassNames()[i] + "-header") as HTMLTableCellElement;
            eachAddressDataColumnHeader.setAttribute("data-column-checkbox-checked", columnsVisibility[columnsVisibility.length - 1]);
        }
        for(let i = 0; i < config.getAddressColumnHtmlClassNames().length; i++) {
            let eachAddressColumnDataGroup: NodeListOf<Element> = document.querySelectorAll("." + config.getAddressColumnHtmlClassNames()[i] + "-data");
            eachAddressColumnDataGroup.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[columnsVisibility.length - 1]));
        }
    
})*/
exports.config = new configService_js_1.ConfigService();
sortModel.addEventListener("to-sort", function () {
    dataRows.innerHTML = "";
    addAllDataAtOnce(exports.sortingService.data, createReferenceElement());
});
addressHeader.addEventListener("click", function () {
    exports.config.saveAddressColumnVisibilityStatus(addressHeader);
    var addressSectionElementsStateChange = addressHeader.getAttribute("data-address-section-expanded") === "false" ? true : false;
    var addressSummaryElementState = !addressSectionElementsStateChange;
    allAddressSectionElements.forEach(function (addressElement) { return addressElement.setAttribute("data-address-section-expanded", addressSectionElementsStateChange.toString()); });
    addressSummaryElements.forEach(function (element) { return element.setAttribute("data-address-section-closed", addressSummaryElementState.toString()); });
});
console.log(columnHider_js_1.ColumnHider);
