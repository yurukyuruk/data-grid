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
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.getElementReferences();
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
        const inputValue: string = this.input.value.toLowerCase();
        const toFilterData: CustomEvent = new CustomEvent("to-filter-data", {
          bubbles: true,
          composed: true,
          detail: {
            userInput: this.input.value,
            inputValue: inputValue
          }
        });
        this.shadowRoot.dispatchEvent(toFilterData);
        
      const columnsVisibility: string[] = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "[]");
      /*for (let i = 0; i < this.config.columns.length; i++) {
        const eachDataColumnGroup: NodeListOf<Element> = this.shadowRoot.querySelectorAll("." + this.config.columns[i].id);
        const headersOfEachColumn: NodeListOf<Element> = this.shadowRoot.querySelectorAll("." + this.config.columns[i].id + "-header");
        eachDataColumnGroup.forEach((element) => element.setAttribute("data-column-checkbox-checked", (<CustomEvent>e).detail.visibility[i]));
        headersOfEachColumn.forEach((element) => element.setAttribute("data-column-checkbox-checked", (<CustomEvent>e).detail.visibility[i]));
      } */    
      }, 1000)
    );
    this.searchButton.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }
  setDefaultSearchValue = (userInput: string) => {
    this.input.setAttribute("value", userInput);
  }
  getElementReferences() {
    this.input = this.shadowRoot.querySelector(".input") as HTMLInputElement;
    this.searchButton = this.shadowRoot.querySelector(".search-button") as HTMLButtonElement; 
  }
}
customElements.define(SearchButton.TAG, SearchButton);
