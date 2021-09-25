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
      if(this.sortConfig[0].type === "number") {
        data.sort((a, b) => {
          if(this.sortConfig[0].direction === "ascending") {
            return a.age - b.age;
          } else if(this.sortConfig[0].direction === "descending") {
            return b.age - a.age;
          }  
        });
        return data; 
      }

      if(this.sortConfig[0].type === "date") {
        data.sort((a, b) => {
          let c = new Date(a.birthDate);
          let d = new Date(b.birthDate);
          if(this.sortConfig[0].direction === "ascending") {
            return c - d;
          } else if(this.sortConfig[0].direction === "descending") {
            return d - c;
          }
        });
        return data;
      }

      if(this.sortConfig[0].field === "id" && this.sortConfig[0].type === "string") {
          data.sort((a,b)=> {
            if(this.sortConfig[0].direction === "ascending") {
              return a.id > b.id ? 1 : -1;
            } else if(this.sortConfig[0].direction === "descending") {
              return a.id < b.id ? 1 : -1;
            } 
          });
        return data;
      } 

      if(this.sortConfig[0].field === "gender" && this.sortConfig[0].type === "string") {
        data.sort((a,b) => {
          if(this.sortConfig[0].direction === "ascending") {
            return a.gender > b.gender ? 1 : -1;
          } else if(this.sortConfig[0].direction === "descending") {
            a.gender < b.gender ? 1 : -1;
          }
        })
        return data;
      } 

      if(this.sortConfig[0].field === "first name" && this.sortConfig[0].type === "string") {
        data.sort((a,b) => {
          if(this.sortConfig[0].direction === "ascending") {
            return a.firstName > b.firstName ? 1 : -1;
          } else if(this.sortConfig[0].direction === "descending") {
            return a.firstName < b.firstName ? 1 : -1;
          }
        })
        return data;
      } 

      if(this.sortConfig[0].field === "last name" && this.sortConfig[0].type === "string") {
        data.sort((a,b) => {
          if(this.sortConfig[0].direction === "ascending") {
            return a.lastName > b.lastName ? 1 : -1;
          } else if(this.sortConfig[0].direction === "descending") {
            return a.lastName < b.lastName ? 1 : -1;
          }
        })
        return data;
      } 
      
      if(this.sortConfig[0].field === "e-mail" && this.sortConfig[0].type === "string") {
        data.sort((a,b) => {
          if(this.sortConfig[0].direction === "ascending") {
            return a.email > b.email ? 1 : -1;
          } else if(this.sortConfig[0].direction === "descending") {
            return a.email < b.email ? 1 : -1;
          }
        })
        return data;
      } 

      if(this.sortConfig[0].field === "address" && this.sortConfig[0].type === "string") {
        data.sort((a,b) => {
          if(this.sortConfig[0].direction === "ascending") {
            return a.address.city > b.address.city ? 1 : -1;
          } else if(this.sortConfig[0].direction === "descending") {
            return a.address.city < b.address.city ? 1 : -1;
          }
        })
        return data;
      } 
    }  
  }
