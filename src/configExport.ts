import { ConfigService } from "./ConfigService.js";
import { DataRows } from "./DataRows.js";
//import { DataGrid } from "./index.js";
import { SortingService } from "./SortingService.js";

export const config: ConfigService = new ConfigService();
export const DATA_ROWS: DataRows = new DataRows();
export let sortingService: SortingService = new SortingService();
//export const dataGrid: DataGrid = new DataGrid();

