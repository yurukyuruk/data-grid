import { ConfigService } from "./ConfigService.js";
import { SortingService } from "./SortingService.js";

export const config: ConfigService = new ConfigService();
export let sortingService: SortingService = new SortingService();

