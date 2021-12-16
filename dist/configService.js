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
        this.data;
        fetch("https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/personData/dataset-2/config.json")
            .then(async (response) => {
            this.data = await response.json();
        })
            .then(() => {
            this.columns = this.data.columns;
        })
            .then(() => {
            fetchRowDatas();
        })
            .then(() => {
            sortModel.setSortFieldsInSortFieldButton(this.getDisplayNamesOfAllColumns());
        })
            .then(() => {
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
        if (summaryDetails) {
            return summaryDetails.split("+");
        }
        else {
            return void 0;
        }
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
                field: option.fieldOption,
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