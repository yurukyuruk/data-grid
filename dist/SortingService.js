import { config, DATA_ROWS } from "./configExport.js";
import { ColumnType, SortDirection } from "./types/enums.js";
export class SortingService {
    constructor() { }
    sortData(sortRules) {
        const compareRows = (rowA, rowB) => {
            let result = 0;
            for (const sortRule of sortRules) {
                const fieldType = config.getColumnTypeFromColumnDisplayName(sortRule.id);
                let comparator = null;
                if (fieldType === ColumnType.STRING) {
                    comparator = this.getStringComparator(sortRule.id, sortRule.direction);
                }
                else if (fieldType === ColumnType.NUMBER) {
                    comparator = this.getNumberComparator(sortRule.id, sortRule.direction);
                }
                else {
                    comparator = this.getDateComperator(sortRule.id, sortRule.direction);
                }
                result = comparator(rowA, rowB);
                if (result !== 0) {
                    break;
                }
            }
            return result;
        };
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
    getStringComparator(sortField, sortDirection) {
        return (a, b) => {
            let result = 0;
            if (sortDirection === SortDirection.ASC) {
                result = a[sortField] > b[sortField] ? 1 : -1;
            }
            else if (sortDirection === SortDirection.DESC) {
                result = a[sortField] < b[sortField] ? 1 : -1;
            }
            return result;
        };
    }
    getNumberComparator(sortField, sortDirection) {
        return (a, b) => sortDirection === SortDirection.ASC ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
    }
    getDateComperator(sortField, sortDirection) {
        return (a, b) => {
            const c = new Date(a[sortField]);
            const d = new Date(b[sortField]);
            if (sortDirection === SortDirection.ASC) {
                return c.getTime() - d.getTime();
            }
            else {
                return d.getTime() - c.getTime();
            }
        };
    }
}
//# sourceMappingURL=SortingService.js.map