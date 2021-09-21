const {template} = {
    template: `
    <style>  

        
  </style>
       
    `
  };

  export class SortingService extends HTMLElement {
    static TAG = "sorting-service";
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;
      this.getElementReferences();
      this.initilizeListeners();
      }
   
      initilizeListeners() {       

     }
      
      getElementReferences() { 
        
      }
    }
  customElements.define(SortingService.TAG, SortingService);