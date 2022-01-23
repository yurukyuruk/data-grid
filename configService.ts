import { SortingRule } from "./SortingRule.js";
import { ColumnHider } from "./columnHider.js";
import { ColumnsInformation } from "./types/interfaces.js";
import { SortRule } from "./types/interfaces.js";
import { ColumnType } from "./types/enums.js";
import { fetchRowDatas } from "./index.js";
import { sortModel } from "./index.js";
import { createDataHeaders } from "./index.js";
import { addEventListenerToColumnHeadersWhichHasChildren } from "./index.js";
import { Column } from "./types/interfaces.js";
import { Data } from "./types/interfaces.js";


export class ConfigService {
  data!: null | Data;
  columns!: Column[];
  constructor() {
    this.data;
    fetch("https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/personData/dataset-2/config.json").then(async (response) => {
    this.data = await response.json();
  }).then(() => {
    this.columns = this.data.columns;
  }).then(() => {
    fetchRowDatas();
  }).then(() => {
    sortModel.setSortFieldsInSortFieldButton(this.getDisplayNamesOfAllColumns());
  }).then(() => {
    createDataHeaders();
    addEventListenerToColumnHeadersWhichHasChildren();
  })
  }

  getHtmlClassNamesOfColumns(): string[] {
    let htmlClassNamesOfColumns: string[] = [];
    this.columns.forEach(column => {
        const htmlClassName: string = column.id;
        htmlClassNamesOfColumns.push(htmlClassName); 
    })
    return htmlClassNamesOfColumns;
  }

  getColumnIdFromColumnDisplayName(columnName: string): string | void {
    const column = this.columns.find(column => column.displayName === columnName);
    if(column) {
      return column.id;
    }
  }

  getColumnTypeFromColumnDisplayName(columnName: string): ColumnType | undefined {
    const column = this.columns.find(column => column.displayName === columnName);
    if(column) {
      return column.type;
    }
  }

  getSummaryFieldsFromColumnName(columnIndex) {
    const summaryDetails = this.columns[columnIndex].summary;
    return summaryDetails.split("+");
  }
  
  getColumnsWhichHaveChilderenColumns() {
    return this.columns.filter(column => column.children !== undefined);
  }

  getDisplayNamesOfAllColumns() {
    let displayNamesOfColumns: string[] = [];
    this.columns.forEach(column => {
        displayNamesOfColumns.push(column.displayName); 
    })
    return displayNamesOfColumns;
  }
  saveColumnVisibilityStatus(allColumnCheckboxes: NodeListOf<Element>): string[] {  
    let columnsVisibilityStatus: string[] = [];
    allColumnCheckboxes.forEach(columnCheckbox => {
      columnsVisibilityStatus.push(columnCheckbox.getAttribute("data-column-checkbox-checked") ?? "");
    })
    localStorage.setItem("columnVisibilityInformation", JSON.stringify(columnsVisibilityStatus));
    return columnsVisibilityStatus;
  }
  saveSortInformation(sortOptions: SortingRule[]): void {
    localStorage.setItem("sortInformation", JSON.stringify(this.getSortOptions(sortOptions)));
  }
  getSortOptions(sortOptions: SortingRule[]) {
    return sortOptions.map(option => {
      return {
        field: option.fieldOption, 
        direction: option.directionOption
      }
    })
  }
  clearSortInformation(): void {
    localStorage.removeItem("sortInformation");
  }
  clearColumnVisibilityInformation(): void {
    localStorage.removeItem("columnVisibilityInformation");
  }
}

console.log(SortingRule);
console.log(ColumnHider);




