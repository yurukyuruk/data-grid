import { ConfigService } from "./configService.js";
import { config } from "./configExport.js";
import {ColumnHider} from "./columnHider.js";
import {SortingService} from "./sortingService.js";
import { ColumnRow } from "./types/interfaces.js";
import {MySortingSection} from "./sortModel.js";

//let allAddressSectionElements: NodeListOf<Element>;
//let addressSummaryElements: NodeListOf<Element>;
const allChildColumnElementsTogetherWithParents = [];
const dataRows = document.querySelector(".data-rows") as HTMLTableSectionElement;
const columnHeaderSection = document.querySelector("thead");

export function createDataHeaders() {
    let mainColumnHeadersSection = document.createElement("tr");
    mainColumnHeadersSection.classList.add("columns");
    for(let i = 0; i < config.columns.length; i++) {
        let mainColumn = document.createElement("th");
        mainColumn.classList.add(config.getHtmlClassNamesOfColumns()[i] + "-data");
        mainColumn.setAttribute("data-column-checkbox-checked", "true");
        mainColumn.setAttribute("rowspan", "2");
        mainColumn.textContent = config.columns[i].displayName.toUpperCase();
        mainColumnHeadersSection.appendChild(mainColumn);
        if(config.columns[i].children) {
            let childColumnElementsTogetherWithParents = [];
            mainColumn.setAttribute("data-address-section-expanded", "false");
            mainColumn.setAttribute("id", config.getHtmlClassNamesOfColumns()[i] + "-header");
            let childColumnHeadersSection = document.createElement("table");               
            childColumnHeadersSection.setAttribute("data-address-section-expanded", "false");
            let childColumnRow = document.createElement("tr");
            childColumnRow.setAttribute("data-address-section-expanded", "false");
            for(let k = 0; k < config.columns[i].children.length; k++) {
                let childColumnHeader = document.createElement("th");
                childColumnHeader.setAttribute("data-address-section-expanded", "false");
                childColumnHeader.classList.add(config.getHtmlClassNamesOfAllChildColumns(i)[k] + "-header");
                childColumnHeader.textContent = config.columns[i].children[k].displayName.toUpperCase();
                childColumnRow.appendChild(childColumnHeader);
                childColumnElementsTogetherWithParents.push(childColumnHeader);
            }
            childColumnHeadersSection.appendChild(childColumnRow);
            mainColumn.appendChild(childColumnHeadersSection);   
            childColumnElementsTogetherWithParents.push(childColumnHeadersSection);
            childColumnElementsTogetherWithParents.push(childColumnRow);
            childColumnElementsTogetherWithParents.push(mainColumn);
            allChildColumnElementsTogetherWithParents.push(childColumnElementsTogetherWithParents);
        }    
    }   
    columnHeaderSection.appendChild(mainColumnHeadersSection);     
}

function createReferenceElement(): HTMLTableRowElement {
    const dataRow = document.createElement("tr") as HTMLTabelRowElement;
    dataRow.classList.add("row0");
    dataRow.classList.add("data-row"); 
    for(let i = 0; i < config.getHtmlClassNamesOfColumns().length; i++) {
        const dataCell = document.createElement("td") as HTMLTableCellElement;
        dataCell.classList.add(config.getHtmlClassNamesOfColumns()[i] + "-data");
        dataCell.setAttribute("data-column-checkbox-checked", "true");
        if(config.columns[i].children) {
            dataCell.setAttribute("data-address-section-closed", "true");
            const expandedDataTable = document.createElement("table");
            expandedDataTable.setAttribute("data-address-section-expanded", "false");
            expandedDataTable.setAttribute("data-column-checkbox-checked", "true");
            const expandedDataRow = document.createElement("tr");
            expandedDataRow.setAttribute("data-address-section-expanded", "false");
            expandedDataRow.setAttribute("data-column-checkbox-checked", "true");
            expandedDataRow.setAttribute("colspan", config.columns[i].children.length);
            config.columns[i].children.forEach(child => {
                const childDataCell = document.createElement("td") as HTMLTableCellElement;
                childDataCell.setAttribute("data-address-section-expanded", "false");
                childDataCell.setAttribute("data-column-checkbox-checked", "true");
                expandedDataRow.appendChild(childDataCell);
                expandedDataTable.appendChild(expandedDataRow);
                dataCell.appendChild(expandedDataTable);   
            })
        }   
        dataRow.appendChild(dataCell);
    } 
    
    
    return dataRow;
}
                              
