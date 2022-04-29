import { RowRecord } from "./types/interfaces.js";
import { extractValuesFromKeys, isObject } from "./utils.js";
export class FilteringService {
    getRows: () => RowRecord[];
    constructor(getRows: () => RowRecord[]) {
        this.getRows = getRows;
    }
    filterRows(rows: RowRecord[], searchValue: string) {
        const columnNames = config.getVisibleColumnIds();//buralarin hepsi filter service e gidecek, configden o zaman kurtul.
        return rows.filter(row => {
            const visibleValues = extractValuesFromKeys(row, columnNames);
            return visibleValues.some(value => {
                return isObject(value)
                    ? Object.values(value)
                            .some(cellValue => cellValue.toString().toLowerCase().includes(searchValue))
                    : value.toString().toLowerCase().includes(searchValue);
            })
        })
    }
}
  