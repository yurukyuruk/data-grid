
import {SortingRule} from "./SortingRule.js";
const {template} = {
    template: `
    <style>  

        
  </style>
       
    `
  };

  export class SortingService extends HTMLElement {
    static TAG = "sorting-service";
    constructor(fieldName, sortDirection, sortType) {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;
      this.getElementReferences();
      this.initilizeListeners();
      this.fieldName = fieldName;
      this.sortDirection = sortDirection;
      this.sortType = sortType;
      }
      
      initilizeListeners() {       

     }
      
      getElementReferences() { 
        this.fieldOption = trial.fieldOption;
      }
    }
  customElements.define(SortingService.TAG, SortingService);