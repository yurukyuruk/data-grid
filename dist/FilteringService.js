import { extractValuesFromKeys, isObject } from "./utils.js";
export class FilteringService {
    rows;
    visibleColumnNames;
    constructor(rows) {
        this.rows = rows;
    }
    setVisibleColumnNames(visibleColumnNames) {
        this.visibleColumnNames = visibleColumnNames;
    }
    filterRows(rows, searchValue) {
        return rows.filter(row => {
            const visibleValues = extractValuesFromKeys(row, this.visibleColumnNames);
            return visibleValues.some(value => {
                return isObject(value)
                    ? Object.values(value)
                        .some(cellValue => cellValue.toString().toLowerCase().includes(searchValue))
                    : value.toString().toLowerCase().includes(searchValue);
            });
        });
    }
}
//# sourceMappingURL=FilteringService.js.map