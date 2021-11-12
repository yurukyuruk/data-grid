import { SortingRule } from "./SortingRule.js";
import { config, sortingService } from "./index.js";
const { template } = {
    template: `
  <style>  
  .sort-data-button-area {
    padding: 2.1rem;
    background-color: rgb(252, 252, 184);
    display: flex;
    justify-content: center;
    margin-right: -1rem;
  }
  .sort-data-button {
    border: 1px solid black;
    background-color: rgb(235, 144, 101);
    cursor: pointer;
    outline: 2px solid white;
    outline-offset: 1rem;
    width: 8rem;
  }
  .sort-data-button:hover {
    transform: scale(1.1);
  }
  .sorting {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(252, 252, 184);
    position: absolute;
    top: 45%;
    left: 30%;
    z-index: 1;
    max-height: 50vh;
    border: 2px solid rgb(235, 144, 101);
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
  .close-button {
    align-self: flex-end;
    border: black 1px solid;
    background-color: rgb(235, 144, 101);
    cursor: pointer;
    margin: 1px 1px 0 0;
  }
  .close-button:hover {
    background-color: white;
  }

  .sort-adding-button {
    align-self: center;
    padding: 0 2px;
    margin: 5px;
    cursor: pointer;
    background-color: white;
    border: 1px solid black;
  }
  .reset-button {
    border: black 1px solid;
    width: 8vw;
    margin: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    padding-top: 0;
    padding-bottom: 0;
    background-color: white;
  }
  .submit-button {
    border: black 1px solid;
    width: 8vw;
    margin: 5px;
    cursor: pointer;
    margin-bottom: 10px;
    padding-top: 0;
    padding-bottom: 0;
    background-color: white;
  }
  .reset-button:hover, .submit-button:hover, .sort-adding-button:hover {
    background-color: rgb(235, 144, 101);
  }
  .sort-data-button, .sort-adding-button, .close-button, .reset-button, .submit-button, .addition-symbol {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9rem;
    text-align: center;
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
    table;
    sortLines;
    sortLine;
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = template;
        this.getElementReferences();
        this.setButtons();
        this.allFields = ["sort by", "id", "gender", "first name", "last name", "birth date", "age", "e-mail", "address"];
        this.sortOptions = [this.shadowRoot.querySelector(SortingRule.TAG)];
        this.sortOptions[0].setSortByOptions(this.allFields);
        this.initializeListeners();
    }
    setButtons() {
        this.submitButton.disabled = false;
        this.sortAddingButton.disabled = true;
    }
    initializeListeners() {
        this.sortDataButton.addEventListener("click", () => {
            this.sortDataButtonArea.setAttribute("data-sort-button-area-visible", "false");
            this.sortDataButton.setAttribute("data-sort-button-visible", "false");
            this.sortingArea.setAttribute("data-sort-fields-visible", "true");
            this.table.classList.toggle("blured");
            let sortInformation = JSON.parse(localStorage.getItem("sortInformation") ?? "[]");
            if (sortInformation !== null && sortInformation.length === 1 && sortInformation[0].field !== "sort by") {
                this.sortOptions[0].fieldOption = sortInformation[0].field;
                this.sortOptions[0].sortDirection.disabled = false;
                this.sortOptions[0].directionOption = sortInformation[0].direction;
            }
            else if (sortInformation !== null && sortInformation.length > 1) {
                this.sortOptions[0].fieldOption = sortInformation[0].field;
                this.sortOptions[0].sortDirection.disabled = false;
                this.sortOptions[0].directionOption = sortInformation[0].direction;
                for (let i = 1; i < sortInformation.length; i++) {
                    this.createNewSortLine();
                    this.sortOptions[i].fieldOption = sortInformation[i].field;
                    this.sortOptions[i].sortDirection.disabled = false;
                    this.sortOptions[i].directionOption = sortInformation[i].direction;
                }
            }
        });
        this.closeButton.addEventListener("click", () => {
            this.sortDataButtonArea.setAttribute("data-sort-button-area-visible", "true");
            this.sortDataButton.setAttribute("data-sort-button-visible", "true");
            this.sortingArea.setAttribute("data-sort-fields-visible", "false");
            this.table.classList.toggle("blured");
            this.sortAddingButton.disabled = true;
            this.submitButton.disabled = true;
            this.sortLines.innerHTML = "";
            this.sortOptions = [];
            this.createNewSortLine();
            this.sortOptions[0].sortDirection.disabled = true;
        });
        this.resetButton.addEventListener("click", () => {
            this.sortAddingButton.disabled = true;
            this.submitButton.disabled = true;
            this.sortLines.innerHTML = "";
            this.sortOptions = [];
            this.createNewSortLine();
            this.sortOptions[0].sortDirection.disabled = true;
            config.clearSortInformation();
        });
        this.submitButton.addEventListener("click", () => {
            this.sortAddingButton.disabled = true;
            this.submitButton.disabled = true;
            sortingService.sortData(config.setSortInformation(config.getSortOptions(this.sortOptions)));
            const toSort = new CustomEvent("to-sort", {
                bubbles: true,
                composed: true
            });
            this.shadowRoot.dispatchEvent(toSort);
            config.saveSortInformation(this.sortOptions);
        });
        this.sortOptions[0].sortLine.addEventListener("change", () => {
            if (this.sortOptions[0].fieldOption !== "sort by" && this.sortOptions[0].directionOption !== "sort direction") {
                this.sortAddingButton.disabled = false;
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
        return this.sortOptions.map(option => option.fieldOption);
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
        let newSortLine = new SortingRule(this.getRemainingFields());
        this.sortOptions.push(newSortLine);
        newSortLine.addEventListener("is-direction-set", () => {
            this.submitButton.disabled = false;
            if (this.canAddNewSortingRule()) {
                this.sortAddingButton.disabled = false;
            }
        });
        this.sortLines.append(newSortLine);
    }
    getElementReferences() {
        this.sortingArea = this.shadowRoot.querySelector(".sorting");
        this.sortDataButtonArea = this.shadowRoot.querySelector(".sort-data-button-area");
        this.sortDataButton = this.shadowRoot.querySelector(".sort-data-button");
        this.sortAddingButton = this.shadowRoot.querySelector(".sort-adding-button");
        this.submitButton = this.shadowRoot.querySelector(".submit-button");
        this.resetButton = this.shadowRoot.querySelector(".reset-button");
        this.closeButton = this.shadowRoot.querySelector(".close-button");
        this.table = document.querySelector('#data-table');
        this.sortLines = this.shadowRoot.querySelector(".sort-lines");
        this.sortLine = this.shadowRoot.querySelector(".sort-line");
    }
}
customElements.define(MySortingSection.TAG, MySortingSection);
//# sourceMappingURL=sortModel.js.map