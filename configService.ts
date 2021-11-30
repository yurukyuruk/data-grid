import { SortingRule } from "./SortingRule.js";
import { ColumnHider } from "./columnHider.js";
import { ColumnsInformation } from "./types/interfaces.js";
import { SortRule } from "./types/interfaces.js";
import { ColumnType } from "./types/enums.js";
import { fetchRowDatas } from "./index.js";
import { sortModel } from "./index.js";

export class ConfigService {
  columns: Map<string, ColumnsInformation>;
  private columnKeys: string[];
  private addressColumn: Map<string, ColumnsInformation>;
  private addressColumnKeys: string[];
  constructor() {
    this.data;
    fetch("https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/personData/config.json").then(async (response) => {
    this.data = await response.json();
  }).then(() => {
    this.columns = this.data.columns;
  }).then(() => {
    fetchRowDatas();
  }).then(() => {
    sortModel.setSortFieldsInSortFieldButton(this.getDisplayNamesOfAllColumns());
  })
    /*this.columns = [
      { 
        id : "id",
        displayName : "id",
        htmlClassName : "id",
        type : "string",
      },
      {
        id : "gender",
        displayName : "gender",
        htmlClassName : "gender",
        type : "string",
      },
      {
        id : "firstName",
        displayName : "first name",
        htmlClassName : "first-name",  
        type : "string",
      },
      {
        id : "lastName",
        displayName : "last name",
        htmlClassName : "last-name",
        type : "string",
      },
      {
        id : "birthDate",
        displayName : "birth date",
        htmlClassName : "birth-date",
        type : "date",
      },
      {
        id : "age",
        displayName : "age",
        htmlClassName : "age",
        type : "number",
      },
      {
        id : "email",
        displayName : "e-mail",
        htmlClassName : "email",
        type : "string",
      },
      {
        id : "address",
        displayName : "address",
        htmlClassName : "address",
        type : "string",
        children : [
          {
            id : "country",
            displayName : "country",
            htmlClassName : "country",
            type : "string",
          },
          {
            id : "state",
            displayName : "state",
            htmlClassName : "state",
            type : "string",
          },
          {
            id : "city",
            displayName : "city",
            htmlClassName : "city",
            type : "string",
          },
          {
            id : "street",
            displayName : "street",
            htmlClassName : "street",
            type : "string",
          },
          {
            id : "houseNumber",
            displayName : "house number",
            htmlClassName : "house-number",
            type : "number",
          }
       ]
      }
    ]*/
  }

  getHtmlClassNameFromDisplayName(displayName) { 
    return displayName.replace(" ", '-').toLowerCase();
  }

  getHtmlClassNamesOfColumns(): string[] {
    let htmlClassNamesOfColumns: string[] = [];
    this.columns.forEach(column => {
        const htmlClassName = this.getHtmlClassNameFromDisplayName(column.displayName);
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
  
  getColumnsWhichHaveChilderenColumns() {
    return this.columns.filter(column => column.children !== undefined);
  }
  getHtmlClassNamesOfAllChildColumns():any {
    let htmlClassNamesOfAllChildColumns = [];
    this.getColumnsWhichHaveChilderenColumns().forEach(column => {
      let htmlClassNames = [];
      column.children.forEach(childColumn => {
        htmlClassNames.push(childColumn.htmlClassName);
      });
      htmlClassNamesOfAllChildColumns.push(htmlClassNames);
    });
    return htmlClassNamesOfAllChildColumns;
  }

  getDisplayNamesOfAllColumns() {
    let displayNamesOfColumns: string[] = [];
    this.columns.forEach(column => {
        displayNamesOfColumns.push(column.displayName); 
    })
    return displayNamesOfColumns;
  }

  /*checkIfColumnHasChild(className) {
    let currentColumn = this.columns.find(column => column.htmlClassName === className);
    if(currentColumn.children === undefined) {
        return false;
    }
    return true;
  }*/
  saveColumnVisibilityStatus(allColumnCheckboxes: NodeListOf<Element>): string[] {  
    let columnsVisibilityStatus: string[] = [];
    allColumnCheckboxes.forEach(columnCheckbox => {
      columnsVisibilityStatus.push(columnCheckbox.getAttribute("data-column-checkbox-checked") ?? "");
    })
    localStorage.setItem("columnVisibilityInformation", JSON.stringify(columnsVisibilityStatus));
    return columnsVisibilityStatus;
  }
  saveAddressColumnVisibilityStatus(addressHeader: HTMLTableCellElement): void {
    localStorage.setItem("addressColumnVisibilityStatus", JSON.stringify(addressHeader.getAttribute("data-address-section-expanded")));
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



//save sortinformation and evetryting about local storage and as a field in here.
//solve storing map in local storage.
//get rid type methods in sort modal
//take care of local storage. operations connected with local storage should go through here.
//get rid of apply button in columnhider