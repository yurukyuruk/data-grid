import { SortingService } from "./sortingService.js";
export let sortingService;
export class DataRows {
    rows = [];
    visibleRows = [];
    constructor() { }
    fetchData(dataUrl) {
        return fetch(dataUrl)
            .then((response) => response.json())
            .then((rows) => {
            this.rows = rows;
            sortingService = new SortingService(rows);
            /*if (localStorage.getItem("sortInformation") !== null) {
              dataRows.innerHTML = "";
              const sortedData: RowRecord[] = sortingService.sortData(JSON.parse(localStorage.getItem("sortInformation") ?? "[]"));
              addAllDataAtOnce(sortedData, createReferenceElement());
            }
            const columnsVisibility: string[] = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "[]");
      
            for (let i = 0; i < config.columns.length; i++) {
              const eachDataColumnGroup: NodeListOf<Element> = document.querySelectorAll("." + config.columns[i].id + "-data");
              eachDataColumnGroup.forEach((element) => element.setAttribute("data-column-checkbox-checked", columnsVisibility[i]));
            }*/
        })
            .catch(() => {
            throw new Error("Couldnt' fetch data rows");
        });
    }
}
//# sourceMappingURL=DataRows.js.map