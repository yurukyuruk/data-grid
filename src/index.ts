import { config } from "./configExport.js";
import { ColumnHider } from "./columnHider.js";
import { SortingService } from "./sortingService.js";
import { MySortingSection } from "./sortModel.js";
import { SearchButton } from "./SearchButton.js";
import { Column, Data, RowRecord } from "./types/interfaces.js";
import { isRowRecord } from "./types/typeGuards.js";
import { DATA_ROWS } from "./configExport.js";

const allChildColumnElementsTogetherWithParents: (HTMLTableRowElement | HTMLTableElement | HTMLTableCellElement)[][] = [];
const dataRows = document.querySelector(".data-rows") as HTMLTableSectionElement;
const columnHeaderSection = document.querySelector("thead") as HTMLTableSectionElement;

export function createDataHeaders(): void {
  const rowOfMainHeaders = document.createElement("tr");
    const rowOfChildHeaders = document.createElement("tr");
    const hasChildrens = config.hasAnyChildren();
    rowOfMainHeaders.classList.add("header-row");
    rowOfChildHeaders.classList.add("header-row");
    for(const column of config.columns) {
        const columnHeader = document.createElement("th");
        columnHeader.rowSpan = hasChildrens ? 2 : 1;
        columnHeader.id = column.id;
        columnHeader.className = `${column.id}-header`;
        columnHeader.setAttribute("data-column-checkbox-checked", "true");
        columnHeader.textContent = column.displayName.toUpperCase();
        rowOfMainHeaders.append(columnHeader);
        if (column.children !== undefined) {
            columnHeader.setAttribute("data-header-expanded", "false");
          addToogleChildrensVisiblityListener(columnHeader);
          columnHeader.addEventListener("mouseover", () => {
            columnHeader.style.color = "white";
            columnHeader.style.cursor = "pointer";
          });
          columnHeader.addEventListener("mouseout", () => {
            columnHeader.style.color = "black";
          });
          for (const childColumn of column.children) {
            const childColumnHeader = document.createElement("th");
            childColumnHeader.id = childColumn.id;
            childColumnHeader.className = `${childColumn.id}-header ${column.id}`;
            childColumnHeader.setAttribute("data-section-expanded", "false");
            childColumnHeader.textContent = childColumn.displayName.toUpperCase();
            rowOfChildHeaders.append(childColumnHeader);
          }
        }
      }
    columnHeaderSection.appendChild(rowOfMainHeaders);
    columnHeaderSection.appendChild(rowOfChildHeaders);
}

export function createRows(): void {
  let n = -1;
  for (const record of DATA_ROWS.rows) {
    n += 1;
    const dataRow = document.createElement("tr");
    for (const [recordId, recordValue] of Object.entries(record)) {
      const dataCell = document.createElement("td");
      dataCell.className = recordId;
      if (isRowRecord(recordValue)) {
        dataCell.setAttribute("data-header-expanded", "false");
        dataCell.textContent = config
          .getSummaryRule(recordId)
          .map((fieldId) => recordValue[fieldId])
          .join(", ");
        for (const [childrenId, childrenValue] of Object.entries(recordValue)) {
          const childrenCell = document.createElement("td");
          childrenCell.className = `${recordId} ${childrenId}`;
          childrenCell.textContent = childrenValue.toString();
          childrenCell.setAttribute("data-section-expanded", "false");
          dataRow.append(childrenCell);
        }
      } else {
        dataCell.textContent = recordValue.toString();
      }
      dataRow.append(dataCell);
    }
    if (n % 2 !== 0) {
      dataRow.classList.add("colored-row");
    }
    dataRows.append(dataRow);
    
    
  }
  
}

