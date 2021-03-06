import { RowRecord } from "./types/interfaces.js";
import { extractValuesFromKeys, isObject } from "./utils.js";
export class FilteringService {
    rows: RowRecord[];
    visibleColumnNames!: string[];
    constructor(rows: RowRecord[]) {
        this.rows = rows;
    }
    setVisibleColumnNames(visibleColumnNames: string[]) {
        this.visibleColumnNames = visibleColumnNames;
    }
    filterRows(rows: RowRecord[], searchValue: string) {
        return rows.filter(row => {
            const visibleValues = extractValuesFromKeys(row, this.visibleColumnNames);
            return visibleValues.some(value => {
                return isObject(value)
                    ? Object.values(value)
                            .some(cellValue => cellValue.toString().toLowerCase().includes(searchValue))
                    : value.toString().toLowerCase().includes(searchValue);
            })
        })
    }
}
  