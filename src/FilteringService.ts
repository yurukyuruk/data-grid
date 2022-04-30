import { RowRecord } from "./types/interfaces.js";
import { extractValuesFromKeys, isObject } from "./utils.js";
export class FilteringService {
    rows: RowRecord[];
    columnNames: string[];
    constructor(rows: RowRecord[], columnNames: string[]) {
        this.rows = rows;
        this.columnNames = columnNames;
    }
    filterRows(rows: RowRecord[], searchValue: string) {
        return rows.filter(row => {
            const visibleValues = extractValuesFromKeys(row, this.columnNames);
            return visibleValues.some(value => {
                return isObject(value)
                    ? Object.values(value)
                            .some(cellValue => cellValue.toString().toLowerCase().includes(searchValue))
                    : value.toString().toLowerCase().includes(searchValue);
            })
        })
    }
}
  