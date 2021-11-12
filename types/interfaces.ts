export interface SortRule {
    field: string;
    direction: string;
}
export interface ColumnsInformation {
    name: string;
    htmlClassName: string; 
    type: string; //columnType
}
export type ColumnRow = Record<string, unknown>;