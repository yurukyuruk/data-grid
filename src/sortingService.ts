import { config } from "./configExport.js";
import { RowRecord } from "./types/interfaces.js";
import { SortRule } from "./types/interfaces.js";
import { ColumnType, SortDirection } from "./types/enums.js";
import { DataRows } from "./DataRows.js";

export class SortingService {
  constructor() {}

  sortData(sortConfigDatas: SortRule[]): RowRecord[] {
    for (const sortRule of sortConfigDatas) {
      const fieldType = config.getColumnTypeFromColumnDisplayName(sortRule.id);
      if (fieldType === ColumnType.STRING) {
        this.dataRows.sort(this.sortStringComparator(config.getColumnIdFromColumnDisplayName(sortRule.id), sortRule.direction));
      } else if (fieldType === ColumnType.NUMBER) {
        this.dataRows.sort(this.sortNumberComparator(config.getColumnIdFromColumnDisplayName(sortRule.id), sortRule.direction));
      } else {
        this.dataRows.sort(this.sortDateComperator(config.getColumnIdFromColumnDisplayName(sortRule.id), sortRule.direction));
      }
    }
    return this.dataRows;
  }
  sortStringComparator(sortField: string, sortDirection: SortDirection) {
    return (a: RowRecord, b: RowRecord): number => {
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
    return (a: RowRecord, b: RowRecord) =>
      sortDirection === SortDirection.ASC ? (a[sortField] as number) - (b[sortField] as number) : (b[sortField] as number) - (a[sortField]as number);
  }
  sortDateComperator(sortField: string, sortDirection: SortDirection) {
    return (a: RowRecord, b: RowRecord) => {
      const c: Date = new Date(a[sortField] as unknown as Date);
      const d: Date = new Date(b[sortField] as unknown as Date);
      if (sortDirection === SortDirection.ASC) {
        return c.getTime() - d.getTime();
      } else {
        return d.getTime() - c.getTime();
      }
    };
  }
}

//console.log(MySortingSection);
