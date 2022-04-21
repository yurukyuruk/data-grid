import { Column, GridConfig } from "./types/interfaces.js";
import { Data } from "./types/interfaces.js";
import { SortRule } from "./types/interfaces.js";
export class ConfigService {
  data!: Data;
  columns!: Column[];
  sortingRules!: SortRule[];
  constructor() {
    // this.fetchConfig();
  }
  async fetchConfig(): Promise<string> {
    return fetch(
      "https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/datasets/dataset-2/config.json"
    )
      .then((response) => response.json())
      .then(({ columns, dataUrl, sortingRules }: GridConfig) => {
        this.columns = columns;
        this.sortingRules = sortingRules;
        const toSetSortFields: CustomEvent = new CustomEvent("to-set-sort-fields", {
          bubbles: true,
          composed: true,
        });
        document.dispatchEvent(toSetSortFields);
        // ONce you set all configuration you want to return url under wich you can find data
        return dataUrl;
      })
      .then((dataUrl) => {
        const toCreateDataRows: CustomEvent = new CustomEvent("to-create-data-rows", {
          bubbles: true,
          composed: true,
        });
        document.dispatchEvent(toCreateDataRows);

        
        if (localStorage.getItem("sortInformation") !== null) {
        const dataRows = document.querySelector(".data-rows");
        if(dataRows) {
          dataRows.innerHTML = "";
        }
        const toSortData: CustomEvent = new CustomEvent("to-sort-data", {
          bubbles: true,
          composed: true,
        });
        document.dispatchEvent(toSortData);
        const toRecreateDataRows: CustomEvent = new CustomEvent("to-recreate-data-rows", {
          bubbles: true,
          composed: true,
        });
        document.dispatchEvent(toRecreateDataRows);
        
      }
      const toSetVisibilityAttribute: CustomEvent = new CustomEvent("to-set-visibility-attribute", {
        bubbles: true,
        composed: true,
      });
      document.dispatchEvent(toSetVisibilityAttribute);
      return dataUrl;
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

  getColumnTypeFromColumnId(columnName: string): string | undefined {
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
    const toMapSortOptions: CustomEvent = new CustomEvent("to-map-sort-options", {
      bubbles: true,
      composed: true,
    });
    document.dispatchEvent(toMapSortOptions);
    
  }
  
  clearSortInformation(): void {
    localStorage.removeItem("sortInformation");
  }
  clearColumnVisibilityInformation(): void {
    localStorage.removeItem("columnVisibilityInformation");
  }
}


