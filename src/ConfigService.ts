import { Column, GridConfig } from "./types/interfaces.js";
import { Data } from "./types/interfaces.js";
import { SortRule } from "./types/interfaces.js";
export class ConfigService {
  data!: Data;
  columns!: Column[];
  sortingRules!: SortRule[];
  filteringRule: string;
  userFilterInput: string;
  columnVisibilityRules!: boolean[];
  constructor() {
    this.filteringRule = localStorage.getItem("filterInformation") ?? "";
    this.userFilterInput = localStorage.getItem("userFilterInput" ?? "");
  }
  async fetchConfig(): Promise<string> {
    return fetch(
      "https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/datasets/dataset-2/config.json"
    )
      .then((response) => response.json())
      .then(({ columns, dataUrl, sortingRules }: GridConfig) => {
        this.columns = columns;
        if(localStorage.getItem("sortInformation") === null) {
          this.sortingRules = sortingRules;
        } else {
          this.sortingRules = JSON.parse(localStorage.getItem("sortInformation"));
        } 
        if(localStorage.getItem("columnVisibilityInformation") === null) {
          this.columnVisibilityRules = this.getColumnVisibilityStatus();
        } else {
          this.columnVisibilityRules = JSON.parse(localStorage.getItem("columnVisibilityInformation"));
        }
        return dataUrl;
      })
  }
  getHtmlClassNamesOfColumns(): string[] {
    const htmlClassNamesOfColumns: string[] = [];
    this.columns.forEach((column) => {
      const htmlClassName: string = column.id;
      htmlClassNamesOfColumns.push(htmlClassName);
    });
    return htmlClassNamesOfColumns;
  }

  getColumnIdFromColumnDisplayName = (columnName: string): string => {
    const column = this.columns.find((eachColumn) => eachColumn.displayName === columnName);
    if (column) {
      return column.id;
    }
    throw new Error("Column doesn't exist.");
  }

  public getColumnTypeFromColumnId: (columnName: string) => string | undefined = (columnName: string) => {
    const column = this.columns.find((eachColumn) => eachColumn.id === columnName);
    if (column) {
      return column.type;
    } else {
      return void 0;
    }
  }
  getColumnDisplayNameFromColumnId(columnName: string): string | undefined {
    const column = this.columns.find((column) => column.id === columnName);
    if (column) {
      return column.displayName;
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
  getColumnsWhichHaveNoChildrenColumns(): Column[] {
    return this.columns.filter((column) => column.children === undefined);
  }

  getDisplayNamesOfColumnsWhichHaveNoChildren(): string[] {
    const displayNamesOfColumns: string[] = [];
    this.getColumnsWhichHaveNoChildrenColumns().forEach((column) => {
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
    let columnsVisibility;
    if(localStorage.getItem("columnVisibilityInformation") === null) {
      columnsVisibility = this.getColumnVisibilityStatus();
    } else {
      columnsVisibility = JSON.parse(localStorage.getItem("columnVisibilityInformation"));
    }
    let visibleColumnIds = [];
    for(let i = 0; i < columnsVisibility.length; i++) {
      if(columnsVisibility[i] === true) {
        visibleColumnIds.push(this.columns[i].id);
      }
    }
    return visibleColumnIds;
  }
  getColumnVisibilityStatus(reset?: string): boolean[] {
    const columnsVisibilityStatus: boolean[] = [];
    if(reset === "reset") {
      this.columns.forEach(column => {
          columnsVisibilityStatus.push(true);  
      })
      localStorage.setItem("columnVisibilityInformation", JSON.stringify(columnsVisibilityStatus));
      this.columnVisibilityRules = columnsVisibilityStatus;
    } else {
      this.columns.forEach(column => {
        if(column.visible !== undefined) {
          columnsVisibilityStatus.push(column.visible);
        } else {
          columnsVisibilityStatus.push(true);
        }
      })
    }
    return columnsVisibilityStatus;
  }
  saveColumnVisibilityStatus(allColumnCheckboxes: NodeListOf<HTMLDivElement>): boolean[] {
    const columnsVisibilityStatus: boolean[] = [];
    allColumnCheckboxes.forEach((columnCheckbox) => {
      columnsVisibilityStatus.push(columnCheckbox.getAttribute("data-column-checkbox-checked") === "true");
    });
    localStorage.setItem("columnVisibilityInformation", JSON.stringify(columnsVisibilityStatus));
    this.columnVisibilityRules = columnsVisibilityStatus;
    return columnsVisibilityStatus;
  }
  saveSortInformation(mappedSortOptions: SortRule[]): void {
    localStorage.setItem("sortInformation", JSON.stringify(mappedSortOptions));
    this.sortingRules = mappedSortOptions;
  }
  
  clearSortInformation(): void {
    localStorage.setItem("sortInformation", JSON.stringify([]));
  }
  saveUserFilterInput(inputValue: string, userInput: string): void {
    localStorage.setItem("filterInformation", inputValue);
    localStorage.setItem("userFilterInput", userInput);
    this.filteringRule = inputValue;
  }
}


