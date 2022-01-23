import { config, sortingService } from "./configExport.js";
import { createRows } from "./index.js";
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
      })
      .catch(() => {
        throw new Error("Couldnt' fetch data rows");
      });
  }
}