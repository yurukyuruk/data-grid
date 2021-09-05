import {MySortingRules} from "./sort-rules.js";
const {template} = {
  template: `
  <style>  
  .sort-data-button-area {
    padding: 2.1rem;
    background-color: rgb(252, 252, 184);
    display: flex;
    justify-content: center;
  }
  .sort-data-button {
    border: 1px solid black;
    background-color: rgb(235, 144, 101);
    cursor: pointer;
    outline: 2px solid white;
    outline-offset: 1rem;
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
  }
  .close-button {
    align-self: flex-end;
    border: black 1px solid;
    background-color: rgb(235, 144, 101);
    cursor: pointer;
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
</style>
<div class="sort-data-button-area" data-sort-button-area-visible="true">
  <input class="sort-data-button" data-sort-button-visible="true" type="button" value="SORT DATA">
</div>
<section class="sorting" data-sort-fields-visible="false">
  <input class="close-button" type="button" value="x">
  <div class="sort-lines"> 
  </div>
  <input class="sort-adding-button" type="button" value="+">
  <div class="submit-buttons">
    <input class="reset-button" type="reset" value="clear">
    <input class="submit-button" type="submit" value="apply">
  </div>
</section>        
  `
};

export class MySortingSection extends HTMLElement {
  static TAG = "my-sorting-section";
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.getElementReferences();
    this.setButtons();
    this.initializeListeners();
    this.sortOptions = [];
  }
  setButtons() {
    this.submitButton.disabled = true;
    this.sortAddingButton.disabled = false;
    
  }
  initializeListeners() {
    this.sortDataButton.addEventListener("click", () => {
      this.sortDataButtonArea.setAttribute("data-sort-button-area-visible", "false");
      this.sortDataButton.setAttribute("data-sort-button-visible", "false");
      this.sortingArea.setAttribute("data-sort-fields-visible", "true");
      this.table.classList.toggle("blured");
    });

    this.closeButton.addEventListener("click", () => {
      this.sortDataButtonArea.setAttribute("data-sort-button-area-visible", "true");
      this.sortDataButton.setAttribute("data-sort-button-visible", "true");
      this.sortingArea.setAttribute("data-sort-fields-visible", "false");
      this.table.classList.toggle("blured");
    })

    this.resetButton.addEventListener("click", () => {
      this.allNewSortLine = this.shadowRoot.querySelectorAll(".new-sort-line");
      this.allNewSortLine.forEach(element => element.remove());
      this.sortLines = this.shadowRoot.querySelector(".sort-lines");
      this.sortLines.selectedIndex = 0;
      this.sortDirections = this.shadowRoot.querySelector(".sort-direction");
      this.sortLines.selectedIndex = 0;
      this.sortAddingButton.disabled = true;
      this.submitButton.disabled = true;
      //this.defaultSortDirection.disabled = true;
    })

    this.submitButton.addEventListener("click", () => {

    })

    this.sortAddingButton.addEventListener("click", () => {
      this.submitButton.disabled = true;
      this.sortAddingButton.disabled = true;
      const newSortLine = document.createElement('div');
      newSortLine.classList = ".new-sort-line";
      const newSortField = document.createElement('select');
      newSortField.classList = "sort-field";

      const fieldValueNames = ["sort by", "id", "gender", "first name", "last name", "birth date", "age", "e-mail", "address"];
      fieldValueNames.forEach(item => {
        const fieldOptionElement = document.createElement("option");
        if(item === fieldValueNames[0]) {
          fieldOptionElement.classList = "option-default";
        } 
        fieldOptionElement.textContent = item;
        fieldOptionElement.value = item;
        this.newSortField.append(fieldOptionElement); 
      })

      newSortField.forEach(function(e) {
        if(this.sortOptions[this.sortOptions.length - 2] === newSortField.e) {
          newSortField.remove(e);
        }
      })

      const newSortDirection = document.createElement('select');
      newSortDirection.classList = "sort-direction";

      const directionValueNames = ["sort direction", "ascending", "descending"];
      directionValueNames.forEach(item => {
        const directionOptionElement = document.createElement("option");
        if(item === directionValueNames[0]) {
          directionOptionElement.classList = "option-default";
        } 
        directionOptionElement.textContent = item;
        directionOptionElement.value = item;
        this.newSortField.append(directionOptionElement); 
      })

      this.sortOptions.push(new MySortingRules());
      this.sortLines.append(this.sortOptions[this.sortOptions.length - 1]);   
  })
  }
  getElementReferences() {
    this.sortingArea = this.shadowRoot.querySelector(".sorting");
    this.sortDataButtonArea = this.shadowRoot.querySelector(".sort-data-button-area");
    this.sortDataButton = this.shadowRoot.querySelector(".sort-data-button");
    this.sortAddingButton = this.shadowRoot.querySelector(".sort-adding-button");
    this.submitButton = this.shadowRoot.querySelector(".submit-button");
    this.resetButton = this.shadowRoot.querySelector(".reset-button");
    this.columnCount = document.querySelector(".columns").childElementCount;
    this.closeButton = this.shadowRoot.querySelector(".close-button");
    this.table = document.querySelector('#data-table');
    this.sortLines = this.shadowRoot.querySelector(".sort-lines");
  }
}

customElements.define(MySortingSection.TAG, MySortingSection);
