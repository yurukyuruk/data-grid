const {template} = {
    template: `
    <style>  
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
      .sort-field, .sort-direction {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.9rem;
        text-align: center;
      }
      
      .sort-line {
        display:flex;
      }
  </style>
    <div class="sort-line">
      <select class="sort-field" name="fields">
      </select>
      <select class="sort-direction" name="direction">
        <option class="option-default" value="sort direction" selected>sort direction</option>
        <option value="ascending">ascending</option>
        <option value="descending">descending</option>
      </select>   
    </div>       
    `
  };

  export class SortingRule extends HTMLElement {
    static TAG = "sorting-rule";
    constructor(sortFields) {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;
      this.getElementReferences();
      this.initilizeListeners();
      this.setSortByOptions(sortFields);
     
      this.setButtons();
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
      setButtons() {
        this.sortDirection.disabled = true;
      }
      initilizeListeners() {       
        this.sortField.addEventListener("change", () => {
          if(this.fieldOption !== "sort by") {
            this.sortDirection.disabled = false;
          }
        })
        this.sortDirection.addEventListener("change", () => {
          const isDirectionSet = new CustomEvent("is-direction-set", {
            bubbles: true,
            composed: true
          });
          this.shadowRoot.dispatchEvent(isDirectionSet);
        }) 
      }
      disableSelects() {
        this.sortField.disabled = true;
        this.sortDirection.disabled = true;
      }
      setSortByOptions(sortFields) {
        if(sortFields === undefined) {
          return void 0;
        }
        
        sortFields.forEach(item => {
          const fieldOptionElement = document.createElement("option");
          fieldOptionElement.textContent = item;
          fieldOptionElement.value = item;
          if(item === sortFields[0]) {
            fieldOptionElement.classList = "option-default";
          } 
          this.sortField.append(fieldOptionElement); 
        })

      
     }
      
      getElementReferences() { 
        this.sortLine = this.shadowRoot.querySelector(".sort-line");
        this.sortField = this.shadowRoot.querySelector(".sort-field");
        this.sortDirection = this.shadowRoot.querySelector(".sort-direction");
        let options = ["sort direction", "id", "gender", "first name", "last name", "birth date", "age", "e-mail", "address"]; 
      }
    }
  customElements.define(SortingRule.TAG, SortingRule);

 