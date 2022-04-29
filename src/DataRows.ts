import { RowRecord } from "./types/interfaces.js";



export class DataRows {
  rows: RowRecord[] = [];
  visibleRows: RowRecord[] = [];
  
  constructor() {}

  public async fetchData(dataUrl: string): Promise<void> {
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
  getVisibleRows(): RowRecord[] {
    return this.visibleRows
  }
}