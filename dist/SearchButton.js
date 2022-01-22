import { config, DATA_ROWS } from "./configExport.js";
import { createRows } from "./index.js";
import { extractValuesFromKeys, isObject } from "./utils.js";
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
            const dataRows = document.querySelector(".data-rows");
            dataRows.innerHTML = "";
            const inputValue = this.input.value.toLowerCase();
            function filterRows(rows, searchValue) {
                const columnNames = config.getVisibleColumnIds();
                return rows.filter(row => {
                    const visibleValues = extractValuesFromKeys(row, columnNames);
                    return visibleValues.some(value => {
                        return isObject(value)
                            ? Object.values(value)
                                .some(cellValue => cellValue.toString().toLowerCase().includes(searchValue))
                            : value.toString().toLowerCase().includes(searchValue);
                    });
                });
            }
            DATA_ROWS.visibleRows = filterRows(DATA_ROWS.rows, inputValue);
            createRows(DATA_ROWS.visibleRows);
            /*DATA_ROWS.visibleRows = [];
            DATA_ROWS.rows.forEach(row => {
              let i = 0;
              Object.keys(row).forEach(key => {
                if(typeof row[key] === "object") {
                  Object.keys(row[key]).forEach(keyOfRowKey => {
                    if(row[key][keyOfRowKey].toString().toLowerCase().includes(inputValue) === true) {
                      i += 1;
                    }
                  })
                } else if(typeof row[key] !== "object" && row[key].toString().toLowerCase().includes(inputValue) === true) {
                  i += 1;
                }
              })
              if(i > 0) {
                DATA_ROWS.visibleRows.push(row);
              }
            })*/
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