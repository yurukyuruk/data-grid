import { SortingRule } from "./SortingRule.js";
import { ColumnHider } from "./columnHider.js";
export class ConfigService {
  constructor() {
    this.columns = new Map();
    this.columns.set("id", { name: "id", htmlClassName: "id", type: "string" });//display names became name
    this.columns.set("gender", { name: "gender", htmlClassName: "gender", type: "string" });
    this.columns.set("first name", { name: "firstName", htmlClassName: "first-name", type: "string" });
    this.columns.set("last name", { name: "lastName", htmlClassName: "last-name", type: "string" });
    this.columns.set("birth date", { name: "birthDate", htmlClassName: "birth-date", type: "date" });
    this.columns.set("age", { name: "age", htmlClassName: "age", type: "number" });
    this.columns.set("e-mail", { name: "email", htmlClassName: "email", type: "string" });
    this.columns.set("address", { name: "address", htmlClassName: "address", type: "string" });
    this.columnKeys = [ ...this.columns.keys() ];
    this.addressColumn = new Map();
    this.addressColumn.set("country", {name: "country", htmlClassName: "country", type: "string"});
    this.addressColumn.set("state", {name: "state", htmlClassName: "state", type: "string"});
    this.addressColumn.set("city", {name: "city", htmlClassName: "city", type: "string"});
    this.addressColumn.set("street", {name: "street", htmlClassName: "street", type: "string"});
    this.addressColumn.set("house number", {name: "houseNumber", htmlClassName: "house-number", type: "number"});
    this.addressColumnKeys = [ ...this.addressColumn.keys() ];
  }

  getColumnHtmlClassNames() {
    let columnHtmlClassNames = [];
    this.columnKeys.forEach(key => {
      columnHtmlClassNames.push(this.columns.get(key).htmlClassName);
    })
    return columnHtmlClassNames;
  }
  
  getAddressColumnHtmlClassNames() {
    let addressColumnHtmlClassNames = [];
    this.addressColumnKeys.forEach(key => {
      addressColumnHtmlClassNames.push(this.addressColumn.get(key).htmlClassName);
    })
    return addressColumnHtmlClassNames;
  }
  saveColumnVisibilityStatus(allColumnCheckboxes) {  
    let columnsVisibilityStatus = [];
    allColumnCheckboxes.forEach(columnCheckbox => {
      columnsVisibilityStatus.push(columnCheckbox.getAttribute("data-column-checkbox-checked"));
    })
    localStorage.setItem("columnVisibilityInformation", JSON.stringify(columnsVisibilityStatus));//save them with column names
    return columnsVisibilityStatus;
  }
  saveAddressColumnVisibilityStatus(addressHeader) {
    localStorage.setItem("addressColumnVisibilityStatus", JSON.stringify(addressHeader.getAttribute("data-address-section-expanded")));
  }
  getSortOptions(sortOptions) {
    return sortOptions.map(option => {
      return {
        field: option.fieldOption, 
        direction: option.directionOption
      }
    })
  }
  setSortInformation(sortOptionsList) {
    sortOptionsList.forEach(sortOptions => {
      sortOptions.type = this.columns.get(sortOptions.field).type;
    })
    return sortOptionsList;
  }
}





//save sortinformation and evetryting about local storage and as a field in here.
//solve storing map in local storage.
//get rid type methods in sort modal
//take care of local storage. operations connected with local storage should go through here.
//get rid of apply button in columnhider