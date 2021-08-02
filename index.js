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
            newDataRow.querySelector(`.${newClassName} .birthday-data`).innerHTML = user.birthDate;
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

})