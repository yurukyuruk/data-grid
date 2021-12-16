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
    const debounce = (func, delay) => {
      let inDebounce;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay);
      };
    };
    this.input.addEventListener(
      "keyup",
      debounce(() => {
        const inputValue: string = this.input.value.toLowerCase();
        const allDataRows: NodeListOf<Element> = document.querySelectorAll(".data-row");
        const allTextContentsOfRows: string[][] = [];
        allDataRows.forEach((row) => {
          const textContentOfEachRow: string[] = [];
          for (let i = 0; i < row.children.length; i++) {
            if (row.children[i].children.length > 0) {
              for (let j = 0; j < row.children[i].children[0].children[0].children.length; j++) {
                textContentOfEachRow.push(row.children[i].children[0].children[0].children[j].textContent?.toLowerCase() ?? "");
              }
            } else {
              textContentOfEachRow.push(row.children[i].textContent?.toLowerCase() ?? "");
            }
          }
          allTextContentsOfRows.push(textContentOfEachRow);
        });
        for (let i = 0; i < allTextContentsOfRows.length; i++) {
          if (inputValue !== "" && !allTextContentsOfRows[i].includes(inputValue)) {
            allDataRows[i].style.display = "none";
          } else {
            allDataRows[i].style.display = "table-row";
          }
        }
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
