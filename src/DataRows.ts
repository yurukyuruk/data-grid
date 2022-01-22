import { RowRecord } from "./types/interfaces.js";


//move it to global service page 
export class DataRows {
  readonly rows: RowRecord[] = [];
  visibleRows: RowRecord[] = [];
  
  constructor() {}
  
  fetchData(dataUrl: string): Promise<void> {
    return fetch(dataUrl)
      .then((response: Response) => response.json())
      .then((rows: RowRecord[]) => {
        this.rows = rows;
        this.visibleRows = rows;
      
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