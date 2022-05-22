export enum SortDirection {
  ASC = "ascending",
  DESC = "descending"
}
export enum ColumnType {
  NUMBER = "NUMBER",
  STRING = "STRING",
  DATE = "DATE"
}
//enum for customevents
export enum CustomEventName {
  TO_SET_CHECKBOX_TEXTCONTENT = "to-set-checkbox-textcontent",
  TO_CLICK_COLUMN_HIDER_BUTTON = "to-click-column-hider-button",
  TO_CLICK_CHECKBOX = "to-click-checkbox",
  TO_SET_CHECKBOXHOLDER_ATTRIBUTE = "to-set-checkboxholder-attribute",
  TO_RESET_CHECKBOXHOLDER_ATTRIBUTE = "to-reset-checkboxholder-attribute",
  TO_CLOSE_COLUMN_HIDER_BUTTON = "to-close-column-hider-button",
  TO_RESET_COLUMN_HIDER = "to-reset-column-hider",
  TO_CLICK_SORT_DATA_BUTTON = "to-click-sort-data-button",
  TO_RESET_SORTING = "to-reset-sorting",
  TO_SORT_DATA = "to-sort-data",
  TO_BLUR = "to-blur",
  TO_FILTER_DATA = "to-filter-data"
}