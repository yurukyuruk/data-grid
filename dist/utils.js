export function isObject(value) {
    return typeof value === 'object' && !Array.isArray(value) && value !== null;
}
export function extractValuesFromKeys(row, columnIds) {
    let values = [];
    for (const id of columnIds) {
        values.push(row[id]);
    }
    return values;
}
//# sourceMappingURL=utils.js.map