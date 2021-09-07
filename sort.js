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
        <div class="sort-line">
            <select class="sort-field" name="fields">
                <option class="option-default" value="sort by" selected>sort by</option>
                <option value="id">id</option>
                <option value="gender">gender</option>
                <option value="first name">first name</option>
                <option value="last name">last name</option>
                <option value="birth date">birth date</option>
                <option value="age">age</option>
                <option value="e-mail">e-mail</option>
                <option value="address">address</option>
            </select>
            <select class="sort-direction" name="direction">
                <option class="option-default" value="sort direction" selected>sort direction</option>
                <option value="ascending">ascending</option>
                <option value="descending">descending</option>
            </select>
        </div>
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
    this.sortAddingButton.disabled = true;
    this.sortDirection.disabled = true;
  }
  initializeListeners() {
    this.sortDataButton.addEventListener("click", () => {
      this.sortDataButtonArea.setAttribute("data-sort-button-area-visible", "false");
      this.sortDataButton.setAttribute("data-sort-button-visible", "false");
      this.sortingArea.setAttribute("data-sort-fields-visible", "true");
      this.table.classList.toggle("blured");
      
    });
    this.sortField.addEventListener("change", () => {
      if(this.sortField.value !== "sort by") {
        this.sortDirection.disabled = false;
      }
    })

    this.closeButton.addEventListener("click", () => {
      this.sortDataButtonArea.setAttribute("data-sort-button-area-visible", "true");
      this.sortDataButton.setAttribute("data-sort-button-visible", "true");
      this.sortingArea.setAttribute("data-sort-fields-visible", "false");
      this.table.classList.toggle("blured");
    })

    this.resetButton.addEventListener("click", () => {
      this.sortAddingButton.disabled = true;
      this.submitButton.disabled = true;
      let firstSortLine = this.sortLines.firstElementChild; 
      this.sortLines.innerHTML = "";
      this.sortLines.append(firstSortLine);
      firstSortLine.firstElementChild.disabled = false;
      firstSortLine.lastElementChild.disabled = false;
    })

    this.submitButton.addEventListener("click", () => {

    })
    this.sortLine.addEventListener("change", () => {
      if(this.sortField.value !== "sort by" && this.sortDirection.value !== "sort direction") {
        this.sortAddingButton.disabled = false;
        this.submitButton.disabled = false; 
      }
    })
    
    let fieldOptionElement;
    this.sortAddingButton.addEventListener("click", () => {
      this.submitButton.disabled = true;
      this.sortAddingButton.disabled = false;
    
      /*let newSortField = document.createElement('select');
      newSortField.classList = "sort-field";

      const fieldValueNames = ["sort by", "id", "gender", "first name", "last name", "birth date", "age", "e-mail", "address"];
      fieldValueNames.forEach(item => {
        fieldOptionElement = document.createElement("option");
        if(item === fieldValueNames[0]) {
          fieldOptionElement.classList = "option-default";
        } 
        fieldOptionElement.textContent = item;
        fieldOptionElement.value = item;
        newSortField.append(fieldOptionElement); 
      })

      let newSortDirection = document.createElement('select');
      newSortDirection.classList = "sort-direction";
      const directionValueNames = ["sort direction", "ascending", "descending"];
      directionValueNames.forEach(item => {
        const directionOptionElement = document.createElement("option");
        if(item === directionValueNames[0]) {
          directionOptionElement.classList = "option-default";
        } 
        directionOptionElement.textContent = item;
        directionOptionElement.value = item;
        newSortDirection.append(directionOptionElement); 
      })*/

      this.sortOptions.push(new MySortingRules());
      this.sortLines.append(this.sortOptions[this.sortOptions.length - 1]);
      
      /*if(this.sortOptions.length > 1) {
        this.sortLines.childNodes[this.sortLines.childNodes.length - 2].shadowRoot.lastElementChild.firstElementChild.disabled = true;
        this.sortLines.childNodes[this.sortLines.childNodes.length - 2].shadowRoot.lastElementChild.lastElementChild.disabled = true;
      } else { 
        this.sortLines.childNodes[1].firstElementChild.disabled = true;
        this.sortLines.childNodes[1].lastElementChild.disabled = true;
      }

      if(this.sortOptions.length > 0) {
        let currentSortFieldArea = this.sortLines.childNodes[this.sortLines.childNodes.length - 1].shadowRoot.lastElementChild.firstElementChild;
        let currentSortDirectionArea = this.sortLines.childNodes[this.sortLines.childNodes.length - 1].shadowRoot.lastElementChild.lastElementChild;
        currentSortDirectionArea.disabled = true;
        currentSortFieldArea.addEventListener("change", () => {

        })  
      }*/
     
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
    this.sortLine = this.shadowRoot.querySelector(".sort-line");
    this.sortField = this.shadowRoot.querySelector(".sort-field");
    this.sortDirection = this.shadowRoot.querySelector(".sort-direction");
  }
}

customElements.define(MySortingSection.TAG, MySortingSection);
