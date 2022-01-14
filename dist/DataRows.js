export class DataRows {
    rows = [];
    visibleRows = [];
    constructor() { }
    fetchData(dataUrl) {
        return fetch(dataUrl)
            .then((response) => response.json())
            .then((rows) => {
            this.rows = rows;
        })
            .catch(() => {
            throw new Error("Couldnt' fetch data rows");
        });
    }
}
//# sourceMappingURL=DataRows.js.map