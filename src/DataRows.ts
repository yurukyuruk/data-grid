import { RowRecord } from "./types/interfaces.js";

export class DataRows {
  rows: RowRecord[] = [];
  visibleRows: RowRecord[] = [];

  constructor() {}

  fetchData(dataUrl: string): Promise<void> {
    return fetch(dataUrl)
      .then((response: Response) => response.json())
      .then((rows: RowRecord[]) => {
        this.rows = rows;
      })
      .catch(() => {
        throw new Error("Couldnt' fetch data rows");
      });
  }
}