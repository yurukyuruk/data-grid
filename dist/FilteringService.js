import { extractValuesFromKeys, isObject } from "./utils.js";
export class FilteringService {
    constructor() { }
    filterRows(rows, searchValue) {
        const columnNames = config.getVisibleColumnIds(); //buralarin hepsi filter service e gidecek, configden o zaman kurtul.
        return rows.filter(row => {
            const visibleValues = extractValuesFromKeys(row, columnNames);
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