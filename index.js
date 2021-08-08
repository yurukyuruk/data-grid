const addressSection = document.querySelector("#address-section");
let allAddressSectionElements = document.querySelectorAll("[data-address-section-expanded]");
let addressSummaryElements = document.querySelectorAll("[data-address-section-closed]");
        
function createReferenceElement() {
    let dataRow = document.createElement("tr");
    dataRow.classList.add("row0");
    let idData = document.createElement("td");
    idData.classList.add("id-data");
    let genderData = document.createElement("td");
    genderData.classList.add("gender-data");
    let firstNameData = document.createElement("td");
    firstNameData.classList.add("first-name-data");
    let lastNameData = document.createElement("td");
    lastNameData.classList.add("last-name-data");
    let birthDateData = document.createElement("td");
    birthDateData.classList.add("birth-date-data");
    let ageData = document.createElement("td");
    ageData.classList.add("age-data");
    let emailData = document.createElement("td");
    emailData.classList.add("id-data");
    let addressSummaryData = document.createElement("td");
    addressSummaryData.setAttribute("data-address-section-closed", "true");
    addressSummaryData.classList.add("address-summary-data");
    let countryData = document.createElement("td");
    countryData.setAttribute("data-address-section-expanded", "false");
    countryData.classList.add("country-data");
    let stateData = document.createElement("td");
    stateData.setAttribute("data-address-section-expanded", "false");
    stateData.classList.add("state-data");
    let cityData = document.createElement("td");
    cityData.setAttribute("data-address-section-expanded", "false");
    cityData.classList.add("city-data");
    let streetData = document.createElement("td");
    streetData.setAttribute("data-address-section-expanded", "false");
    streetData.classList.add("street-data");
    let houseNumberData = document.createElement("td");
    houseNumberData.setAttribute("data-address-section-expanded", "false");
    houseNumberData.classList.add("house-number-data");
    let dataRows = document.querySelector(".data-rows");
    dataRows.append(dataRow);
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
    element.children[7].textContent = eachPerson.city + eachPerson.street + eachPerson.houseNumber;
    element.children[8].textContent = eachPerson.country;
    element.children[9].textContent = eachPerson.state;
    element.children[10].textContent = eachPerson.city;
    element.children[11].textContent = eachPerson.street;
    element.children[12].textContent = eachPerson.houseNumber;
}

function addAllDataAtOnce(fetchedData, dataReferenceElement) {
    const allPersonsElements = document.createDocumentFragment();
    fetchedData.forEach(person =>{
        const personElement = dataReferenceElement.cloneNode(true);
        addDataToElement(personElement, person);
        allPersonsElements.append(personElement);
        if(fetchedData.indexOf(person) % 2 !== 0) {
            personElement.style.backgroundColor = "rgb(253, 206, 184)";
        }
    });
    const dataRows = document.querySelector(".data-rows");
    dataRows.append(allPersonsElements); 
}

const referenceElement = createReferenceElement();
fetch("https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/personData/persons-data-0.json").then(async (response) => {
    const data = await response.json();
    addAllDataAtOnce(data, referenceElement);
});

addressSection.addEventListener("click", () => {
    const addressSectionElementsStateChange = addressSection.getAttribute("data-address-section-expanded") === "false" ? true : false;
    const addressSummaryElementState = !addressSectionElementsStateChange;
    allAddressSectionElements.forEach(addressElement => addressElement.setAttribute("data-address-section-expanded", addressSectionElementsStateChange.toString()));
    addressSummaryElements.forEach(element => element.setAttribute("data-address-section-closed", addressSummaryElementState.toString()));

})









/*
const addressSection = document.querySelector("#address-section");
let allAddressSectionElements;
let addressSummaryElements;
window.addEventListener("load", getApi);
function getApi() {
    fetch("https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/personData/persons-data-0.json").then(response => response.json()).then(users => {
        let dataRows = document.querySelector(".data-rows");
        let dataRow = document.querySelector(".row0");
        let n = 0;
        users.forEach(user => {
            n += 1;
            let newDataRow = dataRow.cloneNode(true);
            let newClassName = changeClassName(n);
            newDataRow.className = newClassName;
            dataRows.appendChild(newDataRow);
            newDataRow.querySelector(`.${newClassName} .id-data`).innerHTML = user.id;
            newDataRow.querySelector(`.${newClassName} .gender-data`).innerHTML = user.gender;
            newDataRow.querySelector(`.${newClassName} .first-name-data`).innerHTML = user.firstName;
            newDataRow.querySelector(`.${newClassName} .last-name-data`).innerHTML = user.lastName;
            newDataRow.querySelector(`.${newClassName} .birth-date-data`).innerHTML = user.birthDate;
            newDataRow.querySelector(`.${newClassName} .age-data`).innerHTML = `${user.age}`;
            newDataRow.querySelector(`.${newClassName} .email-data`).innerHTML = user.email;
            newDataRow.querySelector(`.${newClassName} .address-summary-data`).innerHTML = `${user.address.city} ${user.address.street} ${user.address.houseNumber}`;
            newDataRow.querySelector(`.${newClassName} .country-data`).innerHTML = user.address.country;
            newDataRow.querySelector(`.${newClassName} .state-data`).innerHTML = user.address.state;
            newDataRow.querySelector(`.${newClassName} .city-data`).innerHTML = user.address.city;
            newDataRow.querySelector(`.${newClassName} .street-data`).innerHTML = user.address.street;
            newDataRow.querySelector(`.${newClassName} .house-number-data`).innerHTML = `${user.address.houseNumber}`;
            if(users.indexOf(user) % 2 !== 0) {
                newDataRow.style.backgroundColor = "rgb(253, 206, 184)";
            }
        })
        allAddressSectionElements = document.querySelectorAll("[data-address-section-expanded]");
        addressSummaryElements = document.querySelectorAll("[data-address-section-closed]");
    })
}
function changeClassName(newNumber) {
    return `row${newNumber}`;
}
addressSection.addEventListener("click", () => {
    const addressSectionElementsStateChange = addressSection.getAttribute("data-address-section-expanded") === "false" ? true : false;
    const addressSummaryElementState = !addressSectionElementsStateChange;
    allAddressSectionElements.forEach(addressElement => addressElement.setAttribute("data-address-section-expanded", addressSectionElementsStateChange.toString()));
    addressSummaryElements.forEach(element => element.setAttribute("data-address-section-closed", addressSummaryElementState.toString()));

})*/