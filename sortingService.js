import {MySortingSection} from "./sortModel.js";
  export class SortingService {
    constructor(data) {
      this.data = data; 
    }  
    sortData(sortConfigDatas) {
      for (const sortRule of sortConfigDatas) {
        if(sortRule.type === "string") {
          return this.data.sort(this.sortStringComparator(sortRule.field, sortRule.direction));
        } else if(sortRule.type === "number") {
          this.data.sort(this.sortNumberComparator(sortRule.direction));
        } else {
          this.data.sort(this.sortDateComperator(sortRule.direction));
        }
     return this.data;
    } 
  }
    sortStringComparator(sortField, sortDirection) {
      return (a, b) => {
        if(sortDirection === "ascending"){
          return a[sortField] > b[sortField] ? 1 : -1;
        } else if(sortDirection === "descending") {
          return a[sortField] < b[sortField] ? 1 : -1;
        }
      }
    }
    sortNumberComparator(sortDirection) {
      return (a, b) => sortDirection === "ascending" ? a.age - b.age : b.age - a.age;
    }
    sortDateComperator(sortDirection) {
      return (a, b) => {
        let c = new Date(a.birthDate);
        let d = new Date(b.birthDate);
        if(sortDirection === "ascending") {
          return c - d;
        } else{
          return d - c;
        } 
      }
    }
  }
  