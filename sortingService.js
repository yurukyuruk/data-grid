import {MySortingSection} from "./sortModel.js";
  export class SortingService {
    constructor(data) {
      this.data = data;
      console.log(this.data);
    }
    getSortOptions(fieldName, sortDirection, sortType) {
        let chosenSortFieldsArray = fieldName;
        let chosenSortDirectionsArray = sortDirection;
        let sortConfig = [];
        for(let i = 0; i < chosenSortFieldsArray.length; i++) {
          const sortRule = {
            field: chosenSortFieldsArray[i],
            type: sortType[i],
            direction: chosenSortDirectionsArray[i]
          };
          sortConfig.push(sortRule);
        }
        console.log(sortConfig);
    }   
  }
