const { template } = {
    template: `
      <style>  
        .search-button-area {
            width: 12rem;
            outline: 2px solid white;
            outline-offset: 1rem;   
            font-size: 0.9rem;
            text-align: center;
            display: flex;
            align-items: center;
            margin-right: 1rem;
        }
        .input {
            width: 12rem;
            height: 1.1rem;
            border: 1px solid black;
        }
        .search-button {
            width: 2rem;
            font-family: Arial, Helvetica, sans-serif;
            margin-left: -2.4rem;
            border: none;
            background-color: white;
            opacity: 0.5;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .button-icon {
            margin-left: 1.4rem;
            height: 1.2rem;
        }
        .button-icon:hover {
            transform: scale(1.2);
            cursor: pointer;
        }
        
    </style>
      <form class="search-button-area">
         <input type="text" placeholder="Search" name="search" class="input">  
         <button type="submit" class="search-button">
            <img src="images/search_icon.svg" class="button-icon">
         </button>
      </form>       
      `
  };
  
  export class SearchButton extends HTMLElement {
    static TAG = "search-button";
    readonly shadowRoot: ShadowRoot;
    constructor() {
      super();
      this.shadowRoot = this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;
      this.getElementReferences();
      this.initilizeListeners();
    }
    
    initilizeListeners() {
      
    }
   
    
    getElementReferences() {
     
    }
  }
  customElements.define(SearchButton.TAG, SearchButton);