import { config } from "./configExport.js";
import { ColumnType, SortDirection } from "./types/enums.js";
export class SortingService {
    data;
    constructor(data) {
        this.data = data;
    }
    sortData(sortConfigDatas) {
        for (const sortRule of sortConfigDatas) {
            const fieldType = config.getColumnTypeFromColumnDisplayName(sortRule.id);
            if (fieldType === ColumnType.STRING) {
                this.data.sort(this.sortStringComparator(config.getColumnIdFromColumnDisplayName(sortRule.id), sortRule.direction));
            }
            else if (fieldType === ColumnType.NUMBER) {
                this.data.sort(this.sortNumberComparator(config.getColumnIdFromColumnDisplayName(sortRule.id), sortRule.direction));
            }
            else {
                this.data.sort(this.sortDateComperator(config.getColumnIdFromColumnDisplayName(sortRule.id), sortRule.direction));
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
//console.log(MySortingSection);
//# sourceMappingURL=sortingService.js.map