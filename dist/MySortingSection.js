import { SortingRule } from "./SortingRule.js";
import { ConfigService } from "./ConfigService.js";
import { SortDirection } from "./types/enums.js";
const { template } = {
    template: `
  <style>  
  .sort-data-button-area {
    padding: 1rem 0 1rem 0;
    background-color: rgb(253, 206, 184);
    display: flex;
    justify-content: center;
  }
  .sort-data-button {
    border: 1px solid black;
    background-color: rgb(235, 144, 101);
    cursor: pointer;
    width: 12rem;
    box-shadow: 0px 4px 5px 1px rgba(0, 0, 0, 0.4);
    transform: scale(1);
    transition: transform 300ms ease-in-out;
  }
  .sort-data-button:hover {
    transform: scale(1.1);
  }
  .sorting {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(255 226 213);
    position: absolute;
    top: 45%;
    left: 30%;
    z-index: 1;
    max-height: 50vh;
    box-shadow: 0 10px 10px 5px rgba(0, 0, 0, 0.4);
  }
  .sort-lines {
    display: flex;
    flex-direction: column;
  }
  .sort-field {
    width: 20vw;
    border: black 1px solid;
    text-align-last: center;
    margin: 5px;
  }
  .sort-direction {
    width: 20vw;
    border: black 1px solid;
    text-align-last: center;
    margin: 5px 5px 5px 1px;
  }
  .sort-field, .sort-direction {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9rem;
    text-align: center;
  }
  .option-default {
    display: none;
  }
  .top-of-box {
    height: 20px;
    width: 100%;
    background-color: rgb(235, 144, 101);
  }
  .close-button {
    height: 20px;
    width: 20px;
    align-self: flex-end;
    border: none;
    background-color: rgb(235, 144, 101);
    cursor: pointer;
    transition: background-color 250ms ease-in-out;
    position: absolute;
  }
  .close-button:hover {
    background-color: rgb(253 206 184);
  }

  .sort-adding-button {
    align-self: center;
    padding: 0 2px;
    margin: 5px;
    cursor: pointer;
    background-color: rgb(197 159 142);
    border: 1px solid black;
    transition: background-color 250ms ease-in-out;
  }
  .reset-button {
    border: black 1px solid;
    width: 8vw;
    margin: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    padding-top: 0;
    padding-bottom: 0;
    background-color: rgb(197 159 142);
    box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.4);
    transition: background-color 250ms ease-in-out;
  }
  .submit-button {
    border: black 1px solid;
    width: 8vw;
    margin: 5px;
    cursor: pointer;
    margin-bottom: 10px;
    padding-top: 0;
    padding-bottom: 0;
    background-color: rgb(235, 144, 101);
    box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.4);
    transition: background-color 250ms ease-in-out;
  }
  .submit-button:hover {
    background-color: rgb(253 206 184);
  }
  .submit-button:disabled {
    background-color: rgb(255 226 213);
    color: #0000009c;
    cursor: auto;
  }
  .reset-button:hover, .sort-adding-button:hover {
    background-color: rgb(253 206 184);
  }
  .sort-data-button, .sort-adding-button, .close-button, .reset-button, .submit-button, .addition-symbol {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9rem;
    text-align: center;
  }
  .sort-adding-button:disabled {
    background-color: rgb(255 226 213);
    color: #0000009c;
    cursor: auto;
  }
  .blured {
    filter: blur(2px);
  }
  input[data-sort-button-visible="false"] {
    display: none;
  }
  div[data-sort-button-area-visible="false"] {
    display: none;
  }
  section[data-sort-fields-visible="false"] {
    display: none;
  }
</style>
<div class="sort-data-button-area" data-sort-button-area-visible="true">
  <input class="sort-data-button" data-sort-button-visible="true" type="button" value="SORT DATA">
</div>
<section class="sorting" data-sort-fields-visible="false">
  <div class="top-of-box"></div>
  <input class="close-button" type="button" value="x">
  <div class="sort-lines"> 
    <${SortingRule.TAG}></${SortingRule.TAG}>
  </div>
  <input class="sort-adding-button" type="button" value="+">
  <div class="submit-buttons">
    <input class="reset-button" type="reset" value="reset">
    <input class="submit-button" type="submit" value="apply">
  </div>
</section>        
  `
};
export class MySortingSection extends HTMLElement {
    static TAG = "my-sorting-section";
    shadowRoot;
    allFields;
    sortOptions;
    sortingArea;
    sortDataButtonArea;
    sortDataButton;
    sortAddingButton;
    submitButton;
    resetButton;
    closeButton;
    sortLines;
    columnDisplayNameToColumnIdMapper;
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = template;
        this.getElementReferences();
        this.sortOptions = [this.shadowRoot.querySelector(SortingRule.TAG)];
        this.sortOptions[0].setSortByOptions(this.allFields);
        this.initializeListeners();
    }
    setColumnNameToColumnIdMapper(columnDisplayNameToColumnIdMapper) {
        this.columnDisplayNameToColumnIdMapper = columnDisplayNameToColumnIdMapper;
    }
    setButtons() {
        this.submitButton.disabled = true;
        this.sortAddingButton.disabled = true;
        this.resetButton.disabled = true;
    }
    initializeListeners() {
        this.sortDataButton.addEventListener("click", () => {
            this.setButtons();
            this.sortDataButtonArea.setAttribute("data-sort-button-area-visible", "false");
            this.sortDataButton.setAttribute("data-sort-button-visible", "false");
            this.sortingArea.setAttribute("data-sort-fields-visible", "true");
            const toBlur = new CustomEvent("to-blur", {
                bubbles: true,
                composed: true,
            });
            this.shadowRoot.dispatchEvent(toBlur);
            for (let i = 0; i < this.allFields.length; i++) {
                const sortFieldOption = document.createElement("option");
                sortFieldOption.textContent = this.allFields[i];
                if (i === 0) {
                    sortFieldOption.classList.add("option-default");
                }
                this.sortOptions[0].sortField.append(sortFieldOption);
            }
            const sortInformation = JSON.parse(localStorage.getItem("sortInformation"));
            if (sortInformation === null) {
                const toSetSortingSection = new CustomEvent("to-set-sorting-section", {
                    bubbles: true,
                    composed: true,
                    detail: {
                        sortOptions: this.sortOptions,
                    }
                });
                this.shadowRoot.dispatchEvent(toSetSortingSection);
                this.sortAddingButton.disabled = false;
                this.submitButton.disabled = false;
                this.resetButton.disabled = false;
            }
            if (sortInformation !== null) {
                this.resetButton.disabled = false;
            }
            if (sortInformation !== null && sortInformation.length === 1 && sortInformation[0].id !== "Sort by") {
                const toGetDisplayName = new CustomEvent("to-get-display-name", {
                    bubbles: true,
                    composed: true,
                    detail: {
                        sortOptions: this.sortOptions,
                        sortInformation: sortInformation
                    }
                });
                this.shadowRoot.dispatchEvent(toGetDisplayName);
                this.sortAddingButton.disabled = false;
                this.submitButton.disabled = false;
                this.resetButton.disabled = false;
            }
            else if (sortInformation !== null && sortInformation.length > 1) {
                const toGetDisplayName = new CustomEvent("to-get-display-name", {
                    bubbles: true,
                    composed: true,
                    detail: {
                        sortOptions: this.sortOptions,
                        sortInformation: sortInformation
                    }
                });
                this.shadowRoot.dispatchEvent(toGetDisplayName);
                this.sortAddingButton.disabled = false;
                this.submitButton.disabled = false;
                for (let i = 1; i < sortInformation.length; i++) {
                    this.createNewSortLine();
                    const toGetDisplayName = new CustomEvent("to-get-display-name", {
                        bubbles: true,
                        composed: true,
                        detail: {
                            sortOptions: this.sortOptions,
                            sortInformation: sortInformation
                        }
                    });
                    this.shadowRoot.dispatchEvent(toGetDisplayName);
                }
            }
        });
        this.closeButton.addEventListener("click", () => {
            this.sortDataButtonArea.setAttribute("data-sort-button-area-visible", "true");
            this.sortDataButton.setAttribute("data-sort-button-visible", "true");
            this.sortingArea.setAttribute("data-sort-fields-visible", "false");
            const toBlur = new CustomEvent("to-blur", {
                bubbles: true,
                composed: true,
            });
            this.shadowRoot.dispatchEvent(toBlur);
            this.sortLines.innerHTML = "";
            this.sortOptions = [];
            this.createNewSortLine();
            this.sortOptions[0].sortField.innerHTML = "";
            this.sortOptions[0].sortDirection.disabled = true;
        });
        this.resetButton.addEventListener("click", () => {
            this.setButtons();
            this.sortLines.innerHTML = "";
            this.sortOptions = [];
            this.createNewSortLine();
            this.sortOptions[0].sortDirection.disabled = true;
            const toResetSorting = new CustomEvent("to-reset-sorting", {
                bubbles: true,
                composed: true,
            });
            this.shadowRoot.dispatchEvent(toResetSorting);
            this.sortAddingButton.disabled = true;
            this.submitButton.disabled = true;
            this.resetButton.disabled = true;
        });
        this.submitButton.addEventListener("click", () => {
            const toSortData = new CustomEvent("to-sort-data", {
                bubbles: true,
                composed: true,
                detail: {
                    mappedSortOptions: this.mapSortOptions(this.sortOptions)
                }
            });
            this.shadowRoot.dispatchEvent(toSortData);
            for (let i = 0; i < this.sortOptions.length; i++) {
                this.sortOptions[i].sortField.disabled = true;
                this.sortOptions[i].sortDirection.disabled = true;
            }
            //this.sortingService.sortData(this.mapSortOptions(this.sortOptions));
        });
        this.sortOptions[0].sortLine.addEventListener("change", () => {
            if (this.sortOptions[0].fieldOption !== "Sort by" && (this.sortOptions[0].directionOption === SortDirection.ASC || this.sortOptions[0].directionOption === SortDirection.DESC)) {
                this.sortAddingButton.disabled = false;
                this.submitButton.disabled = false;
                this.resetButton.disabled = false;
            }
        });
        this.sortAddingButton.addEventListener("click", () => {
            this.submitButton.disabled = true;
            this.sortAddingButton.disabled = true;
            this.disableLastSortLine();
            this.getPreviousChosenFields();
            this.createNewSortLine();
        });
    }
    disableLastSortLine() {
        this.sortOptions[this.sortOptions.length - 1].disableSelects();
    }
    getPreviousChosenFields() {
        return this.sortOptions.map((option) => option.fieldOption);
    }
    getRemainingFields() {
        const previousChosenField = this.getPreviousChosenFields();
        console.log(this.allFields.filter((field) => !previousChosenField.includes(field)));
        return this.allFields.filter((field) => !previousChosenField.includes(field));
    }
    canAddNewSortingRule() {
        return this.getRemainingFields().length > 1;
    }
    createNewSortLine() {
        if (this.columnDisplayNameToColumnIdMapper === undefined) {
            throw new Error('Please set column name to column id callback function!');
        }
        const newSortLine = new SortingRule(this.getRemainingFields());
        this.sortOptions.push(newSortLine);
        newSortLine.addEventListener("is-direction-set", () => {
            this.submitButton.disabled = false;
            this.resetButton.disabled = false;
            if (this.canAddNewSortingRule()) {
                this.sortAddingButton.disabled = false;
            }
        });
        this.sortLines.append(newSortLine);
    }
    setSortFieldsInSortFieldButton(displayNames) {
        this.allFields = displayNames;
        this.allFields.unshift("Sort by");
    }
    mapSortOptions(sortOptions) {
        return sortOptions.map((option) => {
            return {
                id: this.columnDisplayNameToColumnIdMapper(option.fieldOption),
                direction: option.directionOption
            };
        });
    }
    getElementReferences() {
        this.sortingArea = this.shadowRoot.querySelector(".sorting");
        this.sortDataButtonArea = this.shadowRoot.querySelector(".sort-data-button-area");
        this.sortDataButton = this.shadowRoot.querySelector(".sort-data-button");
        this.sortAddingButton = this.shadowRoot.querySelector(".sort-adding-button");
        this.submitButton = this.shadowRoot.querySelector(".submit-button");
        this.resetButton = this.shadowRoot.querySelector(".reset-button");
        this.closeButton = this.shadowRoot.querySelector(".close-button");
        this.sortLines = this.shadowRoot.querySelector(".sort-lines");
    }
}
customElements.define(MySortingSection.TAG, MySortingSection);
console.log(ConfigService);
//# sourceMappingURL=MySortingSection.js.map