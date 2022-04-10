import { config } from "./configExport.js";
import { MySortingSection } from "./MySortingSection.js";
import { isRowRecord } from "./types/typeGuards.js";
import { DATA_ROWS } from "./configExport.js";
const { template } = {
    template: `
  <style>  
  .whole-sort-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(253, 206, 184);
  }
  th[data-column-checkbox-checked="false"],
  td[data-column-checkbox-checked="false"] {
    display: none;
  }
  table {
    width: 100%;
    border-spacing: 0;
  }
  
  .scroll-bar {
    height: 96vh;
  }
  thead {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: rgb(235, 144, 101);
    box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.4);
  }
  tr, td, th {
      border: #c67b58 1px solid;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 0.9rem;
      text-align: center;
  }
  th {
    padding: 12px;
  }
  .data-row:nth-child(2n) {
    background-color: rgb(253, 206, 184);
  }
  .blured {
    filter: blur(2px);
  }
  
  td[data-section-expanded='false'],
  th[data-section-expanded='false'] {
    display: none;
  }
  
  td[data-header-expanded='true'] {
    display: none;
  }
</style>
<div class="whole-sort-area">
  <my-sorting-section></my-sorting-section>
  <search-button></search-button>
  <column-hider></column-hider>  
</div>
<div class="scroll-bar">
  <table id="data-table">
      <thead>
      </thead>
      <tbody class="data-rows">
      </tbody>    
  </table>
</div>       
  `
};
export class DataGrid extends HTMLElement {
    static TAG = "data-grid";
    shadowRoot;
    dataRows;
    columnHeaderSection;
    sortModel;
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = template;
        this.getElementReferences();
        this.initializeListeners();
    }
    initializeListeners() {
        this.sortModel.addEventListener("to-sort", () => {
            this.dataRows.innerHTML = "";
            this.createRows(DATA_ROWS.visibleRows);
            const columnsVisibility = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "[]");
            for (let i = 0; i < config.columns.length; i++) {
                const eachDataColumnGroup = document.querySelectorAll("." + config.columns[i].id);
                const headersOfEachColumn = document.querySelectorAll("." + config.columns[i].id + "-header");
                eachDataColumnGroup.forEach((element) => element.setAttribute("data-column-checkbox-checked", columnsVisibility[i]));
                headersOfEachColumn.forEach((element) => element.setAttribute("data-column-checkbox-checked", columnsVisibility[i]));
            }
        });
        this.sortModel.addEventListener("to-set-sort-fields", () => {
            this.sortModel.setSortFieldsInSortFieldButton(config.getDisplayNamesOfColumnsWhichHaveNoChildren());
        });
        this.addEventListener("to-create-rows", () => {
            this.createRows(DATA_ROWS.visibleRows);
        });
        document.addEventListener("to-create-data-headers", () => {
            this.createDataHeaders();
        }, { capture: true });
        this.addEventListener("to-create-data-rows", () => {
            this.createRows(DATA_ROWS.rows);
        });
        this.addEventListener("to-recreate-data-rows", () => {
            this.createRows(DATA_ROWS.visibleRows);
        });
        this.sortModel.addEventListener("to-map-sort-options", () => {
            localStorage.setItem("sortInformation", JSON.stringify(this.sortModel.mapSortOptions(sortOptions)));
        });
    }
    createDataHeaders() {
        const rowOfMainHeaders = document.createElement("tr");
        const rowOfChildHeaders = document.createElement("tr");
        const hasChildrens = config.hasAnyChildren();
        rowOfMainHeaders.classList.add("header-row");
        rowOfChildHeaders.classList.add("header-row");
        for (const column of config.columns) {
            const columnHeader = document.createElement("th");
            columnHeader.rowSpan = hasChildrens ? 2 : 1;
            columnHeader.id = column.id;
            columnHeader.className = `${column.id}-header`;
            columnHeader.setAttribute("data-column-checkbox-checked", "true");
            columnHeader.textContent = column.displayName.toUpperCase();
            rowOfMainHeaders.append(columnHeader);
            if (column.children !== undefined) {
                columnHeader.setAttribute("data-header-expanded", "false");
                this.addToogleChildrensVisiblityListener(columnHeader);
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
        this.columnHeaderSection.appendChild(rowOfMainHeaders);
        this.columnHeaderSection.appendChild(rowOfChildHeaders);
    }
    createRows(dataList) {
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
                }
                else {
                    dataCell.textContent = recordValue.toString();
                }
                dataRow.append(dataCell);
            }
            this.dataRows.append(dataRow);
        }
    }
    addToogleChildrensVisiblityListener(headerColumn) {
        headerColumn.addEventListener("click", () => {
            const newState = headerColumn.getAttribute("data-header-expanded") === "false" ? "true" : "false";
            if (newState === "true") {
                headerColumn.rowSpan = 1;
                headerColumn.colSpan = config.getChildrens(headerColumn.id).length || 1;
            }
            else {
                headerColumn.rowSpan = 2;
                headerColumn.colSpan = 1;
            }
            headerColumn.setAttribute("data-header-expanded", newState);
            const childrens = [
                ...Array.from(this.columnHeaderSection.querySelectorAll(`.${headerColumn.id}`)),
                ...Array.from(this.dataRows.querySelectorAll(`.${headerColumn.id}`))
            ];
            for (const children of childrens) {
                if (children.getAttribute("data-header-expanded")) {
                    children.setAttribute("data-header-expanded", newState);
                }
                else {
                    children.setAttribute("data-section-expanded", newState);
                }
            }
        });
    }
    getElementReferences() {
        this.dataRows = this.shadowRoot?.querySelector(".data-rows");
        this.columnHeaderSection = this.shadowRoot?.querySelector("thead");
        this.sortModel = this.shadowRoot?.querySelector(MySortingSection.TAG); //export edilmiş
    }
}
customElements.define(DataGrid.TAG, DataGrid);
//# sourceMappingURL=index.js.map