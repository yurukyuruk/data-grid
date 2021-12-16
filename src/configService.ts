import { SortingRule } from "./SortingRule.js";
import { ColumnHider } from "./columnHider.js";
import { fetchRowDatas } from "./index.js";
import { sortModel } from "./index.js";
import { createDataHeaders } from "./index.js";
import { addEventListenerToColumnHeadersWhichHasChildren } from "./index.js";
import { Column } from "./types/interfaces.js";
import { Data } from "./types/interfaces.js";
import { SortRule } from "./types/interfaces.js";

export class ConfigService {
  data!: Data;
  columns!: Column[];
  constructor() {
    this.data;
    fetch(
      "https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/personData/dataset-2/config.json"
    )
      .then(async (response) => {
        this.data = await response.json();
      })
      .then(() => {
        this.columns = this.data.columns;
      })
      .then(() => {
        fetchRowDatas();
      })
      .then(() => {
        sortModel.setSortFieldsInSortFieldButton(this.getDisplayNamesOfAllColumns());
      })
      .then(() => {
        createDataHeaders();
        addEventListenerToColumnHeadersWhichHasChildren();
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

  getColumnIdFromColumnDisplayName(columnName: string): string | void {
    const column = this.columns.find((eachColumn) => eachColumn.displayName === columnName);
    if (column) {
      return column.id;
    }
  }

  getColumnTypeFromColumnDisplayName(columnName: string): string | undefined {
    const column = this.columns.find((eachColumn) => eachColumn.displayName === columnName);
    if (column) {
      return column.type;
    } else {
      return void 0;
    }
  }

  getSummaryFieldsFromColumnName(columnIndex: number): string[] | undefined {
    const summaryDetails: string | undefined = this.columns[columnIndex].summary;
    if (summaryDetails) {
      return summaryDetails.split("+");
    } else {
      return void 0;
    }
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
  saveColumnVisibilityStatus(allColumnCheckboxes: NodeListOf<Element>): string[] {
    const columnsVisibilityStatus: string[] = [];
    allColumnCheckboxes.forEach((columnCheckbox) => {
      columnsVisibilityStatus.push(columnCheckbox.getAttribute("data-column-checkbox-checked") ?? "");
    });
    localStorage.setItem("columnVisibilityInformation", JSON.stringify(columnsVisibilityStatus));
    return columnsVisibilityStatus;
  }
  saveSortInformation(sortOptions: SortingRule[]): void {
    localStorage.setItem("sortInformation", JSON.stringify(this.getSortOptions(sortOptions)));
  }
  getSortOptions(sortOptions: SortingRule[]): SortRule[] {
    return sortOptions.map((option) => {
      return {
        field: option.fieldOption,
        direction: option.directionOption
      };
    });
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
