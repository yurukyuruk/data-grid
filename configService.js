
//after finishing config get rid of Map.
//create a reset button
//save it in local storage.
import { SortingRule } from "./SortingRule.js";
import { ColumnHider } from "./columnHider.js";



export class ConfigService {
  constructor() {
  }
  getColumnInformation(config) {
    this.columnInformation = config;
    console.log(this.columnInformation);
    return this.columnInformation;
  }
  getSortInformation(config) {
    this.sortInformation = config;
    console.log(this.sortInformation);
    return this.sortInformation;
  }
}


//create class config service. 
//config service should have information about all columns
//config service should provide methods for getting information about column type, from column display name or column field name.
//you should use config service class for getting information about data type of sorting rule  inside sorting service class.
//config service should provide methods for saving information about sorting rules and column visibility
//iki metod olacak biri sortrule bilgisi için biri column bilgisi için.