import { ConfigService } from "./configService.js";
import { DataRows } from "./DataRows.js";
import { SortingService } from "./sortingService.js";

export const config: ConfigService = new ConfigService();
export const DATA_ROWS: DataRows = new DataRows();
export let sortingService: SortingService = new SortingService(DATA_ROWS.rows);

