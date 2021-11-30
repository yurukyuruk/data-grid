import { config } from "./configExport.js";
import { ColumnType, SortDirection } from "./types/enums.js";
export class SortingService {
    data;
    constructor(data) {
        this.data = data;
    }
    sortData(sortConfigDatas) {
        for (const sortRule of sortConfigDatas) {
            const fieldType = config.getColumnTypeFromColumnDisplayName(sortRule.field);
            if (fieldType === ColumnType.STRING) {
                this.data.sort(this.sortStringComparator(config.getColumnIdFromColumnDisplayName(sortRule.field), sortRule.direction));
            }
            else if (fieldType === ColumnType.NUMBER) {
                this.data.sort(this.sortNumberComparator(sortRule.field, sortRule.direction));
            }
            else {
                this.data.sort(this.sortDateComperator(config.getColumnIdFromColumnDisplayName(sortRule.field), sortRule.direction));
            }
        }
        return this.data;
    }
    sortStringComparator(sortField, sortDirection) {
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
    sortNumberComparator(sortField, sortDirection) {
        return (a, b) => sortDirection === SortDirection.ASC ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
    }
    sortDateComperator(sortField, sortDirection) {
        return (a, b) => {
            let c = new Date(a[sortField]);
            let d = new Date(b[sortField]);
            if (sortDirection === SortDirection.ASC) {
                return c - d;
            }
            else {
                return d - c;
            }
        };
    }
}
//console.log(MySortingSection);
//# sourceMappingURL=sortingService.js.map