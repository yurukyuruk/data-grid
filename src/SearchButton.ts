const { template } = {
  template: `
      <style>  
        .search-button-area {
            width: 12rem;   
            font-size: 0.9rem;
            text-align: center;
            display: flex;
            align-items: center;
            margin-right: 1rem;
        }
        .input {
            width: 12rem;
            height: 1.1rem;
            border: #c67b58 1px solid;
            backgroundColor: white;
        }
        .search-button {
            width: 2rem;
            height: 1rem;
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
            transition: transform 250ms ease-in-out;
        }
        .button-icon:hover {
            transform: scale(1.2);
            cursor: pointer;
        }
        
    </style>
      <form class="search-button-area">
         <input type="text" placeholder="Search" name="search" class="input">  
         <button class="search-button">
            <img src="images/search_icon.svg" class="button-icon">
         </button>
      </form>       
      `
};

export class SearchButton extends HTMLElement {
  static TAG = "search-button";
  private input!: HTMLInputElement;
  private searchButton!: HTMLButtonElement;
  readonly shadowRoot: ShadowRoot;
  dataRows: HTMLTableSectionElement;
  constructor(dataRows: HTMLTableSectionElement) {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.getElementReferences();
    this.dataRows = dataRows;
    this.initilizeListeners();
    
  }
  
  initilizeListeners() {
    const debounce = (func: () => void , delay: number) => {
      let debounceId: number;
      return () => {
        clearTimeout(debounceId);
        debounceId = setTimeout(func, delay);
      };
    };
    this.input.addEventListener(
      "keyup",
      debounce(() => { 
        this.dataRows.innerHTML = "";
        const toSortData2: CustomEvent = new CustomEvent("to-sort-data-2", {
          bubbles: true,
          composed: true,
        });
        this.shadowRoot.dispatchEvent(toSortData2);
        const inputValue: string = this.input.value.toLowerCase();
      const toFilterRows: CustomEvent = new CustomEvent("to-filter-rows", {
        bubbles: true,
        composed: true,
        detail: {
          input: inputValue
        }
      });
      document.dispatchEvent(toFilterRows);      
      
      const toCreateDataRows: CustomEvent = new CustomEvent("to-create-data-rows", {
        bubbles: true,
        composed: true,
      });
      this.shadowRoot.dispatchEvent(toCreateDataRows);
      const toCreateRows: CustomEvent = new CustomEvent("to-create-rows", {
        bubbles: true,
        composed: true,
      });
      document.dispatchEvent(toCreateRows);
      
      const columnsVisibility: string[] = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "[]");
      const toSetVisibilityAttribute2: CustomEvent = new CustomEvent("to-set-visibility-attribute-2", {
        bubbles: true,
        composed: true,
        detail: {
          visibility: columnsVisibility
        }
      });
      document.dispatchEvent(toSetVisibilityAttribute2);     
      }, 1000)
    );
    this.searchButton.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }

  getElementReferences() {
    this.input = this.shadowRoot.querySelector(".input") as HTMLInputElement;
    this.searchButton = this.shadowRoot.querySelector(".search-button") as HTMLButtonElement; 
  }
}
customElements.define(SearchButton.TAG, SearchButton);
