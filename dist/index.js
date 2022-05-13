import { ConfigService } from "./ConfigService.js";
import { ColumnHider } from "./ColumnHider.js";
import { MySortingSection } from "./MySortingSection.js";
import { SearchButton } from "./SearchButton.js";
import { isRowRecord } from "./types/typeGuards.js";
import { DataRows } from "./DataRows.js";
import { SortingService } from "./sortingService.js";
import { FilteringService } from "./FilteringService.js";
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
      <thead class="data-headers">
      </thead>
      <tbody class="data-rows">
      </tbody>    
  </table>
</div>       
  `
};
class DataGrid extends HTMLElement {
    static TAG = "data-grid";
    shadowRoot;
    dataRows;
    columnHeaderSection;
    DATA_ROWS;
    config;
    sortModel;
    sortingService;
    table;
    filteringService;
    searchButton;
    dataHeaders;
    classOfColumnHeaderElements;
    columnHider;
    dataSorter;
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = template;
        this.getElementReferences();
        this.initializeListeners();
        this.DATA_ROWS = new DataRows();
        this.config = new ConfigService();
        this.searchButton = this.shadowRoot.querySelector(SearchButton.TAG);
        this.columnHider = this.shadowRoot.querySelector(ColumnHider.TAG);
        this.dataSorter = this.shadowRoot.querySelector(MySortingSection.TAG);
        this.initizaleApp();
    }
    // KK
    async initizaleApp() {
        const dataUrl = await this.config.fetchConfig();
        this.sortModel.setColumnNameToColumnIdMapper(this.config.getColumnIdFromColumnDisplayName);
        this.sortModel.setSortFieldsInSortFieldButton(this.config.getDisplayNamesOfColumnsWhichHaveNoChildren());
        this.dataHeaders = this.shadowRoot.querySelector(".data-headers");
        this.createDataHeaders();
        this.dataRows = this.shadowRoot?.querySelector(".data-rows");
        await this.DATA_ROWS.fetchData(dataUrl);
        this.sortingService = new SortingService(this.DATA_ROWS.getVisibleRows, this.config.getColumnTypeFromColumnId);
        this.filteringService = new FilteringService(this.DATA_ROWS.rows);
        this.filteringService.setVisibleColumnNames(this.config.getVisibleColumnIds());
        if (localStorage.getItem("filterInformation") !== null) {
            this.searchButton.setDefaultSearchValue(this.config.userFilterInput);
        }
        this.createRows();
        this.setChildrensVisibilityStatus(this.classOfColumnHeaderElements);
    }
    initializeListeners() {
        this.addEventListener("to-fetch-data", (e) => {
            return this.DATA_ROWS.fetchData(e.detail.url);
        });
        this.addEventListener("to-set-checkbox-textcontent", (e) => {
            e.detail.checkboxLabel.textContent = this.config.columns[e.detail.i].displayName;
        });
        this.addEventListener("to-click-column-hider-button", (e) => {
            e.detail.createAndSetCheckboxes(this.config.getHtmlClassNamesOfColumns());
            this.table.classList.toggle("blured");
            this.sortModel.sortDataButton.classList.toggle("blured");
            this.searchButton.classList.toggle("blured");
        });
        this.addEventListener("to-click-checkbox", (e) => {
            const wholeColumnData = this.shadowRoot.querySelectorAll("." + this.config.getHtmlClassNamesOfColumns()[e.detail.i]);
            const wholeColumnHeaders = this.shadowRoot.querySelectorAll("." + this.config.getHtmlClassNamesOfColumns()[e.detail.i] + "-header");
            const checkboxElementsStateChange = wholeColumnData[0].getAttribute("data-column-checkbox-checked") === "true" ? false : true;
            wholeColumnData.forEach((data) => data.setAttribute("data-column-checkbox-checked", checkboxElementsStateChange.toString()));
            wholeColumnHeaders.forEach((header) => header.setAttribute("data-column-checkbox-checked", checkboxElementsStateChange.toString()));
            e.detail.checkboxHolder.setAttribute("data-column-checkbox-checked", checkboxElementsStateChange.toString());
            this.config.saveColumnVisibilityStatus(e.detail.checkboxHolders);
            if (e.detail.checkboxHolder.getAttribute("data-column-checkbox-checked") === "false") {
                e.detail.checkbox.removeAttribute("checked");
            }
            else {
                e.detail.checkbox.setAttribute("checked", "checked");
            }
        });
        this.addEventListener("to-set-checkboxholder-attribute", (e) => {
            const wholeColumnData = this.shadowRoot.querySelectorAll("." + this.config.getHtmlClassNamesOfColumns()[e.detail.i]);
            e.detail.checkboxHolder.setAttribute("data-column-checkbox-checked", wholeColumnData[0].getAttribute("data-column-checkbox-checked"));
        });
        this.addEventListener("to-reset-checkboxholder-attribute", (e) => {
            e.detail.checkboxHolder.setAttribute("data-column-checkbox-checked", this.config.getColumnVisibilityStatus("reset")[e.detail.i].toString());
        });
        this.addEventListener("to-close-column-hider-button", () => {
            this.table.classList.toggle("blured");
            this.searchButton.classList.toggle("blured");
            this.sortModel.sortDataButton.classList.toggle("blured");
            this.filteringService.setVisibleColumnNames(this.config.getVisibleColumnIds());
            this.createDataHeaders();
            this.createRows();
            this.setChildrensVisibilityStatus(this.classOfColumnHeaderElements);
        });
        this.addEventListener("to-reset-column-hider", (e) => {
            this.config.getColumnVisibilityStatus("reset");
            e.detail.createAndSetCheckboxes(this.config.getHtmlClassNamesOfColumns(), "reset");
            this.createDataHeaders();
            this.createRows();
            this.setChildrensVisibilityStatus(this.classOfColumnHeaderElements);
        });
        this.addEventListener("to-click-sort-data-button", (e) => {
            if (this.config.sortingRules.length === 0) {
                e.detail.sortAddingButton.disabled = true;
                e.detail.submitButton.disabled = true;
                e.detail.resetButton.disabled = true;
            }
            else if (this.config.sortingRules.length !== 0) {
                e.detail.resetButton.disabled = false;
            }
            if (this.config.sortingRules.length > 0) {
                e.detail.sortAddingButton.disabled = false;
                e.detail.submitButton.disabled = false;
                e.detail.resetButton.disabled = false;
                for (let i = 0; i < this.config.sortingRules.length; i++) {
                    if (i > 0) {
                        this.dataSorter.createNewSortLine();
                    }
                    e.detail.sortOptions[i].fieldOption = this.config.getColumnDisplayNameFromColumnId(this.config.sortingRules[i].id);
                    e.detail.sortOptions[i].directionOption = this.config.sortingRules[i].direction;
                    e.detail.sortOptions[i].sortField.disabled = true;
                    e.detail.sortOptions[i].sortDirection.disabled = true;
                }
            }
        });
        this.addEventListener("to-reset-sorting", () => {
            this.config.sortingRules = [];
            this.config.clearSortInformation();
            this.createDataHeaders();
            this.createRows("reset");
            this.setChildrensVisibilityStatus(this.classOfColumnHeaderElements);
        });
        this.addEventListener("to-sort-data", (e) => {
            this.config.saveSortInformation(e.detail.mappedSortOptions);
            this.createRows();
            this.setChildrensVisibilityStatus(this.classOfColumnHeaderElements);
        });
        this.addEventListener("to-blur", () => {
            this.table.classList.toggle("blured");
            this.searchButton.classList.toggle("blured");
            this.columnHider.columnHiderButton.classList.toggle("blured");
        });
        this.addEventListener("to-filter-data", (e) => {
            this.config.saveUserFilterInput(e.detail.inputValue, e.detail.userInput);
            this.DATA_ROWS.visibleRows = this.filteringService.filterRows(this.DATA_ROWS.rows, e.detail.inputValue);
            this.createRows();
            this.setChildrensVisibilityStatus(this.classOfColumnHeaderElements);
        });
    }
    createDataHeaders() {
        this.dataHeaders.innerHTML = "";
        const rowOfMainHeaders = document.createElement("tr");
        const rowOfChildHeaders = document.createElement("tr");
        const hasChildrens = this.config.hasAnyChildren();
        rowOfMainHeaders.classList.add("header-row");
        rowOfChildHeaders.classList.add("header-row");
        let i = -1;
        this.classOfColumnHeaderElements = [];
        for (const column of this.config.columns) {
            i += 1;
            const columnHeader = document.createElement("th");
            columnHeader.rowSpan = hasChildrens ? 2 : 1;
            columnHeader.id = column.id;
            columnHeader.className = `${column.id}-header`;
            columnHeader.setAttribute("data-header-expanded", "false");
            columnHeader.setAttribute("data-column-checkbox-checked", this.config.columnVisibilityRules[i].toString());
            columnHeader.textContent = column.displayName.toUpperCase();
            rowOfMainHeaders.append(columnHeader);
            if (column.children !== undefined) {
                this.classOfColumnHeaderElements.push(columnHeader.className);
                this.addToogleChildrensVisiblityListener(columnHeader, columnHeader.className);
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
                    childColumnHeader.setAttribute("data-column-checkbox-checked", this.config.columnVisibilityRules[i].toString());
                    childColumnHeader.setAttribute("data-section-expanded", "false");
                    childColumnHeader.textContent = childColumn.displayName.toUpperCase();
                    rowOfChildHeaders.append(childColumnHeader);
                }
            }
        }
        this.columnHeaderSection.appendChild(rowOfMainHeaders);
        this.columnHeaderSection.appendChild(rowOfChildHeaders);
    }
    createRows(reset) {
        this.dataRows.innerHTML = "";
        this.DATA_ROWS.visibleRows = this.filteringService.filterRows(this.DATA_ROWS.rows, this.config.filteringRule);
        if (reset === "reset") {
            this.sortingService.sortData([]);
        }
        else {
            this.sortingService.sortData(this.config.sortingRules);
        }
        for (const record of this.DATA_ROWS.visibleRows) {
            let i = -1;
            const dataRow = document.createElement("tr");
            dataRow.classList.add("data-row");
            for (const [recordId, recordValue] of Object.entries(record)) {
                i += 1;
                const dataCell = document.createElement("td");
                dataCell.className = recordId;
                dataCell.setAttribute("data-column-checkbox-checked", this.config.columnVisibilityRules[i].toString());
                if (isRowRecord(recordValue)) {
                    dataCell.setAttribute("data-header-expanded", "false");
                    dataCell.textContent = this.config
                        .getSummaryRule(recordId)
                        .map((fieldId) => recordValue[fieldId])
                        .join(", ");
                    for (const [childrenId, childrenValue] of Object.entries(recordValue)) {
                        const childrenCell = document.createElement("td");
                        childrenCell.className = `${recordId} ${childrenId}`;
                        childrenCell.setAttribute("data-column-checkbox-checked", this.config.columnVisibilityRules[i].toString());
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
    addToogleChildrensVisiblityListener(headerColumn, columnClassName) {
        headerColumn.addEventListener("click", () => {
            const newState = headerColumn.getAttribute("data-header-expanded") === "false" ? "true" : "false";
            if (newState === "true") {
                headerColumn.rowSpan = 1;
                headerColumn.colSpan = this.config.getChildrens(headerColumn.id).length || 1;
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
            localStorage.setItem(columnClassName, newState);
        });
    }
    setChildrensVisibilityStatus(columnClassNames) {
        for (let i = 0; i < columnClassNames.length; i++) {
            let state;
            if (localStorage.getItem(columnClassNames[i]) === null) {
                state = "false";
            }
            else {
                state = localStorage.getItem(columnClassNames[i]);
            }
            const headerColumn = this.shadowRoot.querySelector(`.${columnClassNames[i]}`);
            if (state === "true") {
                headerColumn.rowSpan = 1;
                headerColumn.colSpan = this.config.getChildrens(headerColumn.id).length || 1;
            }
            else {
                headerColumn.rowSpan = 2;
                headerColumn.colSpan = 1;
            }
            headerColumn.setAttribute("data-header-expanded", state);
            const childrens = [
                ...Array.from(this.columnHeaderSection.querySelectorAll(`.${headerColumn.id}`)),
                ...Array.from(this.dataRows.querySelectorAll(`.${headerColumn.id}`))
            ];
            for (const children of childrens) {
                if (children.getAttribute("data-header-expanded")) {
                    children.setAttribute("data-header-expanded", state);
                }
                else {
                    children.setAttribute("data-section-expanded", state);
                }
            }
        }
    }
    getElementReferences() {
        this.columnHeaderSection = this.shadowRoot?.querySelector("thead");
        this.sortModel = this.shadowRoot?.querySelector(MySortingSection.TAG); //export edilmiş
        this.table = this.shadowRoot.querySelector("#data-table");
    }
}
customElements.define(DataGrid.TAG, DataGrid);
//# sourceMappingURL=index.js.map