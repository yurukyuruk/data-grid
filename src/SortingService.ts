import { config, DATA_ROWS } from "./configExport.js";
import { RowRecord } from "./types/interfaces.js";
import { SortRule } from "./types/interfaces.js";
import { ColumnType, SortDirection } from "./types/enums.js";

export class SortingService {
  constructor() {}

  sortData(sortRules: SortRule[]) {
    const compareRows = (rowA: RowRecord, rowB: RowRecord) => {
        let result = 0;
        for (const sortRule of sortRules) {
            const fieldType = config.getColumnTypeFromColumnDisplayName(sortRule.id);
            let comparator = null;
            if (fieldType === ColumnType.STRING) {
                comparator = this.getStringComparator(sortRule.id, sortRule.direction)
            } else if (fieldType === ColumnType.NUMBER) {
                comparator = this.getNumberComparator(sortRule.id, sortRule.direction);
            } else {
                comparator = this.getDateComperator(sortRule.id, sortRule.direction);
            }
            result = comparator(rowA, rowB);
            if(result !== 0) {
                break;
            }
        }
        return result;
    }
    return DATA_ROWS.visibleRows.sort(compareRows);
}
  /*sortData(sortConfigDatas: SortRule[]): RowRecord[] {
    for (const sortRule of sortConfigDatas) {
      const fieldType = config.getColumnTypeFromColumnDisplayName(sortRule.id);
      if (fieldType === ColumnType.STRING) {
        DATA_ROWS.visibleRows.sort(this.sortStringComparator(config.getColumnIdFromColumnDisplayName(sortRule.id), sortRule.direction));
      } else if (fieldType === ColumnType.NUMBER) {
        DATA_ROWS.visibleRows.sort(this.sortNumberComparator(config.getColumnIdFromColumnDisplayName(sortRule.id), sortRule.direction));
      } else {
        DATA_ROWS.visibleRows.sort(this.sortDateComperator(config.getColumnIdFromColumnDisplayName(sortRule.id), sortRule.direction));
      }
    }
    return DATA_ROWS.visibleRows;
  }*/
  getStringComparator(sortField: string, sortDirection: SortDirection) {
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
  getNumberComparator(sortField: string, sortDirection: SortDirection) {
    return (a: RowRecord, b: RowRecord) =>
      sortDirection === SortDirection.ASC ? (a[sortField] as number) - (b[sortField] as number) : (b[sortField] as number) - (a[sortField]as number);
  }
  getDateComperator(sortField: string, sortDirection: SortDirection) {
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


