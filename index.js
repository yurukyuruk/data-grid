import {MySortingSection} from "./sortModel.js";
import {ColumnHider} from "./columnHider.js";
import {SortingService} from "./sortingService.js";
import { ConfigService } from "./configService.js";
const addressSection = document.querySelector("#address-section");
let allAddressSectionElements;
let addressSummaryElements;
const dataRows = document.querySelector(".data-rows");
const addressHeader = document.querySelector("#address-section");

function createReferenceElement() {
    const dataRow = document.createElement("tr");
    dataRow.classList.add("row0");
    dataRow.classList.add("data-row"); 
    for(let i = 0; i < config.getColumnHtmlClassNames().length; i++) {
        const dataCell = document.createElement("td");
        dataCell.classList.add(config.getColumnHtmlClassNames()[i] + "-data");
        dataCell.setAttribute("data-column-checkbox-checked", "true");
        if(i === config.getColumnHtmlClassNames().length - 1) {
            dataCell.setAttribute("data-address-section-closed", "true");
            dataCell.setAttribute("data-address-section-closed", "true");
        }
        dataRow.append(dataCell);
    } 
    for(let i = 0; i < config.getAddressColumnHtmlClassNames().length; i++) {
        const addressDataCell = document.createElement("td");
        addressDataCell.setAttribute("data-address-section-expanded", "false");
        addressDataCell.setAttribute("data-column-checkbox-checked", "true");
        addressDataCell.classList.add(config.getAddressColumnHtmlClassNames()[i] + "-data");
        dataRow.appendChild(addressDataCell);
    }
    return dataRow;
}

function addDataToElement(element, eachPerson) {
    element.children[0].textContent = eachPerson.id;
    element.children[1].textContent = eachPerson.gender;
    element.children[2].textContent = eachPerson.firstName;
    element.children[3].textContent = eachPerson.lastName;
    element.children[4].textContent = eachPerson.birthDate;
    element.children[5].textContent = eachPerson.age;
    element.children[6].textContent = eachPerson.email;
    element.children[7].textContent = `${eachPerson.address.city}, ${eachPerson.address.street}, ${eachPerson.address.houseNumber}`;
    element.children[8].textContent = eachPerson.address.country;
    element.children[9].textContent = eachPerson.address.state;
    element.children[10].textContent = eachPerson.address.city;
    element.children[11].textContent = eachPerson.address.street;
    element.children[12].textContent = eachPerson.address.houseNumber;
}


function addClassName(newNumber) {
    return `row${newNumber} data-row`;
}

let n = -1;
let allPersonsElements;
function addAllDataAtOnce(fetchedData, dataReferenceElement) {
    allPersonsElements = document.createDocumentFragment();
    fetchedData.forEach(person =>{
        n += 1;
        let personElement = dataReferenceElement.cloneNode(true);
        
        addDataToElement(personElement, person);
        personElement.className = addClassName(n);
        allPersonsElements.append(personElement);
        if(fetchedData.indexOf(person) % 2 !== 0) {
            personElement.classList.add("colored-row");
        }
    });
    const dataRows = document.querySelector(".data-rows");
    dataRows.append(allPersonsElements); 
    allAddressSectionElements = document.querySelectorAll("[data-address-section-expanded]");
    addressSummaryElements = document.querySelectorAll("[data-address-section-closed]");
}

let data;
export let sortingService;
const sortModel = document.querySelector(MySortingSection.TAG);

fetch("https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/personData/persons-data-0.json").then(async (response) => {
    data = await response.json();
    sortingService = new SortingService(data);
    addAllDataAtOnce(data, createReferenceElement());
}).then(() => {
    if(localStorage.getItem("sortInformation") !== null) {
        dataRows.innerHTML = "";
        let sortedData = sortingService.sortData(config.setSortInformation(JSON.parse(localStorage.getItem("sortInformation"))));
        addAllDataAtOnce(sortedData, createReferenceElement());
    }
}).then(() => {
    const previousAddressSummaryElementState = JSON.parse(localStorage.getItem("addressColumnVisibilityStatus"));
    let previousAddressSectionElementsState;
    if(previousAddressSummaryElementState === "false") {
        previousAddressSectionElementsState = "true";
    } else {
        previousAddressSectionElementsState = "false";
    }
    allAddressSectionElements.forEach(addressElement => addressElement.setAttribute("data-address-section-expanded", previousAddressSectionElementsState));//true
    addressSummaryElements.forEach(element => element.setAttribute("data-address-section-closed", previousAddressSummaryElementState));//false
}).then(() => {
    let columnsVisibility = JSON.parse(localStorage.getItem("columnVisibilityInformation"));
    if(columnsVisibility !== null) {
        for(let i = 0; i <  config.getColumnHtmlClassNames().length; i++) {
            let eachDataColumnGroup = document.querySelectorAll("." + config.getColumnHtmlClassNames()[i] + "-data");
            eachDataColumnGroup.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[i]));
        }
        for(let i = 0; i < config.getAddressColumnHtmlClassNames().length; i++) {
            let eachAddressDataColumnHeader = document.querySelector("." + config.getAddressColumnHtmlClassNames()[i] + "-header");
            eachAddressDataColumnHeader.setAttribute("data-column-checkbox-checked", columnsVisibility[columnsVisibility.length - 1]);
        }
        for(let i = 0; i < config.getAddressColumnHtmlClassNames().length; i++) {
            let eachAddressColumnDataGroup = document.querySelectorAll("." + config.getAddressColumnHtmlClassNames()[i] + "-data");
            eachAddressColumnDataGroup.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[columnsVisibility.length - 1]));
        }
    }
})

export let config = new ConfigService();

sortModel.addEventListener("to-sort", (e) => {
    dataRows.innerHTML = "";
    addAllDataAtOnce(sortingService.data, createReferenceElement());
})
addressSection.addEventListener("click", () => {
    config.saveAddressColumnVisibilityStatus(addressHeader);
    const addressSectionElementsStateChange = addressSection.getAttribute("data-address-section-expanded") === "false" ? true : false;
    const addressSummaryElementState = !addressSectionElementsStateChange;
    allAddressSectionElements.forEach(addressElement => addressElement.setAttribute("data-address-section-expanded", addressSectionElementsStateChange.toString()));
    addressSummaryElements.forEach(element => element.setAttribute("data-address-section-closed", addressSummaryElementState.toString()));
})






