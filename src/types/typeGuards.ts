import { CellData, NestedCellData } from "./interfaces.js";

export function isNestedCellData(cell: CellData): cell is NestedCellData {
  return typeof cell === "object" && !Array.isArray(cell) && cell !== null;
}
