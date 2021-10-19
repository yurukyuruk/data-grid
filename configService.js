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