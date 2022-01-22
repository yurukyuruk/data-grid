import { SortingRule } from "./SortingRule.js";
import { ColumnHider } from "./ColumnHider.js";
import { sortModel } from "./index.js";
import { createDataHeaders } from "./index.js";
import { createRows } from "./index.js";
import { DATA_ROWS } from "./configExport.js";
export class ConfigService {
    data;
    columns;
    sortingRules;
    constructor() {
        this.fetchConfig();
    }
    fetchConfig() {
        return fetch("https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/datasets/dataset-2/config.json")
            .then((response) => response.json())
            .then(({ columns, columnsVisiblity, dataUrl, sortingRules }) => {
            this.columns = columns;
            this.sortingRules = sortingRules;
            //this.columnsVisibility = columnsVisiblity;
            sortModel.setSortFieldsInSortFieldButton(this.getDisplayNamesOfAllColumns());
            createDataHeaders();
            return DATA_ROWS.fetchData(dataUrl);
        })
            .then(() => {
            createRows(DATA_ROWS.rows);
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
    hasAnyChildren() {
        return this.columns.some((column) => column.children);
    }
    getChildrens(columnId) {
        return this.columns.find((colum) => colum.id === columnId)?.children ?? [];
    }
    getSummaryRule(columnId) {
        return this.columns.find((colum) => colum.id === columnId)?.summary?.split("+") ?? [];
    }
    getVisibleColumnIds() {
        const columnsVisibility = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "[]");
        let visibleColumnIds = [];
        for (let i = 0; i < columnsVisibility.length; i++) {
            if (columnsVisibility[i] === "true") {
                visibleColumnIds.push(this.columns[i].id);
            }
        }
        return visibleColumnIds;
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
        localStorage.setItem("sortInformation", JSON.stringify(sortModel.mapSortOptions(sortOptions))); //you cant use sort model here.
        this.sortingRules = sortOptions;
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
//# sourceMappingURL=ConfigService.js.map