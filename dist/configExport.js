import { ConfigService } from "./configService.js";
import { DataRows } from "./DataRows.js";
import { SortingService } from "./sortingService.js";
export const config = new ConfigService();
export const DATA_ROWS = new DataRows();
export let sortingService = new SortingService(DATA_ROWS.rows);
//# sourceMappingURL=configExport.js.map