/*function createReferenceElement(): HTMLTableRowElement {
  const dataRow = document.createElement("tr");
  dataRow.classList.add("row0");
  dataRow.classList.add("data-row");
  for (let i = 0; i < config.columns.length; i++) {
    const dataCell = document.createElement("td");
    dataCell.classList.add(config.columns[i].id + "-data");
    dataCell.setAttribute("data-column-checkbox-checked", "true");
    if (config.columns[i].children) {
      dataCell.setAttribute("data-address-section-closed", "true");
      const expandedDataTable = document.createElement("table");
      expandedDataTable.setAttribute("data-address-section-expanded", "false");
      expandedDataTable.setAttribute("data-column-checkbox-checked", "true");
      const expandedDataRow = document.createElement("tr");
      expandedDataRow.setAttribute("data-address-section-expanded", "false");
      expandedDataRow.setAttribute("data-column-checkbox-checked", "true");
      expandedDataRow.setAttribute("colspan", (config.columns[i].children as Column[]).length.toString());
      config.columns[i].children?.forEach(() => {
        const childDataCell = document.createElement("td");
        childDataCell.setAttribute("data-address-section-expanded", "false");
        childDataCell.setAttribute("data-column-checkbox-checked", "true");
        expandedDataRow.appendChild(childDataCell);
        expandedDataTable.appendChild(expandedDataRow);
        dataCell.appendChild(expandedDataTable);
      });
    }
    dataRow.appendChild(dataCell);
  }
  return dataRow;
}

function addDataToElement(element: HTMLTableRowElement, eachPerson: RowRecord): void {
  for (let i = 0; i < config.columns.length; i++) {
    const columnWhichHaveChildren: Column = config.columns[i];
    const cell = eachPerson[columnWhichHaveChildren.id];
    if (isRowRecord(cell)) {
      const fieldNames: string[] = config.getSummaryFieldsFromColumnName(i); //dont pass index pass columnid
      const summaryText: string = fieldNames.map((fieldName) => cell[fieldName]).join(", ");
      const childrenText = document.createTextNode(summaryText);
      element.children[i].append(childrenText);
      for (let k = 0; k < element.children[i].children[0].children[0].children.length; k++) {
        const eachChildrenText: string = cell[(columnWhichHaveChildren.children as Column[])[k].id] as string;
        element.children[i].children[0].children[0].children[k].append(eachChildrenText);
      }
    } else {
      const text = document.createTextNode(cell.toString());
      element.children[i].append(text);
    }
  }
}*/

/*function addClassName(newNumber: number): string {
  return `row${newNumber} data-row`;
}

let n = -1;
let allPersonsElements: DocumentFragment;
function addAllDataAtOnce(fetchedData: RowRecord[], dataReferenceElement: HTMLTableRowElement): void {
  allPersonsElements = document.createDocumentFragment();
  fetchedData.forEach((person) => {
    n += 1;
    const personElement = dataReferenceElement.cloneNode(true) as HTMLTableRowElement;
    addDataToElement(personElement, person);
    personElement.className = addClassName(n);
    allPersonsElements.append(personElement);
    if (fetchedData.indexOf(person) % 2 !== 0) {
      personElement.classList.add("colored-row");
    }
  });
  dataRows.append(allPersonsElements);
}*/

export let sortingService: SortingService;
export const sortModel = document.querySelector(MySortingSection.TAG) as unknown as MySortingSection;

/*export function fetchRowDatas(data: Data): Promise<void> {
  return fetch(data.dataUrl)
    .then((response) => response.json())//Birinci then in return değerini ikinci thende parametre olarak kullanıyoruz.
    .then((rowRecords: RowRecord[]) => {
      sortingService = new SortingService(rowRecords);
      addAllDataAtOnce(rowRecords, createReferenceElement());
      if (localStorage.getItem("sortInformation") !== null) {
        dataRows.innerHTML = "";
        const sortedData: RowRecord[] = sortingService.sortData(JSON.parse(localStorage.getItem("sortInformation") ?? "[]"));
        addAllDataAtOnce(sortedData, createReferenceElement());
      }
      const columnsVisibility: string[] = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "[]");

      for (let i = 0; i < config.columns.length; i++) {
        const eachDataColumnGroup: NodeListOf<Element> = document.querySelectorAll("." + config.columns[i].id + "-data");
        eachDataColumnGroup.forEach((element) => element.setAttribute("data-column-checkbox-checked", columnsVisibility[i]));
      }
    })
}*/
function addToogleChildrensVisiblityListener(headerColumn) {
  headerColumn.addEventListener("click", () => {
      const newState = headerColumn.getAttribute("data-header-expanded") === "false" ? "true" : "false";
      if (newState === "true") {
          headerColumn.rowSpan = 1;
          headerColumn.colSpan = config.getChildrens(headerColumn.id).length || 1;
      } else {
          headerColumn.rowSpan = 2;
          headerColumn.colSpan = 1;
      }
      headerColumn.setAttribute("data-header-expanded", newState);
      const childrens = [
        ...Array.from(columnHeaderSection.querySelectorAll(`.${headerColumn.id}`)),
        ...Array.from(dataRows.querySelectorAll(`.${headerColumn.id}`))
      ];
      for (const children of childrens) {
        if (children.getAttribute("data-header-expanded")) {
          children.setAttribute("data-header-expanded", newState);
        } else {
          children.setAttribute("data-section-expanded", newState);
        }
      }
    });
}

sortModel.addEventListener("to-sort", () => {
  dataRows.innerHTML = "";
  addAllDataAtOnce(sortingService.data, createReferenceElement());
});



console.log(ColumnHider);
console.log(SearchButton);
