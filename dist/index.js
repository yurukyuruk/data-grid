import { config } from "./configExport.js";
import { ColumnHider } from "./columnHider.js";
import { SortingService } from "./sortingService.js";
import { MySortingSection } from "./sortModel.js";
let allAddressSectionElements;
let addressSummaryElements;
const dataRows = document.querySelector(".data-rows");
const addressHeader = document.querySelector("#address-header");
function createReferenceElement() {
    const dataRow = document.createElement("tr");
    dataRow.classList.add("row0");
    dataRow.classList.add("data-row");
    for (let i = 0; i < config.getHtmlClassNamesOfColumns().length; i++) {
        const dataCell = document.createElement("td");
        dataCell.classList.add(config.getHtmlClassNamesOfColumns()[i] + "-data");
        dataCell.setAttribute("data-column-checkbox-checked", "true");
        /*if(config.checkIfColumnHasChild(config.getHtmlClassNamesOfColumns()[i])) {
            dataCell.setAttribute("data-address-section-closed", "true");
        }*/
        dataRow.append(dataCell);
    }
    config.getHtmlClassNamesOfAllChildColumns().forEach(htmlClassNamesOfChildColumn => {
        for (let i = 0; i < htmlClassNamesOfChildColumn.length; i++) {
            const childDataCell = document.createElement("td");
            childDataCell.setAttribute("data-address-section-expanded", "false");
            childDataCell.setAttribute("data-column-checkbox-checked", "true");
            childDataCell.classList.add(htmlClassNamesOfChildColumn[i] + "-data");
            dataRow.appendChild(childDataCell);
        }
    });
    return dataRow;
}
function addDataToElement(element, eachPerson) {
    for (let i = 0; i < config.columns.length; i++) {
        element.children[i].textContent = eachPerson[config.columns[i].id];
    }
}
function addClassName(newNumber) {
    return `row${newNumber} data-row`;
}
let n = -1;
let allPersonsElements;
function addAllDataAtOnce(fetchedData, dataReferenceElement) {
    allPersonsElements = document.createDocumentFragment();
    fetchedData.forEach(person => {
        n += 1;
        let personElement = dataReferenceElement.cloneNode(true);
        addDataToElement(personElement, person);
        personElement.className = addClassName(n);
        allPersonsElements.append(personElement);
        if (fetchedData.indexOf(person) % 2 !== 0) {
            personElement.classList.add("colored-row");
        } //aynı anda id ekle
    });
    const dataRows = document.querySelector(".data-rows");
    dataRows.append(allPersonsElements);
    allAddressSectionElements = document.querySelectorAll("[data-address-section-expanded]");
    addressSummaryElements = document.querySelectorAll("[data-address-section-closed]");
}
let data;
export let sortingService;
export const sortModel = document.querySelector(MySortingSection.TAG);
export function fetchRowDatas() {
    fetch(config.data.dataUrl).then(async (response) => {
        data = await response.json();
        sortingService = new SortingService(data);
        addAllDataAtOnce(data, createReferenceElement());
    }).then(() => {
        if (localStorage.getItem("sortInformation") !== null) {
            dataRows.innerHTML = "";
            let sortedData = sortingService.sortData(JSON.parse(localStorage.getItem("sortInformation") ?? "[]"));
            addAllDataAtOnce(sortedData, createReferenceElement());
        }
    });
}
/*.then(() => {
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
sortModel.addEventListener("to-sort", () => {
    dataRows.innerHTML = "";
    addAllDataAtOnce(sortingService.data, createReferenceElement());
});
addressHeader.addEventListener("click", () => {
    config.saveAddressColumnVisibilityStatus(addressHeader);
    const addressSectionElementsStateChange = addressHeader.getAttribute("data-address-section-expanded") === "false" ? true : false;
    const addressSummaryElementState = !addressSectionElementsStateChange;
    allAddressSectionElements.forEach(addressElement => addressElement.setAttribute("data-address-section-expanded", addressSectionElementsStateChange.toString()));
    addressSummaryElements.forEach(element => element.setAttribute("data-address-section-closed", addressSummaryElementState.toString()));
});
console.log(ColumnHider);
//# sourceMappingURL=index.js.map