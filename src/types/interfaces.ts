export interface SortRule {
  field: string;
  direction: string;
}
export interface ColumnsInformation {
  name: string;
  htmlClassName: string;
  type: string; //columnType
}
export interface Column {
  id: string;
  displayName: string;
  type: string;
  columnIndex: number;
  summary?: string;
  collapsed?: boolean;
  children: Column[];
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
