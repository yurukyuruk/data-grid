import { SortingRule } from "./SortingRule.js";
import { ColumnHider } from "./columnHider.js";
import { fetchRowDatas } from "./index.js";
import { sortModel } from "./index.js";
export class ConfigService {
    columns;
    columnKeys;
    addressColumn;
    addressColumnKeys;
    constructor() {
        this.data;
        fetch("https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/personData/config.json").then(async (response) => {
            this.data = await response.json();
        }).then(() => {
            this.columns = this.data.columns;
        }).then(() => {
            fetchRowDatas();
        }).then(() => {
            sortModel.setSortFieldsInSortFieldButton(this.getDisplayNamesOfAllColumns());
        });
    }
    getHtmlClassNameFromDisplayName(displayName) {
        return displayName.replace(" ", '-').toLowerCase();
    }
    getHtmlClassNamesOfColumns() {
        let htmlClassNamesOfColumns = [];
        this.columns.forEach(column => {
            const htmlClassName = this.getHtmlClassNameFromDisplayName(column.displayName);
            htmlClassNamesOfColumns.push(htmlClassName);
        });
        return htmlClassNamesOfColumns;
    }
    getColumnIdFromColumnDisplayName(columnName) {
        const column = this.columns.find(column => column.displayName === columnName);
        if (column) {
            return column.id;
        }
    }
    getColumnTypeFromColumnDisplayName(columnName) {
        const column = this.columns.find(column => column.displayName === columnName);
        if (column) {
            return column.type;
        }
    }
    getSummaryFieldsFromColumnName(columnIndex) {
        const summaryDetails = this.columns[columnIndex].summary;
        return summaryDetails.split("+");
    }
    getColumnsWhichHaveChilderenColumns() {
        return this.columns.filter(column => column.children !== undefined);
    }
    getTotalNumberOfChildrenColumns() {
        let childElementNumberofEachColumn = [];
        this.getColumnsWhichHaveChilderenColumns().forEach(column => {
            childElementNumberofEachColumn.push(column.children.length);
        });
        return childElementNumberofEachColumn.reduce((a, b) => a + b, 0);
    }
    getHtmlClassNamesOfAllChildColumns() {
        let htmlClassNamesOfAllChildColumns = [];
        this.getColumnsWhichHaveChilderenColumns().forEach(column => {
            let htmlClassNames = [];
            column.children.forEach(childColumn => {
                htmlClassNames.push(childColumn.htmlClassName);
            });
            htmlClassNamesOfAllChildColumns.push(htmlClassNames);
        });
        return htmlClassNamesOfAllChildColumns;
    }
    getDisplayNamesOfAllColumns() {
        let displayNamesOfColumns = [];
        this.columns.forEach(column => {
            displayNamesOfColumns.push(column.displayName);
        });
        return displayNamesOfColumns;
    }
    checkIfColumnHasChild(id) {
        let currentColumn = this.columns.find(column => column.id === id);
        if (currentColumn.children === undefined) {
            return false;
        }
        return true;
    }
    saveColumnVisibilityStatus(allColumnCheckboxes) {
        let columnsVisibilityStatus = [];
        allColumnCheckboxes.forEach(columnCheckbox => {
            columnsVisibilityStatus.push(columnCheckbox.getAttribute("data-column-checkbox-checked") ?? "");
        });
        localStorage.setItem("columnVisibilityInformation", JSON.stringify(columnsVisibilityStatus));
        return columnsVisibilityStatus;
    }
    saveAddressColumnVisibilityStatus(addressHeader) {
        localStorage.setItem("addressColumnVisibilityStatus", JSON.stringify(addressHeader.getAttribute("data-address-section-expanded")));
    }
    saveSortInformation(sortOptions) {
        localStorage.setItem("sortInformation", JSON.stringify(this.getSortOptions(sortOptions)));
    }
    getSortOptions(sortOptions) {
        return sortOptions.map(option => {
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