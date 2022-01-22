import { config } from "./configExport.js";
import { ColumnHider } from "./ColumnHider.js";
import { MySortingSection } from "./MySortingSection.js";
import { SearchButton } from "./SearchButton.js";
import { Column, Data, RowRecord } from "./types/interfaces.js";
import { isRowRecord } from "./types/typeGuards.js";
import { DATA_ROWS } from "./configExport.js";
import { sortingService } from "./configExport.js";

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
        columnHeader.style.boxShadow = "0 5px 5px 1px rgba(0, 0, 0, 0.5)";
        rowOfMainHeaders.append(columnHeader);
        if (column.children !== undefined) {
            columnHeader.setAttribute("data-header-expanded", "false");
          addToogleChildrensVisiblityListener(columnHeader);
          columnHeader.addEventListener("mouseover", () => {
            columnHeader.style.color = "white";
            columnHeader.style.cursor = "pointer";
            columnHeader.style.transition = "color 250ms ease-in-out";
          });
          columnHeader.addEventListener("mouseout", () => {
            columnHeader.style.color = "black";
          });
          for (const childColumn of column.children) {
            const childColumnHeader = document.createElement("th");
            childColumnHeader.id = childColumn.id;
            childColumnHeader.className = `${childColumn.id}-header ${column.id}`;
            childColumnHeader.setAttribute("data-column-checkbox-checked", "true");
            childColumnHeader.setAttribute("data-section-expanded", "false");
            childColumnHeader.textContent = childColumn.displayName.toUpperCase();
            rowOfChildHeaders.append(childColumnHeader);
          }
        }
      }
    columnHeaderSection.appendChild(rowOfMainHeaders);
    columnHeaderSection.appendChild(rowOfChildHeaders);
}

export function createRows(dataList): void {
  for (const record of dataList) {
    const dataRow = document.createElement("tr");
    dataRow.classList.add("data-row");
    for (const [recordId, recordValue] of Object.entries(record)) {
      const dataCell = document.createElement("td");
      dataCell.className = recordId;
      dataCell.setAttribute("data-column-checkbox-checked", "true");
      if (isRowRecord(recordValue)) {
        dataCell.setAttribute("data-header-expanded", "false");
        dataCell.textContent = config
          .getSummaryRule(recordId)
          .map((fieldId) => recordValue[fieldId])
          .join(", ");
        for (const [childrenId, childrenValue] of Object.entries(recordValue)) {
          const childrenCell = document.createElement("td");
          childrenCell.className = `${recordId} ${childrenId}`;
          childrenCell.setAttribute("data-column-checkbox-checked", "true");
          childrenCell.textContent = childrenValue.toString();
          childrenCell.setAttribute("data-section-expanded", "false");
          dataRow.append(childrenCell);
        }
      } else {
        dataCell.textContent = recordValue.toString();
      }
      dataRow.append(dataCell);
    }
    dataRows.append(dataRow);
    
    
  }
  
}

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
  //DATA_ROWS.visibleRows = sortingService.sortData(config.sortingRules);
  
  dataRows.innerHTML = "";
  createRows(DATA_ROWS.visibleRows);
  
});



console.log(ColumnHider);
console.log(SearchButton);
