import {MySortingSection} from "./sortModel.js";
import {ColumnHider} from "./columnHider.js";
import {SortingService} from "./sortingService.js";
import { ConfigService } from "./configService.js";
import { ColumnRow } from "./types/interfaces.js";

let allAddressSectionElements: NodeListOf<Element>;
let addressSummaryElements: NodeListOf<Element>;
const dataRows = document.querySelector(".data-rows") as HTMLTableSectionElement;
const addressHeader = document.querySelector("#address-header") as HTMLTableCellElement;


function createReferenceElement(): HTMLTableRowElement {
    const dataRow = document.createElement("tr") as HTMLTableRowElement;
    dataRow.classList.add("row0");
    dataRow.classList.add("data-row"); 
    for(let i = 0; i < config.getHtmlClassNamesOfColumns().length; i++) {
        const dataCell = document.createElement("td") as HTMLTableCellElement;
        dataCell.classList.add(config.getHtmlClassNamesOfColumns()[i] + "-data");
        dataCell.setAttribute("data-column-checkbox-checked", "true");
        if(config.checkIfColumnHasChild(config.getHtmlClassNamesOfColumns()[i])) {
            dataCell.setAttribute("data-address-section-closed", "true");
        }
        dataRow.append(dataCell);
    } 
    config.getHtmlClassNamesOfAllChildColumns().forEach(htmlClassNamesOfChildColumn => {
        for(let i = 0; i < htmlClassNamesOfChildColumn.length; i++) {
            const childDataCell = document.createElement("td") as HTMLTableCellElement;
            childDataCell.setAttribute("data-address-section-expanded", "false");
            childDataCell.setAttribute("data-column-checkbox-checked", "true");
            childDataCell.classList.add(htmlClassNamesOfChildColumn[i] + "-data");
            dataRow.appendChild(childDataCell);
        }
    })
    return dataRow;
}

function addDataToElement(element: HTMLTableRowElement, eachPerson: Data) {
    element.children[0].textContent = eachPerson.id;
    element.children[1].textContent = eachPerson.gender;
    element.children[2].textContent = eachPerson.firstName;
    element.children[3].textContent = eachPerson.lastName;
    element.children[4].textContent = eachPerson.birthDate;
    element.children[5].textContent = eachPerson.age.toString();
    element.children[6].textContent = eachPerson.email;
    element.children[7].textContent = `${eachPerson.address.city}, ${eachPerson.address.street}, ${eachPerson.address.houseNumber}`;
    element.children[8].textContent = eachPerson.address.country;
    element.children[9].textContent = eachPerson.address.state;
    element.children[10].textContent = eachPerson.address.city;
    element.children[11].textContent = eachPerson.address.street;
    element.children[12].textContent = eachPerson.address.houseNumber.toString();
}


function addClassName(newNumber: number): string {
    return `row${newNumber} data-row`;
}

let n: number = -1;
let allPersonsElements: DocumentFragment;
function addAllDataAtOnce(fetchedData: ColumnRow[], dataReferenceElement: HTMLTableRowElement) {
    allPersonsElements = document.createDocumentFragment();
    fetchedData.forEach(person =>{
        n += 1;
        let personElement = dataReferenceElement.cloneNode(true) as HTMLTableRowElement;
        
        addDataToElement(personElement, person);
        personElement.className = addClassName(n);
        allPersonsElements.append(personElement);
        if(fetchedData.indexOf(person) % 2 !== 0) {
            personElement.classList.add("colored-row");
        }                                                        //aynı anda id ekle
    });
    const dataRows = document.querySelector(".data-rows") as HTMLTableSectionElement;
    dataRows.append(allPersonsElements); 
    allAddressSectionElements = document.querySelectorAll("[data-address-section-expanded]");
    addressSummaryElements = document.querySelectorAll("[data-address-section-closed]");
}


let data: ColumnRow[];
export let sortingService: SortingService;
const sortModel = document.querySelector(MySortingSection.TAG) as unknown as MySortingSection;

fetch("https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/personData/persons-data-0.json").then(async (response) => {
    data = await response.json();
    sortingService = new SortingService(data);
    addAllDataAtOnce(data, createReferenceElement());
}).then(() => {
    if(localStorage.getItem("sortInformation") !== null) {
        dataRows.innerHTML = "";
        let sortedData: ColumnRow[] = sortingService.sortData(JSON.parse(localStorage.getItem("sortInformation") ?? "[]"));
        addAllDataAtOnce(sortedData, createReferenceElement());
    }
})/*.then(() => {
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

export let config: ConfigService = new ConfigService();

sortModel.addEventListener("to-sort", () => {
    dataRows.innerHTML = "";
    addAllDataAtOnce(sortingService.data, createReferenceElement());
})
addressHeader.addEventListener("click", () => {
    config.saveAddressColumnVisibilityStatus(addressHeader);
    const addressSectionElementsStateChange: boolean = addressHeader.getAttribute("data-address-section-expanded") === "false" ? true : false;
    const addressSummaryElementState: boolean = !addressSectionElementsStateChange;
    allAddressSectionElements.forEach(addressElement => addressElement.setAttribute("data-address-section-expanded", addressSectionElementsStateChange.toString()));
    addressSummaryElements.forEach(element => element.setAttribute("data-address-section-closed", addressSummaryElementState.toString()));
})

console.log(ColumnHider);




