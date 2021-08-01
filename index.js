const addressSection = document.querySelector("#address-section");
const allAddressSectionElements = document.querySelectorAll("[data-address-section-expanded]");
const addressSummaryElement = document.querySelector("[data-address-section-closed]");

addressSection.addEventListener("click", () => {
    const addressSectionElementsStateChange = addressSection.getAttribute("data-address-section-expanded") === "false" ? true : false;
    const addressSummaryElementState = !addressSectionElementsStateChange;
    allAddressSectionElements.forEach(addressElement => addressElement.setAttribute("data-address-section-expanded", addressSectionElementsStateChange.toString()));
    addressSummaryElement.setAttribute("data-address-section-closed", addressSummaryElementState.toString());
})

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
            
            newDataRow.querySelector(combineStrings(newClassName, ".id-data")).innerHTML = user.id;
            newDataRow.querySelector(combineStrings(newClassName, ".gender-data")).innerHTML = `${user.gender}`;
            newDataRow.querySelector(combineStrings(newClassName, ".first-name-data")).innerHTML = `${user.firstName}`;
            newDataRow.querySelector(combineStrings(newClassName, ".last-name-data")).innerHTML = `${user.lastName}`;
            newDataRow.querySelector(combineStrings(newClassName, ".birthday-data")).innerHTML = `${user.birthDate}`;
            newDataRow.querySelector(combineStrings(newClassName, ".age-data")).innerHTML = `${user.age}`;
            newDataRow.querySelector(combineStrings(newClassName, ".email-data")).innerHTML = `${user.email}`;
            newDataRow.querySelector(combineStrings(newClassName, ".address-summary-data")).innerHTML = `${user.address.city} ${user.address.street} ${user.address.houseNumber}`;
            newDataRow.querySelector(combineStrings(newClassName, ".country-data")).innerHTML = `${user.address.country}`;
            newDataRow.querySelector(combineStrings(newClassName, ".state-data")).innerHTML = `${user.address.state}`;
            newDataRow.querySelector(combineStrings(newClassName, ".city-data")).innerHTML = `${user.address.city}`;
            newDataRow.querySelector(combineStrings(newClassName, ".street-data")).innerHTML = `${user.address.street}`;
            newDataRow.querySelector(combineStrings(newClassName, ".house-number-data")).innerHTML = `${user.address.houseNumber}`;
        })
    })
}
function changeClassName(newNumber) {
    return `row${newNumber}`;
}
function combineStrings(string1, string2) {
    return `.${string1} ${string2}`; 
}