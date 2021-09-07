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
      .sort-field, .sort-direction {
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
      .sort-line {
        display:flex;
      }
  </style>
        <div class="sort-line">
            <select class="sort-field">
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
      initilizeListeners() {

      }
      getElementReferences() { 
        this.sortLine = this.shadowRoot.querySelector(".sort-line");
        this.sortField = this.shadowRoot.querySelector(".sort-field");
        this.sortDirection = this.shadowRoot.querySelector(".sort-direction"); 
      }
    }
  customElements.define(MySortingRules.TAG, MySortingRules);

 