function addDataToElement(element: HTMLTableRowElement, eachPerson: Data) {
    for(let i = 0; i < config.columns.length; i++) {
        if(config.columns[i].children) {
            const columnWhichHaveChildren = config.columns[i];
            const fieldNames = config.getSummaryFieldsFromColumnName(i);
            let summaryText = fieldNames.map(fieldName => eachPerson[columnWhichHaveChildren.id][fieldName]).join(', ');
            const childrenText = document.createTextNode(summaryText);
            element.children[i].append(childrenText);
            for(let k = 0; k < element.children[i].children[0].children[0].children.length; k++) {
                const eachChildrenText = eachPerson[columnWhichHaveChildren.id][columnWhichHaveChildren.children[k].id];
                element.children[i].children[0].children[0].children[k].append(eachChildrenText);
            }
        } else {
            const text = document.createTextNode(eachPerson[config.columns[i].id]);
            element.children[i].append(text);
        }   
    }
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
    //allAddressSectionElements = document.querySelectorAll("[data-address-section-expanded]");
    //addressSummaryElements = document.querySelectorAll("[data-address-section-closed]");
}


let data: ColumnRow[];
export let sortingService: SortingService;
export const sortModel = document.querySelector(MySortingSection.TAG) as unknown as MySortingSection;

export function fetchRowDatas() {
    fetch(config.data.dataUrl).then(async (response) => {
        data = await response.json();
        sortingService = new SortingService(data);
        addAllDataAtOnce(data, createReferenceElement());
    }).then(() => {
        if(localStorage.getItem("sortInformation") !== null) {
            dataRows.innerHTML = "";
            let sortedData: ColumnRow[] = sortingService.sortData(JSON.parse(localStorage.getItem("sortInformation") ?? "[]"));
            addAllDataAtOnce(sortedData, createReferenceElement());
        }
    })
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
})


export function addEventListenerToColumnHeadersWhichHasChildren() {
    for(let i = 0; i < config.getColumnsWhichHaveChilderenColumns().length; i++) {
        const columnHeaderWhichHasChildColumns = document.querySelector("#" + config.getHtmlClassNameFromDisplayName(config.getColumnsWhichHaveChilderenColumns()[i].displayName) + "-header"); 
        columnHeaderWhichHasChildColumns.addEventListener("mouseover", (e) => {
            columnHeaderWhichHasChildColumns.style.color = "white";
            columnHeaderWhichHasChildColumns.style.cursor = "pointer";
        })
        columnHeaderWhichHasChildColumns.addEventListener("mouseout", () => {
            columnHeaderWhichHasChildColumns.style.color = "black";
        })
        columnHeaderWhichHasChildColumns.addEventListener("click", (e) => {
            //config.saveAddressColumnVisibilityStatus(columnHeaderWhichHasChildColumns);
            const addressSectionElementsStateChange: boolean = columnHeaderWhichHasChildColumns.getAttribute("data-address-section-expanded") === "false" ? true : false;
            const addressSummaryElementState: boolean = !addressSectionElementsStateChange;
            allChildColumnElementsTogetherWithParents[i].forEach(element => element.setAttribute("data-address-section-expanded", addressSectionElementsStateChange.toString()));
            const tableDatasOfExpandedColumns = document.querySelectorAll(("td" + "." + config.getHtmlClassNameFromDisplayName(config.getColumnsWhichHaveChilderenColumns()[i].displayName) + "-data") + " table tr td");
            const tableRowOfExpandedColumns = document.querySelectorAll(("td" + "." + config.getHtmlClassNameFromDisplayName(config.getColumnsWhichHaveChilderenColumns()[i].displayName) + "-data") + " table tr");
            let summaryDatasOfClosedColumns = document.querySelectorAll("td" + "." + config.getHtmlClassNameFromDisplayName(config.getColumnsWhichHaveChilderenColumns()[i].displayName) + "-data");
            //summaryDatasOfClosedColumns.forEach(element => element.childNodes[1].textContent = "");
            tableDatasOfExpandedColumns.forEach(element => element.setAttribute("data-address-section-expanded", addressSectionElementsStateChange.toString()));
            tableRowOfExpandedColumns.forEach(element => element.setAttribute("data-address-section-expanded", addressSectionElementsStateChange.toString()));
            //addressSummaryElements.forEach(element => element.setAttribute("data-address-section-closed", addressSummaryElementState.toString()));
            if(columnHeaderWhichHasChildColumns.getAttribute("data-address-section-expanded") === "false") {
                columnHeaderWhichHasChildColumns.setAttribute("rowspan", "2");
            } else {
                columnHeaderWhichHasChildColumns.setAttribute("rowspan", "1");
            } 
        })
    }
}

    

console.log(ColumnHider);




