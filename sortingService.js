import {MySortingSection} from "./sortModel.js";
  export class SortingService {
    constructor(data) {
      this.data = data;
      
    }
      
    sortData(sortConfigDatas) {
      if(sortConfigDatas[0].type === "number") {
        this.data.sort((a, b) => {
          if(sortConfigDatas[0].direction === "ascending") {
            return a.age - b.age;
          } else if(sortConfigDatas[0].direction === "descending") {
            return b.age - a.age;
          }  
        });
        return this.data; 
      }

      if(sortConfigDatas[0].type === "date") {
        this.data.sort((a, b) => {
          let c = new Date(a.birthDate);
          let d = new Date(b.birthDate);
          if(sortConfigDatas[0].direction === "ascending") {
            return c - d;
          } else if(sortConfigDatas[0].direction === "descending") {
            return d - c;
          }
        });
        return this.data;
      }

      if(sortConfigDatas[0].field === "id" && sortConfigDatas[0].type === "string") {
          this.data.sort((a,b)=> {
            if(sortConfigDatas[0].direction === "ascending") {
              return a.id > b.id ? 1 : -1;
            } else if(sortConfigDatas[0].direction === "descending") {
              return a.id < b.id ? 1 : -1;
            } 
          });
        return this.data;
      } 

      if(sortConfigDatas[0].field === "gender" && sortConfigDatas[0].type === "string") {
        this.data.sort((a,b) => {
          if(sortConfigDatas[0].direction === "ascending") {
            return a.gender > b.gender ? 1 : -1;
          } else if(sortConfigDatas[0].direction === "descending") {
            a.gender < b.gender ? 1 : -1;
          }
        })
        return this.data;
      } 

      if(sortConfigDatas[0].field === "first name" && sortConfigDatas[0].type === "string") {
        this.data.sort((a,b) => {
          if(sortConfigDatas[0].direction === "ascending") {
            return a.firstName > b.firstName ? 1 : -1;
          } else if(sortConfigDatas[0].direction === "descending") {
            return a.firstName < b.firstName ? 1 : -1;
          }
        })
        return this.data;
      } 

      if(sortConfigDatas[0].field === "last name" && sortConfigDatas[0].type === "string") {
        this.data.sort((a,b) => {
          if(sortConfigDatas[0].direction === "ascending") {
            return a.lastName > b.lastName ? 1 : -1;
          } else if(sortConfigDatas[0].direction === "descending") {
            return a.lastName < b.lastName ? 1 : -1;
          }
        })
        return this.data;
      } 
      
      if(sortConfigDatas[0].field === "e-mail" && sortConfigDatas[0].type === "string") {
        this.data.sort((a,b) => {
          if(sortConfigDatas[0].direction === "ascending") {
            return a.email > b.email ? 1 : -1;
          } else if(sortConfigDatas[0].direction === "descending") {
            return a.email < b.email ? 1 : -1;
          }
        })
        return this.data;
      } 

      if(sortConfigDatas[0].field === "address" && sortConfigDatas[0].type === "string") {
        this.data.sort((a,b) => {
          if(sortConfigDatas[0].direction === "ascending") {
            return a.address.city > b.address.city ? 1 : -1;
          } else if(sortConfigDatas[0].direction === "descending") {
            return a.address.city < b.address.city ? 1 : -1;  
          }
        })
        return this.data;
      } 
    }  
  }
