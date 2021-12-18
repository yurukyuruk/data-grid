export function isNestedCellData(cell) {
    return typeof cell === "object" && !Array.isArray(cell) && cell !== null;
}
//# sourceMappingURL=typeGuards.js.map