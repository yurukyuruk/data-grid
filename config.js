//create column elements inside a loop by creating a method.and also add event listeners.
//config object needs to be empty. export it.it will be created dinamically.
//after finishing config get rid of Map.
//save also information about hidden columns, type of columns and so on.
//export const config = {sortingRules: [{field: , direction:}]};

//save also sorting rules type.
//create a reset button
/*config = {
  sortingRules: [],
  columns: [
    {name: 'firstName', displayName: 'first name', type: 'string', visible: true}
  ]
}*/

//save it in local storage.
import { MySortingSection } from "./sortModel.js";
 export let config = {};
 //config.sortingRules = [{field: , direction:}];
 //config.columns = {name: , displayName: , type: , visible: };
// let a = new MySortingSection();

 //config.push(a.getSortOptions());
 //console.log(config);

//create class config service. 
//config service should have information about all columns
//config service should provide methods for getting information about column type, from column display name or column field name.
//you should use config service class for getting information about data type of sorting rule  inside sorting service class.
//config service should provide methods for saving information about sorting rules and column visibility
//iki metod olacak biri sortrule bilgisi için biri column bilgisi için.