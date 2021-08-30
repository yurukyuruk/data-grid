import {MySortingSection} from "./sort.js";
const addressSection = document.querySelector("#address-section");
let allAddressSectionElements;
let addressSummaryElements;
    
function createReferenceElement() {
    const dataRow = document.createElement("tr");
    dataRow.classList.add("row0");
    dataRow.classList.add("data-row");
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
fetch("https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/personData/persons-data-0.json").then(async (response) => {
    data = await response.json();
    addAllDataAtOnce(data, createReferenceElement());
});

addressSection.addEventListener("click", () => {
    const addressSectionElementsStateChange = addressSection.getAttribute("data-address-section-expanded") === "false" ? true : false;
    const addressSummaryElementState = !addressSectionElementsStateChange;
    allAddressSectionElements.forEach(addressElement => addressElement.setAttribute("data-address-section-expanded", addressSectionElementsStateChange.toString()));
    addressSummaryElements.forEach(element => element.setAttribute("data-address-section-closed", addressSummaryElementState.toString()));

})

/*let submitButton = document.querySelector(".submit-button");
submitButton.disabled = true;
const sortAddingButton = document.querySelector(".sort-adding-button");
sortAddingButton.disabled = true;
const columnCount = document.querySelector(".columns").childElementCount;
const sortOptions1 = document.querySelector(".sort-options-1");
let clickCount = 0;
let sortOptionsList = [sortOptions1];
let selectedSortDirection = document.querySelector(".sort-options-1 .sort-directions");
let selectedSortField = document.querySelector(".sort-options-1 .sort-fields");
selectedSortDirection.disabled = true;
let selectedSortFieldOption;
let selectedSortDirectionOption; */


/*
resetButton.addEventListener("click", () => {
    let allSortOptionsCloned = document.querySelectorAll(".sort-options-cloned");
    allSortOptionsCloned.forEach(element => element.remove());
    let sortFields = document.querySelector(".sort-fields");
    sortFields.selectedIndex = 0;
    let sortDirections = document.querySelector(".sort-directions");
    sortDirections.selectedIndex = 0;
    sortAddingButton.disabled = true;
    submitButton.disabled = true;
    selectedSortDirection.disabled = true;
})*/


/*
let sortDataButton = document.querySelector(".sort-data-button");
let sortingArea = document.querySelector(".sorting");
let sortDataButtonArea = document.querySelector(".sort-data-button-area");
sortDataButton.addEventListener("click", () => {
    sortDataButtonArea.setAttribute("data-sort-button-area-visible", "false");
    sortDataButton.setAttribute("data-sort-button-visible", "false");
    sortingArea.setAttribute("data-sort-fields-visible", "true");
    let allBodyElements = document.body.querySelectorAll('*');
    allBodyElements.forEach(function(element) {
        if(element.classList.contains("not-blured") === false) {
            element.classList.add("blured");
        }
    });
  
})
const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", () => {
    sortDataButtonArea.setAttribute("data-sort-button-area-visible", "true");
    sortDataButton.setAttribute("data-sort-button-visible", "true");
    sortingArea.setAttribute("data-sort-fields-visible", "false");
    buttonResets();
    let allBodyElements = document.body.querySelectorAll('*');
    allBodyElements.forEach(element => element.classList.remove("blured"));
})*/


/*
let currentSelectedOptions = [];
selectedSortField.addEventListener("change", () => {
    selectedSortFieldOption = selectedSortField.options[selectedSortField.selectedIndex].value;
    if(selectedSortFieldOption !== "sort by") {
        selectedSortDirection.disabled = false;
    }
    currentSelectedOptions.push(selectedSortFieldOption);
})

selectedSortDirection.addEventListener("change", () => {
    selectedSortDirectionOption = selectedSortDirection.options[selectedSortDirection.selectedIndex].value;
    if(selectedSortDirectionOption !== "sort direction ") {
        sortAddingButton.disabled = false;
    }
})

let selectInputs = document.querySelector(".sort-options-1");
selectInputs.addEventListener("change", () => {
    selectedSortFieldOption = selectedSortField.options[selectedSortField.selectedIndex].value;
    selectedSortDirectionOption = selectedSortDirection.options[selectedSortDirection.selectedIndex].value;
    if(selectedSortFieldOption !== "sort by" && selectedSortDirectionOption !== "sort direction") {
        submitButton.disabled = false;
    } else{submitButton.disabled = true;
        sortAddingButton.disabled = true;
    };  
})

sortAddingButton.addEventListener("click", () => {
    clickCount += 1;
    submitButton.disabled = true;
    submitButton.disabled = true;
    sortAddingButton.disabled = true;
    const sorting = document.querySelector(".sorting");
    let sortOptionsCloned = sortOptions1.cloneNode(true);
    sortOptionsCloned.classList = "sort-options-cloned";
    sorting.insertBefore(sortOptionsCloned, sortAddingButton);
    sortOptionsList.push(sortOptionsCloned);
    let currentSelectedOption = sortOptionsList[clickCount];
    let selectedSortField = currentSelectedOption.firstElementChild;
    let selectedSortDirection = selectedSortField.nextElementSibling;
    selectedSortDirection.disabled = true;
    if(clickCount > columnCount - 1) {
        sortAddingButton.disabled = true;
    }
    currentSelectedOption.addEventListener("click", () => {
        currentSelectedOption.addEventListener("change", () => {
            let selectedSortFieldOption = selectedSortField.options[selectedSortField.selectedIndex].value;
            if(selectedSortFieldOption !== "sort by") {
                selectedSortDirection.disabled = false;
            }
        })
        selectedSortDirection.addEventListener("change", () => {
            let selectedSortDirectionOption = selectedSortDirection.options[selectedSortDirection.selectedIndex].value;
            if(selectedSortDirectionOption !== "sort direction " && clickCount < columnCount - 1) {
                sortAddingButton.disabled = false;
            }
            if(selectedSortFieldOption !== "sort by" && selectedSortDirectionOption !== "sort direction") {
                submitButton.disabled = false;
            } else{submitButton.disabled = true;
                sortAddingButton.disabled = true;
            }; 
        })
        if(selectedSortFieldOption === "id") {
            const allIdOptions = document.querySelector(".sort-options-cloned .id");
            allIdOptions.classList.add("chosen-option");
        } else if(selectedSortFieldOption === "gender") {
            const allGenderOptions = document.querySelector(".sort-options-cloned .gender");
            allGenderOptions.classList.add("chosen-option");
        } else if(selectedSortFieldOption === "first name") {
            const allFirstNameOptions = document.querySelector(".sort-options-cloned .first-name");
            allFirstNameOptions.classList.add("chosen-option");
        } else if(selectedSortFieldOption === "last name") {
            const allLastNameOptions = document.querySelector(".sort-options-cloned .last-name");
            allLastNameOptions.classList.add("chosen-option");
        } else if(selectedSortFieldOption === "birth date") {
            const allBirthDateOptions = document.querySelector(".sort-options-cloned .birth-date");
            allBirthDateOptions.classList.add("chosen-option");
        } else if(selectedSortFieldOption === "age") {
            const allAgeOptions = document.querySelector(".sort-options-cloned .age");
            allAgeOptions.classList.add("chosen-option");
        } else if(selectedSortFieldOption === "e-mail") {
            const allEmailOptions = document.querySelector(".sort-options-cloned .e-mail");
            allEmailOptions.classList.add("chosen-option");
        } else if(selectedSortFieldOption === "address") {
            const allAddressOptions = document.querySelector(".sort-options-cloned .address");
            allAddressOptions.classList.add("chosen-option");
        } 
        
    })
    

    
    //let selectedSortFieldToBeDelated = document.querySelector(`option[value=${selectedSortFieldOption}]`);
    //let selectedSortFieldToBeDelated = 
    //if(currentSelectedOptions.includes(selectedOption) === false && kaldırılmış) {
    
})*/
