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
    input;
    searchButton;
    shadowRoot;
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
        this.input.addEventListener("keyup", debounce(() => {
            const inputValue = this.input.value.toLowerCase();
            const allDataRows = document.querySelectorAll(".data-row");
            const allTextContentsOfRows = [];
            allDataRows.forEach((row) => {
                const textContentOfEachRow = [];
                for (let i = 0; i < row.children.length; i++) {
                    textContentOfEachRow.push(row.children[i].textContent?.toLowerCase() ?? "");
                }
                allTextContentsOfRows.push(textContentOfEachRow);
            });
            for (let i = 0; i < allTextContentsOfRows.length; i++) {
                let n = 0;
                for (let j = 0; j < allTextContentsOfRows[i].length; j++) {
                    if (allTextContentsOfRows[i][j].includes(inputValue)) {
                        n += 1;
                    }
                    if (inputValue === "" || n > 0) {
                        allDataRows[i].style.display = "table-row";
                    }
                    else {
                        allDataRows[i].style.display = "none";
                    }
                }
            }
        }, 1000));
        this.searchButton.addEventListener("click", (e) => {
            e.preventDefault();
        });
    }
    getElementReferences() {
        this.input = this.shadowRoot.querySelector(".input");
        this.searchButton = this.shadowRoot.querySelector(".search-button");
    }
}
customElements.define(SearchButton.TAG, SearchButton);
//# sourceMappingURL=SearchButton.js.map