import { CellData, RowRecord } from "./interfaces.js";

export function isRowRecord(cell: CellData): cell is RowRecord {
  return typeof cell === "object" && !Array.isArray(cell) && cell !== null;
}
