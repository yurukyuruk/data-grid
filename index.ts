import { ConfigService } from "./configService.js";
import { config } from "./configExport.js";
import { ColumnHider } from "./columnHider.js";
import { SortingService } from "./sortingService.js";
import { MySortingSection } from "./sortModel.js";
import { SearchButton } from "./SearchButton.js";
import { Column } from "./types/interfaces.js";


const allChildColumnElementsTogetherWithParents: null | HTMLTableCellElement[][] = [];
const dataRows = document.querySelector(".data-rows") as HTMLTableSectionElement;
const columnHeaderSection = document.querySelector("thead") as 	HTMLTableSectionElement;


export function createDataHeaders():void {
    let mainColumnHeadersSection = document.createElement("tr");
    mainColumnHeadersSection.classList.add("columns");
    for(let i = 0; i < config.columns.length; i++) {
        let mainColumn = document.createElement("th");
        mainColumn.classList.add(config.columns[i].id + "-data");
        mainColumn.setAttribute("data-column-checkbox-checked", "true");
        mainColumn.setAttribute("rowspan", "2");
        mainColumn.textContent = config.columns[i].displayName.toUpperCase();
        mainColumnHeadersSection.appendChild(mainColumn);
        if(config.columns[i].children) {
            let childColumnElementsTogetherWithParents:null | HTMLTableCellElement[] = [];
            mainColumn.setAttribute("data-address-section-expanded", "false");
            mainColumn.setAttribute("id", config.columns[i].id + "-header");
            let childColumnHeadersSection = document.createElement("table");               
            childColumnHeadersSection.setAttribute("data-address-section-expanded", "false");
            let childColumnRow = document.createElement("tr");
            childColumnRow.setAttribute("data-address-section-expanded", "false");
            for(let k = 0; k < config.columns[i].children.length; k++) {
                let childColumnHeader = document.createElement("th");
                childColumnHeader.setAttribute("data-address-section-expanded", "false");
                childColumnHeader.classList.add(config.columns[i].children[k].id + "-header");
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
    const dataRow = document.createElement("tr");
    dataRow.classList.add("row0");
    dataRow.classList.add("data-row"); 
    for(let i = 0; i < config.columns.length; i++) {
        const dataCell = document.createElement("td");
        dataCell.classList.add(config.columns[i].id + "-data");
        dataCell.setAttribute("data-column-checkbox-checked", "true");
        if(config.columns[i].children) {
            dataCell.setAttribute("data-address-section-closed", "true");
            const expandedDataTable = document.createElement("table");
            expandedDataTable.setAttribute("data-address-section-expanded", "false");
            expandedDataTable.setAttribute("data-column-checkbox-checked", "true");
            const expandedDataRow = document.createElement("tr");
            expandedDataRow.setAttribute("data-address-section-expanded", "false");
            expandedDataRow.setAttribute("data-column-checkbox-checked", "true");
            expandedDataRow.setAttribute("colspan", config.columns[i].children.length.toString());
            config.columns[i].children.forEach(() => {
                const childDataCell = document.createElement("td");
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
                              
function addDataToElement(element: HTMLTableRowElement, eachPerson: Column): void {
    for(let i = 0; i < config.columns.length; i++) {
        if(config.columns[i].children) {
            const columnWhichHaveChildren: Column = config.columns[i];
            const fieldNames: string[] = config.getSummaryFieldsFromColumnName(i);
            let summaryText: string = fieldNames.map(fieldName => eachPerson[columnWhichHaveChildren.id][fieldName]).join(', ');
            const childrenText = document.createTextNode(summaryText);
            element.children[i].append(childrenText);
            for(let k = 0; k < element.children[i].children[0].children[0].children.length; k++) {
                const eachChildrenText: string = eachPerson[columnWhichHaveChildren.id][columnWhichHaveChildren.children[k].id];
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
function addAllDataAtOnce(fetchedData: Column[], dataReferenceElement: HTMLTableRowElement): void {
    allPersonsElements = document.createDocumentFragment();
    fetchedData.forEach(person =>{
        n += 1;
        let personElement = dataReferenceElement.cloneNode(true) as HTMLTableRowElement;
        addDataToElement(personElement, person);
        personElement.className = addClassName(n);
        allPersonsElements.append(personElement);
        if(fetchedData.indexOf(person) % 2 !== 0) {
            personElement.classList.add("colored-row");
        }                                                       
    });
    const dataRows = document.querySelector(".data-rows") as HTMLTableSectionElement;
    dataRows.append(allPersonsElements); 
}

let data: Column[];
export let sortingService: SortingService;
export const sortModel = document.querySelector(MySortingSection.TAG) as unknown as MySortingSection;

export function fetchRowDatas(): void {
    fetch(config.data.dataUrl).then(async (response) => {
        data = await response.json();
        sortingService = new SortingService(data);
        addAllDataAtOnce(data, createReferenceElement());
    }).then(() => {
        if(localStorage.getItem("sortInformation") !== null) {
            dataRows.innerHTML = "";
            let sortedData: Column[] = sortingService.sortData(JSON.parse(localStorage.getItem("sortInformation") ?? "[]"));
            addAllDataAtOnce(sortedData, createReferenceElement());
        }
    }).then(() => {
        let columnsVisibility: string[] = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "[]");
        
            for(let i = 0; i <  config.columns.length; i++) {
                let eachDataColumnGroup: NodeListOf<Element> = document.querySelectorAll("." + config.columns[i].id + "-data");
                eachDataColumnGroup.forEach(element => element.setAttribute("data-column-checkbox-checked", columnsVisibility[i]));
            }
    })   
}


sortModel.addEventListener("to-sort", () => {
    dataRows.innerHTML = "";
    addAllDataAtOnce(sortingService.data, createReferenceElement());
})

function addDataSummaryToParentColumn(column: Column, summaryDataElements: HTMLTableCellElement[]) {
    for(let j = 0; j < data.length; j++) {
        for(let i = 0; i < config.columns.length; i++) {
            if(config.columns[i] === column) {
                const fieldNames: string[] = config.getSummaryFieldsFromColumnName(i);
                let summaryText: string = fieldNames.map(fieldName => data[j][column.id][fieldName]).join(', ');
                summaryDataElements[j].childNodes[1].textContent = summaryText;
            }
        }
    }    
}

export function addEventListenerToColumnHeadersWhichHasChildren() {
    for(let i = 0; i < config.getColumnsWhichHaveChilderenColumns().length; i++) {
        const columnHeaderWhichHasChildColumns = document.querySelector("#" + config.getColumnsWhichHaveChilderenColumns()[i].id + "-header") as HTMLTableCellElement; 
        columnHeaderWhichHasChildColumns.addEventListener("mouseover", () => {
            columnHeaderWhichHasChildColumns.style.color = "white";
            columnHeaderWhichHasChildColumns.style.cursor = "pointer";
        })
        columnHeaderWhichHasChildColumns.addEventListener("mouseout", () => {
            columnHeaderWhichHasChildColumns.style.color = "black";
        })
        columnHeaderWhichHasChildColumns.addEventListener("click", () => {
            let summaryDataElementsOfClosedColumns = document.querySelectorAll("td" + "." + config.getColumnsWhichHaveChilderenColumns()[i].id + "-data") as unknown as HTMLTableCellElement[];
            const expandedSectionElementsStateChange: boolean = columnHeaderWhichHasChildColumns.getAttribute("data-address-section-expanded") === "false" ? true : false;
            if(expandedSectionElementsStateChange) {
                summaryDataElementsOfClosedColumns.forEach(element => element.childNodes[1].textContent = "");
            } else {
                addDataSummaryToParentColumn(config.getColumnsWhichHaveChilderenColumns()[i], summaryDataElementsOfClosedColumns);
            }
            allChildColumnElementsTogetherWithParents[i].forEach(element => element.setAttribute("data-address-section-expanded", expandedSectionElementsStateChange.toString()));
            const tableDatasOfExpandedColumns = document.querySelectorAll(("td" + "." + config.getColumnsWhichHaveChilderenColumns()[i].id + "-data") + " table tr td") as unknown as  HTMLTableCellElement[];
            const tableRowOfExpandedColumns = document.querySelectorAll(("td" + "." + config.getColumnsWhichHaveChilderenColumns()[i].id + "-data") + " table tr") as unknown as HTMLTableRowElement[];    
            tableDatasOfExpandedColumns.forEach(element => element.setAttribute("data-address-section-expanded", expandedSectionElementsStateChange.toString()));
            tableRowOfExpandedColumns.forEach(element => element.setAttribute("data-address-section-expanded", expandedSectionElementsStateChange.toString()));
            if(columnHeaderWhichHasChildColumns.getAttribute("data-address-section-expanded") === "false") {
                columnHeaderWhichHasChildColumns.setAttribute("rowspan", "2");
            } else {
                columnHeaderWhichHasChildColumns.setAttribute("rowspan", "1");
            } 
        })
    }
}

    

console.log(ColumnHider);
console.log(SearchButton);




