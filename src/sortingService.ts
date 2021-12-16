import { config } from "./configExport.js";
import { Column } from "./types/interfaces.js";
import { SortRule } from "./types/interfaces.js";
import { ColumnType, SortDirection } from "./types/enums.js";

export class SortingService {
  readonly data: Column[];
  constructor(data: Column[]) {
    this.data = data;
  }

  sortData(sortConfigDatas: SortRule[]): Column[] {
    for (const sortRule of sortConfigDatas) {
      const fieldType = config.getColumnTypeFromColumnDisplayName(sortRule.field);
      if (fieldType === ColumnType.STRING) {
        this.data.sort(this.sortStringComparator(config.getColumnIdFromColumnDisplayName(sortRule.field), sortRule.direction));
      } else if (fieldType === ColumnType.NUMBER) {
        this.data.sort(this.sortNumberComparator(config.getColumnIdFromColumnDisplayName(sortRule.field), sortRule.direction));
      } else {
        this.data.sort(this.sortDateComperator(config.getColumnIdFromColumnDisplayName(sortRule.field), sortRule.direction));
      }
    }
    return this.data;
  }
  sortStringComparator(sortField: string, sortDirection: SortDirection) {
    //create an enum asc desc
    return (a: Column, b: Column): number => {
      let result = 0;
      if (sortDirection === SortDirection.ASC) {
        result = (a[sortField] as string) > (b[sortField] as string) ? 1 : -1;
      } else if (sortDirection === SortDirection.DESC) {
        result = (a[sortField] as string) < (b[sortField] as string) ? 1 : -1;
      }
      return result;
    };
  }
  sortNumberComparator(sortField: string, sortDirection: SortDirection) {
    return (a: Column, b: Column) => (sortDirection === SortDirection.ASC ? a[sortField] - b[sortField] : b[sortField] - a[sortField]);
  }
  sortDateComperator(sortField: string, sortDirection: SortDirection) {
    return (a: Column, b: Column) => {
      const c: Date = new Date(a[sortField]);
      const d: Date = new Date(b[sortField]);
      if (sortDirection === SortDirection.ASC) {
        return c - d;
      } else {
        return d - c;
      }
    };
  }
}

//console.log(MySortingSection);