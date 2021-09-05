const {template} = {
    template: `
    <style>  
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
        margin: 5px;
      }
      .option-default {
        display: none;
      }
      .sort-field, .sort-direction, .sort-options-clone {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.9rem;
        text-align: center;
      }
      section[data-sort-fields-visible="false"] {
        display: none;
      }
      .chosen-option {
        display: none;
      }
      .sort-line, .sort-line-cloned {
        display:flex;
      }
  </style>
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
    `
  };

  export class MySortingRules extends HTMLElement {
    static TAG = "my-sorting-rules";
    constructor(sortFields) {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;
      this.getElementReferences();
    }
    
      set fieldOption(value) {
        this.sortField.value = value;
      }
      get fieldOption() {
       return this.sortField.value;
      }
      set directionOption(value) {
        this.sortDirection.value = value;
      }
      get directionOption() {
        return this.sortDirection.value;
      }
      getElementReferences() { 
        this.sortLine = this.shadowRoot.querySelector(".sort-line");
        this.sortField = this.shadowRoot.querySelector(".sort-field");
        this.sortDirection = this.shadowRoot.querySelector(".sort-direction"); 
      }
    }
  customElements.define(MySortingRules.TAG, MySortingRules);

     /*this.sortAddingButton.addEventListener("click", () => {
        this.sortLineCloned = this.sortLine.cloneNode(true);
        this.sortLineCloned.classList = "sort-line-cloned";
        this.sortLines.insertBefore(this.sortLineCloned, this.sortLine.nextSibling);
        sortOptionsList.push(this.sortLineCloned);
        this.currentSortLine = sortOptionsList[this.sortLines.childElementCount - 1];
        this.currentSelectedSortField = this.currentSortLine.firstElementChild;
        this.currentSelectedSortDirection = this.currentSortLine.lastElementChild;
        if((this.sortLines.childElementCount - 1) > (this.columnCount - 1)) {
            this.sortAddingButton.disabled = true;
        }
        this.previousSelectedSortLine = sortOptionsList[this.sortLines.childElementCount - 2];
        this.previousSelectedSortLine.disabled = true;
    })

    this.currentSelectedSortField.addEventListener("change", () => {
        let selectedSortFieldOption = this.currentSelectedSortField.value;
        if(selectedSortFieldOption !== "sort by") {
          this.currentSelectedSortDirection.disabled = false;
        }
        this.sortFieldOptions.forEach(element =>  {
            if(element.value === selectedSortFieldOption) {
                this.sortFieldOptions.remove(element);
            }
        })
      })
    
      this.currentSelectedSortDirection.addEventListener("change", () => {
        let selectedSortDirectionOption = this.currentSelectedSortDirection.value;
        if(selectedSortDirectionOption !== "sort direction ") {
          this.sortAddingButton.disabled = false;
          this.submitButton.disabled = false;
        }
      })
    
      currentSortLine.addEventListener("change", () => {
        let selectedSortFieldOption = this.currentSelectedSortField.value;
        let selectedSortDirectionOption = this.currentSelectedSortDirection.value;
        if(selectedSortFieldOption !== "sort by" && selectedSortDirectionOption !== "sort direction") {
          this.submitButton.disabled = false;
        } else{this.submitButton.disabled = true;
          this.sortAddingButton.disabled = true;
        };  
      })
      
       getElementReferences() {
        this.sortLines = this.shadowRoot.querySelector(".sort-lines");
        this.sortLine = this.shadowRoot.querySelector(".sort-line");
        this.defaultSortField = this.shadowRoot.querySelector(".sort-field");
        this.defaultSortDirection = this.shadowRoot.querySelector(".sort-direction");
        this.columnCount = document.querySelector(".columns").childElementCount;
        this.sortLineCloned = this.sortLine.cloneNode(true);
        let sortOptionsList = [this.sortLine];
        this.currentSortLine = sortOptionsList[this.sortLines.childElementCount - 1];
        this.currentSelectedSortField = this.currentSortLine.firstElementChild;
        this.currentSelectedSortDirection = this.currentSortLine.lastElementChild;
        this.sortFieldOptions = this.shadowRoot.querySelectorAll(".sort-field option");
        this.sortDirectionOptions = this.shadowRoot.querySelectorAll(".sort-direction option");
    }
    */