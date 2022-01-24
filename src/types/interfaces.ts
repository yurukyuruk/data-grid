import { ColumnType, SortDirection } from "./enums.js";

export interface SortRule {
  id: string;
  direction: SortDirection;
}
export interface ColumnsInformation {
  name: string;
  htmlClassName: string;
  type: string; //columnType
}
export interface Column {
  id: string;
  displayName: string;
  type: ColumnType;
  columnIndex: number;
  visible?: boolean;
  summary?: string;
  collapsed?: boolean;
  children?: Column[];
}
export interface Data {
  columns: Column[];
  dataUrl: string;
  sortingRules: SortRule[];
}
export interface GridConfig {
  columns: Column[];
  dataUrl: string;
  sortingRules: SortRule[];
}
export type RowRecord = { [k: string]: CellData };
export type CellData = string | number | RowRecord;

