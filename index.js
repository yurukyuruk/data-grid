import {MySortingSection} from "./sortModel.js";
import {ColumnHider} from "./columnHider.js";
import {SortingService} from "./sortingService.js";
import { ConfigService } from "./configService.js";
const addressSection = document.querySelector("#address-section");
let allAddressSectionElements;
let addressSummaryElements;
const dataRows = document.querySelector(".data-rows");

function createReferenceElement() {
    const dataRow = document.createElement("tr");
    dataRow.classList.add("row0");
    dataRow.classList.add("data-row");
    const idData = document.createElement("td");
    idData.classList.add("id-data");
    idData.setAttribute("data-column-checkbox-checked", "true");
    const genderData = document.createElement("td");
    genderData.classList.add("gender-data");
    genderData.setAttribute("data-column-checkbox-checked", "true");
    const firstNameData = document.createElement("td");
    firstNameData.classList.add("first-name-data");
    firstNameData.setAttribute("data-column-checkbox-checked", "true");
    const lastNameData = document.createElement("td");
    lastNameData.classList.add("last-name-data");
    lastNameData.setAttribute("data-column-checkbox-checked", "true");
    const birthDateData = document.createElement("td");
    birthDateData.classList.add("birth-date-data");
    birthDateData.setAttribute("data-column-checkbox-checked", "true");
    const ageData = document.createElement("td");
    ageData.classList.add("age-data");
    ageData.setAttribute("data-column-checkbox-checked", "true");
    const emailData = document.createElement("td");
    emailData.classList.add("email-data");
    emailData.setAttribute("data-column-checkbox-checked", "true");
    const addressSummaryData = document.createElement("td");
    addressSummaryData.setAttribute("data-address-section-closed", "true");
    addressSummaryData.setAttribute("data-column-checkbox-checked", "true");
    addressSummaryData.classList.add("address-summary-data");
    const countryData = document.createElement("td");
    countryData.setAttribute("data-address-section-expanded", "false");
    addressSummaryData.setAttribute("data-column-checkbox-checked", "true");
    countryData.classList.add("country-data");
    const stateData = document.createElement("td");
    stateData.setAttribute("data-address-section-expanded", "false");
    addressSummaryData.setAttribute("data-column-checkbox-checked", "true");
    stateData.classList.add("state-data");
    const cityData = document.createElement("td");
    cityData.setAttribute("data-address-section-expanded", "false");
    addressSummaryData.setAttribute("data-column-checkbox-checked", "true");
    cityData.classList.add("city-data");
    const streetData = document.createElement("td");
    streetData.setAttribute("data-address-section-expanded", "false");
    addressSummaryData.setAttribute("data-column-checkbox-checked", "true");
    streetData.classList.add("street-data");
    const houseNumberData = document.createElement("td");
    houseNumberData.setAttribute("data-address-section-expanded", "false");
    addressSummaryData.setAttribute("data-column-checkbox-checked", "true");
    houseNumberData.classList.add("house-number-data");
    dataRow.append(idData, genderData, firstNameData, lastNameData, birthDateData, ageData, emailData, addressSummaryData, countryData, stateData, cityData, streetData, houseNumberData);
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
    let columnsVisibility = JSON.parse(localStorage.getItem("columnVisibilityInformation"));
    if(columnsVisibility !== null) {
        let allIdRow = document.querySelectorAll(".id-data");
        let allGenderRow = document.querySelectorAll(".gender-data");        
        let allFirstNameRow = document.querySelectorAll(".first-name-data");        
        let allLastNameRow = document.querySelectorAll(".last-name-data");
        let allBirthDateRow = document.querySelectorAll(".birth-date-data");
        let allAgeRow = document.querySelectorAll(".age-data");
        let allEmailRow = document.querySelectorAll(".email-data");
        let addressRowHeader = document.querySelector(".address-data");
        let countryRowHeader = document.querySelector(".country-header");
        let stateRowHeader = document.querySelector(".state-header");
        let cityRowHeader = document.querySelector(".city-header");
        let streetRowHeader = document.querySelector(".street-header");
        let houseNumberRowHeader = document.querySelector(".street-header");
        let allAddressSummaryRow = document.querySelectorAll(".address-summary-data");
        let allCountryData = document.querySelectorAll("country-data");
        let allStateData = document.querySelectorAll("state-data");
        let allCityData = document.querySelectorAll("city-data");
        let allStreetData = document.querySelectorAll("street-data");
        let allHouseNumberData = document.querySelectorAll("house-number-data");
            allIdRow.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[0]));
            allGenderRow.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[1]));
            allFirstNameRow.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[2]));
            allLastNameRow.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[3]));
            allBirthDateRow.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[4]));
            allAgeRow.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[5]));
            allEmailRow.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[6]));
            addressRowHeader.setAttribute("data-column-checkbox-checked", columnsVisibility[7]);
            countryRowHeader.setAttribute("data-column-checkbox-checked", columnsVisibility[7]);
            stateRowHeader.setAttribute("data-column-checkbox-checked", columnsVisibility[7]);
            cityRowHeader.setAttribute("data-column-checkbox-checked", columnsVisibility[7]);
            streetRowHeader.setAttribute("data-column-checkbox-checked", columnsVisibility[7]);
            houseNumberRowHeader.setAttribute("data-column-checkbox-checked", columnsVisibility[7]);
            allAddressSummaryRow.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[7]));
            allCountryData.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[7]));
            allStateData.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[7]));
            allCityData.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[7]));
            allStreetData.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[7]));
            allHouseNumberData.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[7]));
    }
})

sortModel.addEventListener("to-sort", (e) => {
    dataRows.innerHTML = "";
    addAllDataAtOnce(sortingService.data, createReferenceElement());
})
addressSection.addEventListener("click", () => {
    const addressSectionElementsStateChange = addressSection.getAttribute("data-address-section-expanded") === "false" ? true : false;
    const addressSummaryElementState = !addressSectionElementsStateChange;
    allAddressSectionElements.forEach(addressElement => addressElement.setAttribute("data-address-section-expanded", addressSectionElementsStateChange.toString()));
    addressSummaryElements.forEach(element => element.setAttribute("data-address-section-closed", addressSummaryElementState.toString()));
    
})
export let config = new ConfigService();
config.setcolumnNames(["id", "gender", "firstName", "lastName", "birthDate", "age", "email", "address"]);
config.setColumnDisplayNames(["id", "gender", "first name", "last name", "birth date", "age", "e-mail", "address"]);


