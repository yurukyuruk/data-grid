import { ColumnType, SortDirection } from "./enums.js";

export interface SortRule {
  field: string;
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
  summary?: string;
  collapsed?: boolean;
  children?: Column[];
}
export interface Data {
  columns: Column[];
  columnsVisiblity: ColumnsVisiblity[];
  dataUrl: string;
  sortingRules: SortingRules[];
}
interface ColumnsVisiblity {
  id: string;
  visible: boolean;
}
interface SortingRules {
  id: string;
  direction: string;
}
export type RowRecord = Record<string, CellData>;
export type CellData = string | number | NestedCellData;
export type NestedCellData = Record<string, unknown>;
