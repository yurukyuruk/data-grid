export class ConfigService {
    data;
    columns;
    sortingRules;
    filteringRule;
    userFilterInput;
    columnVisibilityRules;
    configUrl;
    constructor(configUrl) {
        if (configUrl) {
            this.configUrl = configUrl;
        }
        this.filteringRule = localStorage.getItem("filterInformation") ?? "";
        const filterInformation = localStorage.getItem("filterInformation");
        if (filterInformation !== null) {
            this.userFilterInput = filterInformation;
        }
    }
    async fetchConfig() {
        if (this.configUrl === undefined) {
            throw new Error("Can not fetch config");
        }
        return fetch(this.configUrl)
            .then((response) => response.json())
            .then(({ columns, dataUrl, sortingRules }) => {
            this.columns = columns;
            if (localStorage.getItem("sortInformation") === null) {
                this.sortingRules = sortingRules;
            }
            else {
                this.sortingRules = JSON.parse(localStorage.getItem("sortInformation") ?? "");
            }
            if (localStorage.getItem("columnVisibilityInformation") === null) {
                this.columnVisibilityRules = this.getColumnVisibilityStatus();
            }
            else {
                this.columnVisibilityRules = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "");
            }
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
    getColumnIdFromColumnDisplayName = (columnName) => {
        const column = this.columns.find((eachColumn) => eachColumn.displayName === columnName);
        if (column) {
            return column.id;
        }
        throw new Error("Column doesn't exist.");
    };
    getColumnTypeFromColumnId = (columnName) => {
        const column = this.columns.find((eachColumn) => eachColumn.id === columnName);
        if (column) {
            return column.type;
        }
        else {
            return void 0;
        }
    };
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
        let columnsVisibility;
        if (localStorage.getItem("columnVisibilityInformation") === null) {
            columnsVisibility = this.getColumnVisibilityStatus();
        }
        else {
            columnsVisibility = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "");
        }
        let visibleColumnIds = [];
        for (let i = 0; i < columnsVisibility.length; i++) {
            if (columnsVisibility[i] === true) {
                visibleColumnIds.push(this.columns[i].id);
            }
        }
        return visibleColumnIds;
    }
    getColumnVisibilityStatus(reset) {
        const columnsVisibilityStatus = [];
        if (reset === "reset") {
            this.columns.forEach(() => {
                columnsVisibilityStatus.push(true);
            });
            localStorage.setItem("columnVisibilityInformation", JSON.stringify(columnsVisibilityStatus));
            this.columnVisibilityRules = columnsVisibilityStatus;
        }
        else {
            this.columns.forEach(column => {
                if (column.visible !== undefined) {
                    columnsVisibilityStatus.push(column.visible);
                }
                else {
                    columnsVisibilityStatus.push(true);
                }
            });
        }
        return columnsVisibilityStatus;
    }
    saveColumnVisibilityStatus(allColumnCheckboxes) {
        const columnsVisibilityStatus = [];
        allColumnCheckboxes.forEach((columnCheckbox) => {
            columnsVisibilityStatus.push(columnCheckbox.getAttribute("data-column-checkbox-checked") === "true");
        });
        localStorage.setItem("columnVisibilityInformation", JSON.stringify(columnsVisibilityStatus));
        this.columnVisibilityRules = columnsVisibilityStatus;
        return columnsVisibilityStatus;
    }
    saveSortInformation(mappedSortOptions) {
        localStorage.setItem("sortInformation", JSON.stringify(mappedSortOptions));
        this.sortingRules = mappedSortOptions;
    }
    clearSortInformation() {
        localStorage.setItem("sortInformation", JSON.stringify([]));
    }
    saveUserFilterInput(inputValue, userInput) {
        localStorage.setItem("filterInformation", inputValue);
        localStorage.setItem("userFilterInput", userInput);
        this.filteringRule = inputValue;
    }
}
//# sourceMappingURL=ConfigService.js.map