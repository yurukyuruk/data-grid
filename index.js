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

const sortAddingButton = document.querySelector(".sort-adding-button");
const columnCount = document.querySelector(".columns").childElementCount;
const sortOptions1 = document.querySelector(".sort-options-1");
let clickCount = 0;
let sortOptionsList = [sortOptions1];
sortAddingButton.addEventListener("click", () => {
    clickCount += 1;
    const sorting = document.querySelector(".sorting");
    let sortOptionsCloned = sortOptions1.cloneNode(true);
    sortOptionsCloned.classList = `sort-options-${clickCount + 1}`;
    sorting.insertBefore(sortOptionsCloned, sortAddingButton);
    sortOptionsList.push(sortOptionsCloned);
    if(clickCount > columnCount - 2) {
        sortAddingButton.disabled = true;
    }
})


const selectFields = document.querySelector(".sort-options-1 .sort-fields");
let currentSelectedOptions = [];
selectFields.addEventListener("change", function() {
    let selectedOption = selectFields.options[selectFields.selectedIndex].value;
    currentSelectedOptions.push(selectedOption);
    if(currentSelectedOptions.includes(selectedOption) === false && kaldırılmış) {
        //yeniden ekle /seçilip kaldırılmış mı kalkmışsa yeniden eklenecek.
    }
    
    if(selectedOption === "id") {
        const allIdOptions = document.querySelectorAll(".id");
    } else if(selectedOption === "gender") {
        const allGenderOptions = document.querySelectorAll(".gender");
    } else if(selectedOption === "first name") {
        const allFirstNameOptions = document.querySelectorAll(".first-name");
    } else if(selectedOption === "last name") {
        const allLastNameOptions = document.querySelectorAll(".last-name");
    } else if(selectedOption === "birth date") {
        const allBirthDateOptions = document.querySelectorAll(".birth-date");
    } else if(selectedOption === "age") {
        const allAgeOptions = document.querySelectorAll(".age");
    } else if(selectedOption === "e-mail") {
        const allEmailOptions = document.querySelectorAll(".e-mail");
    } else if(selectedOption === "address") {
        const allAddressOptions = document.querySelectorAll(".address");
    } 
})
    

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", () => {
    buttonResets();
    sortAddingButton.disabled = false;
})

function buttonResets() {
    let allSortOptionsCloned = document.querySelectorAll(".sort-options-cloned");
    allSortOptionsCloned.forEach(element => element.remove());
    let allAdditionSymbols = document.querySelectorAll(".addition-symbol");
    allAdditionSymbols.forEach(element => element.remove());
    let sortFields = document.querySelector(".sort-fields");
    sortFields.selectedIndex = 0;
    let sortDirections = document.querySelector(".sort-directions");
    sortDirections.selectedIndex = 0;
}

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
})


const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", () => {
    const selectFields = document.querySelector(".sort-fields");
    let selectedOption = selectFields.options[selectFields.selectedIndex].value;
    if(selectedOption === "id") {
        let idList = [];
        data.forEach(element => idList.push(element.id));;
        idList.sort();
        for(let i = 0; i < idList.length; i++) {
            for(let j = 0; j < data.length; j++) {
                if(idList[i] === data[j].id) {
                    idList[i] = data[j]
    
                }
            } 
        }
        for(let i = 0; i < idList.length; i++) {
            data[i] = idList[i];
        }
        console.log(data);
        addAllDataAtOnce(data, createReferenceElement());
    } else if(selectedOption === "gender") {
        
    } else if(selectedOption === "first name") {
    
    } else if(selectedOption === "last name") {
    
    } else if(selectedOption === "birth date") {
    
    } else if(selectedOption === "age") {
    
    } else if(selectedOption === "e-mail") {
    
    } else if(selectedOption === "address") {
    
    }
    //console.log(selectedOption);
})




let idHeader = document.querySelector(".id-header");
let genderHeader = document.querySelector(".gender-header");
let firstNameHeader = document.querySelector(".first-name-header");
let lastNameHeader = document.querySelector(".last-name-header");
let birthDateHeader = document.querySelector(".birth-date-header");
let ageHeader = document.querySelector(".age-header");
let emailHeader = document.querySelector(".email-header");
let addressHeader = document.querySelector(".address-header");

