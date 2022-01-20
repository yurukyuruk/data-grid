import { SortingRule } from "./SortingRule.js";
import { ColumnHider } from "./columnHider.js";
import { fetchRowDatas } from "./index.js";
import { sortModel } from "./index.js";
import { createDataHeaders } from "./index.js";
import { createRows } from "./index.js";
import { addEventListenerToColumnHeadersWhichHasChildren } from "./index.js";
import { Column } from "./types/interfaces.js";
import { Data } from "./types/interfaces.js";
import { SortRule } from "./types/interfaces.js";
import { DATA_ROWS } from "./configExport.js";

export class ConfigService {
  data!: Data;
  columns!: Column[];
  sortingRules!: SortRule[];
  constructor() {
    this.fetchConfig();
  }
  fetchConfig(): Promise<void> {
    return fetch(
      "https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/datasets/dataset-2/config.json"
    )
      .then((response) => response.json())
      .then(({ columns, columnsVisiblity, dataUrl, sortingRules }: GridConfig) => {
        this.columns = columns;
        this.sortingRules = sortingRules;
        //this.columnsVisibility = columnsVisiblity;
        sortModel.setSortFieldsInSortFieldButton(this.getDisplayNamesOfAllColumns());
        createDataHeaders();
        return DATA_ROWS.fetchData(dataUrl);
      })
      .then(() => {
        createRows(DATA_ROWS.rows);
      });   
  }
  getHtmlClassNamesOfColumns(): string[] {
    const htmlClassNamesOfColumns: string[] = [];
    this.columns.forEach((column) => {
      const htmlClassName: string = column.id;
      htmlClassNamesOfColumns.push(htmlClassName);
    });
    return htmlClassNamesOfColumns;
  }

  getColumnIdFromColumnDisplayName(columnName: string): string {
    const column = this.columns.find((eachColumn) => eachColumn.displayName === columnName);
    if (column) {
      return column.id;
    }
    throw new Error("Column doesn't exist.");
  }

  getColumnTypeFromColumnDisplayName(columnName: string): string | undefined {
    const column = this.columns.find((eachColumn) => eachColumn.displayName === columnName);
    if (column) {
      return column.type;
    } else {
      return void 0;
    }
  }

  getSummaryFieldsFromColumnName(columnIndex: number): string[] {
    const summaryDetails: string | undefined = this.columns[columnIndex].summary;
    return summaryDetails === undefined ? [] : summaryDetails.split("+");
  }

  getColumnsWhichHaveChilderenColumns(): Column[] {
    return this.columns.filter((column) => column.children !== undefined);
  }

  getDisplayNamesOfAllColumns(): string[] {
    const displayNamesOfColumns: string[] = [];
    this.columns.forEach((column) => {
      displayNamesOfColumns.push(column.displayName);
    });
    return displayNamesOfColumns;
  }
  hasAnyChildren() {
    return this.columns.some((column) => column.children);
  }
  getChildrens(columnId: string): Column[] {
    return this.columns.find((colum) => colum.id === columnId)?.children ?? [];
  }
  getSummaryRule(columnId: string): string[] {
    return this.columns.find((colum) => colum.id === columnId)?.summary?.split("+") ?? [];
  }
  saveColumnVisibilityStatus(allColumnCheckboxes: NodeListOf<HTMLDivElement>): string[] {
    const columnsVisibilityStatus: string[] = [];
    allColumnCheckboxes.forEach((columnCheckbox) => {
      columnsVisibilityStatus.push(columnCheckbox.getAttribute("data-column-checkbox-checked") ?? "");
    });
    localStorage.setItem("columnVisibilityInformation", JSON.stringify(columnsVisibilityStatus));
    return columnsVisibilityStatus;
  }
  saveSortInformation(sortOptions: SortingRule[]): void {
    localStorage.setItem("sortInformation", JSON.stringify(sortModel.mapSortOptions(sortOptions)));//you cant use sort model here.
    this.sortingRules = sortOptions;
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
