import { CellData, RowRecord } from "./types/interfaces";

export function isObject(value: CellData): boolean {
    return typeof value === 'object' && !Array.isArray(value) && value !== null;
  }
export function extractValuesFromKeys(row: RowRecord, columnIds: string[]) {
    let values = [];
    for(const id of columnIds) {
        values.push(row[id]); 
    }
    return values;
  }