import { SortingRule } from "./SortingRule.js";
import { ColumnHider } from "./ColumnHider.js";
import { sortModel } from "./index.js";
import { createDataHeaders } from "./index.js";
import { createRows } from "./index.js";
import { Column, GridConfig } from "./types/interfaces.js";
import { Data } from "./types/interfaces.js";
import { SortRule } from "./types/interfaces.js";
import { config, DATA_ROWS, sortingService} from "./configExport.js";

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
      .then(({ columns, dataUrl, sortingRules }: GridConfig) => {
        this.columns = columns;
        this.sortingRules = sortingRules;
        sortModel.setSortFieldsInSortFieldButton(this.getDisplayNamesOfAllColumns());
        createDataHeaders();
        return DATA_ROWS.fetchData(dataUrl);
      })
      .then(() => {
        createRows(DATA_ROWS.rows);
        if (localStorage.getItem("sortInformation") !== null) {
        const dataRows = document.querySelector(".data-rows");
        if(dataRows) {
          dataRows.innerHTML = "";
        }
        sortingService.sortData(JSON.parse(localStorage.getItem("sortInformation") ?? "[]"));
        createRows(DATA_ROWS.visibleRows);
      }
      const columnsVisibility: string[] = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "[]");
      for (let i = 0; i < config.columns.length; i++) {
        const eachDataColumnGroup: NodeListOf<Element> = document.querySelectorAll("." + config.columns[i].id);
        const headersOfEachColumn: NodeListOf<Element> = document.querySelectorAll("." + config.columns[i].id + "-header");
        eachDataColumnGroup.forEach((element) => element.setAttribute("data-column-checkbox-checked", columnsVisibility[i]));
        headersOfEachColumn.forEach((element) => element.setAttribute("data-column-checkbox-checked", columnsVisibility[i]));
      }
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
  getVisibleColumnIds() {
    const columnsVisibility = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "[]");
    let visibleColumnIds = [];
    for(let i = 0; i < columnsVisibility.length; i++) {
      if(columnsVisibility[i] === "true") {
        visibleColumnIds.push(this.columns[i].id);
      }
    }
    return visibleColumnIds;
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
    localStorage.setItem("sortInformation", JSON.stringify(sortModel.mapSortOptions(sortOptions)));
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
