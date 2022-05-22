import { ColumnType, SortDirection } from "./types/enums.js";
export class SortingService {
    getColumnTypeFromColumnId;
    getVisibleRows;
    constructor(getVisibleRows, getColumnTypeFromColumnId) {
        this.getVisibleRows = getVisibleRows;
        this.getColumnTypeFromColumnId = getColumnTypeFromColumnId;
    }
    sortData(sortRules) {
        const compareRows = (rowA, rowB) => {
            let result = 0;
            for (const sortRule of sortRules) {
                const fieldType = this.getColumnTypeFromColumnId(sortRule.id);
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
        return this.getVisibleRows().sort(compareRows);
    }
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
//# sourceMappingURL=sortingService.js.map