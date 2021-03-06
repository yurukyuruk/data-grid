import { RowRecord } from "./types/interfaces.js";
import { SortRule } from "./types/interfaces.js";
import { ColumnType, SortDirection } from "./types/enums.js";

export class SortingService {
  getColumnTypeFromColumnId: (columnName: string) => string | undefined;
  getVisibleRows: () => RowRecord[];
  constructor(getVisibleRows: () => RowRecord[], getColumnTypeFromColumnId: (columnName: string) => string | undefined) {
    this.getVisibleRows = getVisibleRows;
    this.getColumnTypeFromColumnId = getColumnTypeFromColumnId;
  }

  sortData(sortRules: SortRule[]) {
    const compareRows = (rowA: RowRecord, rowB: RowRecord) => {
        let result = 0;
        for (const sortRule of sortRules) {
            const fieldType = this.getColumnTypeFromColumnId(sortRule.id);
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
    return this.getVisibleRows().sort(compareRows);
}

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


