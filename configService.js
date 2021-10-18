import { SortingRule } from "./SortingRule.js";
import { ColumnHider } from "./columnHider.js";
export class ConfigService {
  constructor() {
    this.columns = new Map();
    this.columns.set("id", { name: "id", type: "string" });//display names became name
    this.columns.set("gender", { name: "gender", type: "string" });
    this.columns.set("first name", { name: "firstName", type: "string" });
    this.columns.set("last name", { name: "lastName", type: "string" });
    this.columns.set("birth date", { name: "birthDate", type: "date" });
    this.columns.set("age", { name: "age", type: "number" });
    this.columns.set("e-mail", { name: "email", type: "string" });
    this.columns.set("address", { name: "address", type: "string" });
  }
  
  
  setcolumnNames(columnNames) {
    this.columnNames = columnNames;
  }
  getColumnNames() {
    return this.columnNames;
  }


  setColumnDisplayNames(columnDisplayNames) {
    this.columnDisplayNames = columnDisplayNames;
  }
  getColumnDisplayNames() {
    return this.columnDisplayNames;
  }
  

  setColumnTypes(columnNames) {
    this.columnTypes = []; 
    for(let i = 0; i < columnNames.length; i++) {
      if(columnNames[i] === "age") {
        this.columnTypes.push("number");
      } else if(columnNames[i] === "birthDate") {
        this.columnTypes.push("date");
      } else {
        this.columnTypes.push("string");
      }
    }
  }
  getColumnTypes() {
    return this.columnTypes;
  }


  setColumnsVisibility(columnsVisibility) {
    this.columnsVisibility = columnsVisibility;
  }
  getColumnsVisibility() {
    return this.columnsVisibility;
  }


  setSortInformation(data) {
    this.sortInformation = data;
  }
  getSortInformation() {
    return this.sortInformation;
  }
}




//save sortinformation and evetryting about local storage and as a field in here.
//solve storing map in local storage.
//get rid type methods in sort modal
//take care of local storage. operations connected with local storage should go through here.