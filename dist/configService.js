import { SortingRule } from "./SortingRule.js";
import { ColumnHider } from "./columnHider.js";
import { fetchRowDatas } from "./index.js";
import { sortModel } from "./index.js";
import { createDataHeaders } from "./index.js";
import { addEventListenerToColumnHeadersWhichHasChildren } from "./index.js";
export class ConfigService {
    data;
    columns;
    constructor() {
        this.fetchConfig();
    }
    fetchConfig() {
        return fetch("https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/datasets/dataset-2/config.json")
            .then((response) => response.json())
            .then((data) => {
            this.columns = data.columns;
            fetchRowDatas(data);
            sortModel.setSortFieldsInSortFieldButton(this.getDisplayNamesOfAllColumns());
            createDataHeaders();
            addEventListenerToColumnHeadersWhichHasChildren();
        });
    }
    getHtmlClassNamesOfColumns() {
        const htmlClassNamesOfColumns = [];
        this.columns.forEach((column) => {
            const htmlClassName = column.id;
            htmlClassNamesOfColumns.push(htmlClassName);
        });
        return htmlClassNamesOfColumns;
    }
    getColumnIdFromColumnDisplayName(columnName) {
        const column = this.columns.find((eachColumn) => eachColumn.displayName === columnName);
        if (column) {
            return column.id;
        }
        throw new Error("Column doesn't exist.");
    }
    getColumnTypeFromColumnDisplayName(columnName) {
        const column = this.columns.find((eachColumn) => eachColumn.displayName === columnName);
        if (column) {
            return column.type;
        }
        else {
            return void 0;
        }
    }
    getSummaryFieldsFromColumnName(columnIndex) {
        const summaryDetails = this.columns[columnIndex].summary;
        return summaryDetails === undefined ? [] : summaryDetails.split("+");
    }
    getColumnsWhichHaveChilderenColumns() {
        return this.columns.filter((column) => column.children !== undefined);
    }
    getDisplayNamesOfAllColumns() {
        const displayNamesOfColumns = [];
        this.columns.forEach((column) => {
            displayNamesOfColumns.push(column.displayName);
        });
        return displayNamesOfColumns;
    }
    saveColumnVisibilityStatus(allColumnCheckboxes) {
        const columnsVisibilityStatus = [];
        allColumnCheckboxes.forEach((columnCheckbox) => {
            columnsVisibilityStatus.push(columnCheckbox.getAttribute("data-column-checkbox-checked") ?? "");
        });
        localStorage.setItem("columnVisibilityInformation", JSON.stringify(columnsVisibilityStatus));
        return columnsVisibilityStatus;
    }
    saveSortInformation(sortOptions) {
        localStorage.setItem("sortInformation", JSON.stringify(this.getSortOptions(sortOptions)));
    }
    getSortOptions(sortOptions) {
        return sortOptions.map((option) => {
            return {
                id: option.fieldOption,
                direction: option.directionOption
            };
        });
    }
    clearSortInformation() {
        localStorage.removeItem("sortInformation");
    }
    clearColumnVisibilityInformation() {
        localStorage.removeItem("columnVisibilityInformation");
    }
}
console.log(SortingRule);
console.log(ColumnHider);
//# sourceMappingURL=configService.js.map