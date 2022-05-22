export var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "ascending";
    SortDirection["DESC"] = "descending";
})(SortDirection || (SortDirection = {}));
export var ColumnType;
(function (ColumnType) {
    ColumnType["NUMBER"] = "NUMBER";
    ColumnType["STRING"] = "STRING";
    ColumnType["DATE"] = "DATE";
})(ColumnType || (ColumnType = {}));
//enum for customevents
export var CustomEventName;
(function (CustomEventName) {
    CustomEventName["TO_SET_CHECKBOX_TEXTCONTENT"] = "to-set-checkbox-textcontent";
    CustomEventName["TO_CLICK_COLUMN_HIDER_BUTTON"] = "to-click-column-hider-button";
    CustomEventName["TO_CLICK_CHECKBOX"] = "to-click-checkbox";
    CustomEventName["TO_SET_CHECKBOXHOLDER_ATTRIBUTE"] = "to-set-checkboxholder-attribute";
    CustomEventName["TO_RESET_CHECKBOXHOLDER_ATTRIBUTE"] = "to-reset-checkboxholder-attribute";
    CustomEventName["TO_CLOSE_COLUMN_HIDER_BUTTON"] = "to-close-column-hider-button";
    CustomEventName["TO_RESET_COLUMN_HIDER"] = "to-reset-column-hider";
    CustomEventName["TO_CLICK_SORT_DATA_BUTTON"] = "to-click-sort-data-button";
    CustomEventName["TO_RESET_SORTING"] = "to-reset-sorting";
    CustomEventName["TO_SORT_DATA"] = "to-sort-data";
    CustomEventName["TO_BLUR"] = "to-blur";
    CustomEventName["TO_FILTER_DATA"] = "to-filter-data";
})(CustomEventName || (CustomEventName = {}));
//# sourceMappingURL=enums.js.map