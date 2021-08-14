const addressSection = document.querySelector("#address-section");
let allAddressSectionElements;
let addressSummaryElements;
    
function createReferenceElement() {
    const dataRow = document.createElement("tr");
    dataRow.classList.add("row0");
    const idData = document.createElement("td");
    idData.classList.add("id-data");
    const genderData = document.createElement("td");
    genderData.classList.add("gender-data");
    const firstNameData = document.createElement("td");
    firstNameData.classList.add("first-name-data");
    const lastNameData = document.createElement("td");
    lastNameData.classList.add("last-name-data");
    const birthDateData = document.createElement("td");
    birthDateData.classList.add("birth-date-data");
    const ageData = document.createElement("td");
    ageData.classList.add("age-data");
    const emailData = document.createElement("td");
    emailData.classList.add("id-data");
    const addressSummaryData = document.createElement("td");
    addressSummaryData.setAttribute("data-address-section-closed", "true");
    addressSummaryData.classList.add("address-summary-data");
    const countryData = document.createElement("td");
    countryData.setAttribute("data-address-section-expanded", "false");
    countryData.classList.add("country-data");
    const stateData = document.createElement("td");
    stateData.setAttribute("data-address-section-expanded", "false");
    stateData.classList.add("state-data");
    const cityData = document.createElement("td");
    cityData.setAttribute("data-address-section-expanded", "false");
    cityData.classList.add("city-data");
    const streetData = document.createElement("td");
    streetData.setAttribute("data-address-section-expanded", "false");
    streetData.classList.add("street-data");
    const houseNumberData = document.createElement("td");
    houseNumberData.setAttribute("data-address-section-expanded", "false");
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

function addAllDataAtOnce(fetchedData, dataReferenceElement) {
    const allPersonsElements = document.createDocumentFragment();
    fetchedData.forEach(person =>{
        const personElement = dataReferenceElement.cloneNode(true);
        addDataToElement(personElement, person);
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


fetch("https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/personData/persons-data-0.json").then(async (response) => {
    const data = await response.json();
    addAllDataAtOnce(data, createReferenceElement());
});

addressSection.addEventListener("click", () => {
    const addressSectionElementsStateChange = addressSection.getAttribute("data-address-section-expanded") === "false" ? true : false;
    const addressSummaryElementState = !addressSectionElementsStateChange;
    allAddressSectionElements.forEach(addressElement => addressElement.setAttribute("data-address-section-expanded", addressSectionElementsStateChange.toString()));
    addressSummaryElements.forEach(element => element.setAttribute("data-address-section-closed", addressSummaryElementState.toString()));

})

const sortAddingButton = document.querySelector(".sort-adding-button");
sortAddingButton.addEventListener("click", () => {
    const submitButtons = document.querySelector(".submit-buttons");
    const sorting = document.querySelector(".sorting");
    const sortOptions = document.querySelector(".sort-options");
    const sortOptionsCloned = sortOptions.cloneNode(true);
    sortOptionsCloned.classList = "sort-options-cloned";
    sorting.insertBefore(sortOptionsCloned, submitButtons);
    const additionSymbol = document.createElement("p");
    additionSymbol.innerText = "+";
    additionSymbol.classList = "addition-symbol";
    sorting.insertBefore(additionSymbol, sortOptionsCloned);
})

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", () => {
    let allSortOptionsCloned = document.querySelectorAll(".sort-options-cloned");
    allSortOptionsCloned.forEach(element => element.remove());
    let allAdditionSymbols = document.querySelectorAll(".addition-symbol");
    allAdditionSymbols.forEach(element => element.remove());
    let sortFields = document.querySelector(".sort-fields");
    sortFields.selectedIndex = 0;
    let sortDirections = document.querySelector(".sort-directions");
    sortDirections.selectedIndex = 0;
})

const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", () => {
    const sorting = document.querySelector(".sorting");
    sorting.classList.add("sort-hidden");
})
