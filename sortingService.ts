import { config } from "./configExport.js";
import { MySortingSection } from "./sortModel.js";
import { ColumnRow } from "./types/interfaces.js";
import { SortRule } from "./types/interfaces.js";
import { ColumnType, SortDirection } from "./types/enums.js";

export class SortingService {
  readonly data: ColumnRow[];
  constructor(data: ColumnRow[]) {
    this.data = data;
  }
  
  sortData(sortConfigDatas: SortRule[]): ColumnRow[] {
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
  sortStringComparator(sortField: string, sortDirection: SortDirection) {//create an enum asc desc
    return (a: ColumnRow, b: ColumnRow): number => {
      let result: number = 0;
      if (sortDirection === SortDirection.ASC) {
        result = (a[sortField] as string) > (b[sortField] as string) ? 1 : -1;
      } else if (sortDirection === SortDirection.DESC) {
        result = (a[sortField] as string) < (b[sortField] as string) ? 1 : -1;
      }
      return result;
    }
  }
  sortNumberComparator(sortField: string, sortDirection: SortDirection) {
    return (a: ColumnRow, b: ColumnRow) => sortDirection === SortDirection.ASC ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
  }
  sortDateComperator(sortField: string, sortDirection: SortDirection) {
    return (a: ColumnRow, b: ColumnRow) => {
      let c: Date = new Date(a[sortField]);
      let d: Date = new Date(b[sortField]);
      if (sortDirection === SortDirection.ASC) {
        return c - d;
      } else {
        return d - c;
      }
    }
  }
}

//console.log(MySortingSection);