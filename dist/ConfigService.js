export class ConfigService {
    data;
    columns;
    sortingRules;
    constructor() {
        // this.fetchConfig();
    }
    async fetchConfig() {
        return fetch("https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/datasets/dataset-2/config.json")
            .then((response) => response.json())
            .then(({ columns, dataUrl, sortingRules }) => {
            this.columns = columns;
            this.sortingRules = sortingRules;
            const toSetSortFields = new CustomEvent("to-set-sort-fields", {
                bubbles: true,
                composed: true,
            });
            document.dispatchEvent(toSetSortFields);
            // ONce you set all configuration you want to return url under wich you can find data
            return dataUrl;
        })
            .then((dataUrl) => {
            const toCreateDataRows = new CustomEvent("to-create-data-rows", {
                bubbles: true,
                composed: true,
            });
            document.dispatchEvent(toCreateDataRows);
            if (localStorage.getItem("sortInformation") !== null) {
                const dataRows = document.querySelector(".data-rows");
                if (dataRows) {
                    dataRows.innerHTML = "";
                }
                const toSortData = new CustomEvent("to-sort-data", {
                    bubbles: true,
                    composed: true,
                });
                document.dispatchEvent(toSortData);
                const toRecreateDataRows = new CustomEvent("to-recreate-data-rows", {
                    bubbles: true,
                    composed: true,
                });
                document.dispatchEvent(toRecreateDataRows);
            }
            const toSetVisibilityAttribute = new CustomEvent("to-set-visibility-attribute", {
                bubbles: true,
                composed: true,
            });
            document.dispatchEvent(toSetVisibilityAttribute);
            return dataUrl;
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
    getColumnTypeFromColumnId(columnName) {
        const column = this.columns.find((eachColumn) => eachColumn.id === columnName);
        if (column) {
            return column.type;
        }
        else {
            return void 0;
        }
    }
    getColumnDisplayNameFromColumnId(columnName) {
        const column = this.columns.find((column) => column.id === columnName);
        if (column) {
            return column.displayName;
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
    getColumnsWhichHaveNoChildrenColumns() {
        return this.columns.filter((column) => column.children === undefined);
    }
    getDisplayNamesOfColumnsWhichHaveNoChildren() {
        const displayNamesOfColumns = [];
        this.getColumnsWhichHaveNoChildrenColumns().forEach((column) => {
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
        const toMapSortOptions = new CustomEvent("to-map-sort-options", {
            bubbles: true,
            composed: true,
        });
        document.dispatchEvent(toMapSortOptions);
    }
    clearSortInformation() {
        localStorage.removeItem("sortInformation");
    }
    clearColumnVisibilityInformation() {
        localStorage.removeItem("columnVisibilityInformation");
    }
}
//# sourceMappingURL=ConfigService.js.map