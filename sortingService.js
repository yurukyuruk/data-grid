import { config } from "./index.js";
import { MySortingSection } from "./sortModel.js";
export class SortingService {
  constructor(data) {
    this.data = data;
  }
  sortData(sortConfigDatas) {
    for (const sortRule of sortConfigDatas) {
      if (sortRule.type === "string") {
        this.data.sort(this.sortStringComparator(config.columns.get(sortRule.field).name, sortRule.direction));
      } else if (sortRule.type === "number") {
        this.data.sort(this.sortNumberComparator(sortRule.field, sortRule.direction));
      } else {
        this.data.sort(this.sortDateComperator(sortRule.field, sortRule.direction));
      }
    }
    return this.data;//i doont need that for
  }
  sortStringComparator(sortField, sortDirection) {
    return (a, b) => {
      if (sortDirection === "ascending") {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else if (sortDirection === "descending") {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    }
  }
  sortNumberComparator(sortField, sortDirection) {
    return (a, b) => sortDirection === "ascending" ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
  }
  sortDateComperator(sortField, sortDirection) {
    return (a, b) => {
      let c = new Date(a[sortField]);
      let d = new Date(b[sortField]);
      if (sortDirection === "ascending") {
        return c - d;
      } else {
        return d - c;
      }
    }
  }
}
/*understand how sortdata method work
how to imrove this sortdata method
*/