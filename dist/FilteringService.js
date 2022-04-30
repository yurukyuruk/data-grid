import { extractValuesFromKeys, isObject } from "./utils.js";
export class FilteringService {
    rows;
    columnNames;
    constructor(rows, columnNames) {
        this.rows = rows;
        this.columnNames = columnNames;
    }
    filterRows(rows, searchValue) {
        return rows.filter(row => {
            const visibleValues = extractValuesFromKeys(row, this.columnNames);
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