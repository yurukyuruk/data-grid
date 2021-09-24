import {MySortingSection} from "./sortModel.js";
  export class SortingService {
    constructor(data) {
      this.data = data;
      this.sortConfig = [];
    }
    getSortOptions(fieldName, sortDirection, sortType) {
        
        for(let i = 0; i < fieldName.length; i++) {
          const sortRule = {
            field: fieldName[i],
            type: sortType[i],
            direction: sortDirection[i]
          };
          this.sortConfig.push(sortRule);
        }
        return this.sortConfig;
    }  
    sortData(data) {
      if(this.sortConfig[0].type === "number" && this.sortConfig[0].direction === "ascending") {
        data.sort(function(a, b) {
          return a.age - b.age;
        });
        return data; 
      } else if(this.sortConfig[0].type === "number" && this.sortConfig[0].direction === "descending") {
        data.sort(function(a, b) {
          return b.age - a.age;
        });
        return data;
      }

      if(this.sortConfig[0].type === "date" && this.sortConfig[0].direction === "ascending") {
        data.sort(function(a, b) {
          let c = new Date(a.birthDate);
          let d = new Date(b.birthDate);
          return c - d;
        });
        return data;
      } else if(this.sortConfig[0].type === "date" && this.sortConfig[0].direction === "descending") {
        data.sort(function(a, b) {
          let c = new Date(a.birthDate);
          let d = new Date(b.birthDate);
          return d - c;
        })
        return data;
      }

      if(this.sortConfig[0].field === "id" && this.sortConfig[0].type === "string" && this.sortConfig[0].direction === "ascending") {
        data.sort((a,b)=> (a.id > b.id ? 1 : -1))
        return data;
      } else if(this.sortConfig[0].field === "id" && this.sortConfig[0].type === "string" && this.sortConfig[0].direction === "descending") {
        data.sort((a,b)=> (a.id < b.id ? 1 : -1))
        return data;
      }
      if(this.sortConfig[0].field === "gender" && this.sortConfig[0].type === "string" && this.sortConfig[0].direction === "ascending") {
        data.sort((a,b)=> (a.gender > b.gender ? 1 : -1))
        return data;
      } else if(this.sortConfig[0].field === "gender" && this.sortConfig[0].type === "string" && this.sortConfig[0].direction === "descending") {
        data.sort((a,b)=> (a.gender < b.gender ? 1 : -1))
        return data;
      }
      if(this.sortConfig[0].field === "firstName" && this.sortConfig[0].type === "string" && this.sortConfig[0].direction === "ascending") {
        data.sort((a,b)=> (a.firstName > b.firstName ? 1 : -1))
        return data;
      } else if(this.sortConfig[0].field === "firstName" && this.sortConfig[0].type === "string" && this.sortConfig[0].direction === "descending") {
        data.sort((a,b)=> (a.firstName < b.firstName ? 1 : -1))
        return data;
      }
      if(this.sortConfig[0].field === "lastName" && this.sortConfig[0].type === "string" && this.sortConfig[0].direction === "ascending") {
        data.sort((a,b)=> (a.lastName > b.lastName ? 1 : -1))
        return data;
      } else if(this.sortConfig[0].field === "lastName" && this.sortConfig[0].type === "string" && this.sortConfig[0].direction === "descending") {
        data.sort((a,b)=> (a.lastName < b.lastName ? 1 : -1))
        return data;
      }
      if(this.sortConfig[0].field === "e-mail" && this.sortConfig[0].type === "string" && this.sortConfig[0].direction === "ascending") {
        data.sort((a,b)=> (a.email > b.email ? 1 : -1))
        return data;
      } else if(this.sortConfig[0].field === "e-mail" && this.sortConfig[0].type === "string" && this.sortConfig[0].direction === "descending") {
        data.sort((a,b)=> (a.email < b.email ? 1 : -1))
        return data;
      }
      if(this.sortConfig[0].field === "address" && this.sortConfig[0].type === "string" && this.sortConfig[0].direction === "ascending") {
        data.sort((a,b)=> (a.address > b.address ? 1 : -1))
        return data;
      } else if(this.sortConfig[0].field === "address" && this.sortConfig[0].type === "string" && this.sortConfig[0].direction === "descending") {
        data.sort((a,b)=> (a.address < b.address ? 1 : -1))
        return data;
      }
    
    }  
  }
