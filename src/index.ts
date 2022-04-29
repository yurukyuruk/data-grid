import { ConfigService } from "./ConfigService.js";
import { ColumnHider } from "./ColumnHider.js";
import { MySortingSection } from "./MySortingSection.js";
import { SearchButton } from "./SearchButton.js";
import { isRowRecord } from "./types/typeGuards.js";
import { DataRows } from "./DataRows.js";
import { RowRecord } from "./types/interfaces.js";
import { SortingRule } from "./SortingRule.js";
import { SortingService } from "./sortingService.js";
import { FilteringService } from "./FilteringService.js"
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

class DataGrid extends HTMLElement {
  static TAG = "data-grid";
  readonly shadowRoot: ShadowRoot;
  private dataRows!: HTMLTableSectionElement;
  private columnHeaderSection!: HTMLTableSectionElement;
  private DATA_ROWS!: DataRows;
  private config!: ConfigService;
  private sortModel!: MySortingSection;
  private sortingService!: SortingService;
  private table!: HTMLTableElement;
  private filteringService: FilteringService;
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.getElementReferences();
    this.initializeListeners();
    this.DATA_ROWS = new DataRows();
    this.config = new ConfigService();
    this.filteringService = new FilteringService();
    this.initizaleApp();
  }

  // KK
  private async initizaleApp(): Promise<void> {
    const dataUrl = await this.config.fetchConfig();
    this.sortModel.setColumnNameToColumnIdMapper(this.config.getColumnIdFromColumnDisplayName);
    this.sortModel.setSortFieldsInSortFieldButton(this.config.getDisplayNamesOfColumnsWhichHaveNoChildren());
    this.createDataHeaders();
    await this.DATA_ROWS.fetchData(dataUrl);
    this.sortingService = new SortingService(this.DATA_ROWS.getVisibleRows());
    this.sortingService.setColumnTypeFromColumnId(this.config.getColumnTypeFromColumnId);
    this.createRows();
    
  }
 
  
  initializeListeners(): void {
    this.sortModel.addEventListener("to-sort", () => {
      this.dataRows.innerHTML = "";
      this.createRows();
      const columnsVisibility: string[] = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "[]");
          for (let i = 0; i < this.config.columns.length; i++) {
            const eachDataColumnGroup: NodeListOf<Element> = this.shadowRoot.querySelectorAll("." + this.config.columns[i].id);
            const headersOfEachColumn: NodeListOf<Element> = this.shadowRoot.querySelectorAll("." + this.config.columns[i].id + "-header");
            eachDataColumnGroup.forEach((element) => element.setAttribute("data-column-checkbox-checked", columnsVisibility[i]));
            headersOfEachColumn.forEach((element) => element.setAttribute("data-column-checkbox-checked", columnsVisibility[i]));
          }
      
    });
    this.addEventListener("to-create-rows", () => {
      this.createRows(); 
    })
    this.addEventListener("to-create-data-rows", () => {
      this.createRows();
    })
    this.addEventListener("to-fetch-data", (e) => {
      return this.DATA_ROWS.fetchData((<CustomEvent>e).detail.url);
    })
    this.addEventListener("to-filter-rows", (e) => {
      this.DATA_ROWS.visibleRows = this.filteringService.filterRows(this.DATA_ROWS.rows, (<CustomEvent>e).detail.input);
      //DATA_ROWS.visibleRows = filterRows(DATA_ROWS.rows, inputValue);
    })
    this.addEventListener("to-create-rows", () => {
      this.createRows();
      //dataGrid.createRows(DATA_ROWS.visibleRows); 
    })
    this.addEventListener("to-set-visibility-attribute", () => {
      const columnsVisibility: string[] = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "[]");
      for (let i = 0; i < this.config.columns.length; i++) {
        const eachDataColumnGroup: NodeListOf<Element> = this.shadowRoot.querySelectorAll("." + this.config.columns[i].id);
        const headersOfEachColumn: NodeListOf<Element> = this.shadowRoot.querySelectorAll("." + this.config.columns[i].id + "-header");
        eachDataColumnGroup.forEach((element) => element.setAttribute("data-column-checkbox-checked", columnsVisibility[i]));
        headersOfEachColumn.forEach((element) => element.setAttribute("data-column-checkbox-checked", columnsVisibility[i]));
      }
    })
    this.addEventListener("to-set-text-content", (e) => {
      (<CustomEvent>e).detail.label.textContent = this.config.columns[(<CustomEvent>e).detail.i].displayName;
    })
    this.addEventListener("to-set-checkboxes", (e) => {
      (<CustomEvent>e).detail.setCheckboxes(this.config.getHtmlClassNamesOfColumns());
    })
    this.addEventListener("to-toggle", () => {
      this.sortModel.sortDataButton.classList.toggle("blured");
    })
    this.addEventListener("to-save-visibility", (e) => {
      this.config.saveColumnVisibilityStatus((<CustomEvent>e).detail.checkboxes);
    })
    this.addEventListener("to-create-checkboxes", (e) => {
      (<CustomEvent>e).detail.checkboxes(this.config.getHtmlClassNamesOfColumns());
    })
    this.addEventListener("to-clear-column-visibility", () => {
      this.config.clearColumnVisibilityInformation();
    })
    this.addEventListener("to-get-display-name", (e) => {
      (<CustomEvent>e).detail.fieldOption = this.config.getColumnDisplayNameFromColumnId((<CustomEvent>e).detail.id);
      //this.sortOptions[0].fieldOption = config.getColumnDisplayNameFromColumnId(sortInformation[0].id);
    })
    this.addEventListener("to-get-display-name-2", (e) => {
      (<CustomEvent>e).detail.fieldOption = this.config.getColumnDisplayNameFromColumnId((<CustomEvent>e).detail.id);
      //this.sortOptions[0].fieldOption = config.getColumnDisplayNameFromColumnId(sortInformation[0].id);
    })
    this.addEventListener("to-get-display-name-2", (e) => {
      (<CustomEvent>e).detail.fieldOption = this.config.getColumnDisplayNameFromColumnId((<CustomEvent>e).detail.id);
      //this.sortOptions[i].fieldOption = config.getColumnDisplayNameFromColumnId(sortInformation[i].id);
    })
    this.addEventListener("to-clear-sort-information", () => {
      this.config.clearSortInformation();
    })
    this.addEventListener("to-save-sort-information", (e) => {
      localStorage.setItem("sortInformation", JSON.stringify(this.sortModel.mapSortOptions(this.sortModel.sortOptions)));
    })
    this.addEventListener("to-set-visibility-attribute-2", (e) => {
      for (let i = 0; i < this.config.columns.length; i++) {
        const eachDataColumnGroup: NodeListOf<Element> = this.shadowRoot.querySelectorAll("." + this.config.columns[i].id);
        const headersOfEachColumn: NodeListOf<Element> = this.shadowRoot.querySelectorAll("." + this.config.columns[i].id + "-header");
        eachDataColumnGroup.forEach((element) => element.setAttribute("data-column-checkbox-checked", (<CustomEvent>e).detail.visibility[i]));
        headersOfEachColumn.forEach((element) => element.setAttribute("data-column-checkbox-checked", (<CustomEvent>e).detail.visibility[i]));
      }
    })
    this.addEventListener("to-sort-data-2", () => {
      this.sortingService.sortData(JSON.parse(localStorage.getItem("sortInformation") ?? "[]"));
    })
    this.addEventListener("to-sort-data-3", (e) => {
      this.sortingService.sortData((<CustomEvent>e).detail.mappedSortOptions);
    })
    this.addEventListener("to-blur-page-1", () => {
      this.table.classList.toggle("blured");
    })
    this.addEventListener("to-blur-page-2", () => {
      this.table.classList.toggle("blured");
    })
    this.addEventListener("to-blur-page-3", () => {
      this.table.classList.toggle("blured");
    })
  }
  createDataHeaders(): void {//exportu vardı
    const rowOfMainHeaders = document.createElement("tr");
      const rowOfChildHeaders = document.createElement("tr");
      const hasChildrens = this.config.hasAnyChildren();
      rowOfMainHeaders.classList.add("header-row");
      rowOfChildHeaders.classList.add("header-row");
      for(const column of this.config.columns) {
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
  
 createRows(): void {
   const x = JSON.parse(localStorage.getItem("sortInformation") ?? "[]");
  this.sortingService.sortData(x);
    for (const record of this.DATA_ROWS.visibleRows) {
      const dataRow = document.createElement("tr");
      dataRow.classList.add("data-row");
      for (const [recordId, recordValue] of Object.entries(record)) {
        const dataCell = document.createElement("td");
        dataCell.className = recordId;
        dataCell.setAttribute("data-column-checkbox-checked", "true");
        if (isRowRecord(recordValue)) {
          dataCell.setAttribute("data-header-expanded", "false");
          dataCell.textContent = this.config
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
      this.dataRows.append(dataRow);
      
      
    }
    
  }
  addToogleChildrensVisiblityListener(headerColumn: HTMLTableCellElement) {
    headerColumn.addEventListener("click", () => {
        const newState = headerColumn.getAttribute("data-header-expanded") === "false" ? "true" : "false";
        if (newState === "true") {
            headerColumn.rowSpan = 1;
            headerColumn.colSpan = this.config.getChildrens(headerColumn.id).length || 1;
        } else {
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
          } else {
            children.setAttribute("data-section-expanded", newState);
          }
        }
      });
  }
  

  getElementReferences() {
    this.dataRows = this.shadowRoot?.querySelector(".data-rows") as HTMLTableSectionElement;
    this.columnHeaderSection = this.shadowRoot?.querySelector("thead") as HTMLTableSectionElement;
    this.sortModel = this.shadowRoot?.querySelector(MySortingSection.TAG) as unknown as MySortingSection;//export edilmiş
    this.table = this.shadowRoot.querySelector("#data-table") as HTMLTableElement;
  }
}

customElements.define(DataGrid.TAG, DataGrid);


console.log(ColumnHider);
console.log(SearchButton);










