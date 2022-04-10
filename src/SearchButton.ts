import { config, DATA_ROWS, sortingService } from "./configExport.js";
import { RowRecord } from "./types/interfaces.js";
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
        const dataRows = document.querySelector(".data-rows") as HTMLTableSectionElement;
        dataRows.innerHTML = "";
        sortingService.sortData(JSON.parse(localStorage.getItem("sortInformation") ?? "[]"));
        const inputValue: string = this.input.value.toLowerCase();
        function filterRows(rows: RowRecord[], searchValue: string) {
          const columnNames = config.getVisibleColumnIds();
          return rows.filter(row => {
              const visibleValues = extractValuesFromKeys(row, columnNames);
              return visibleValues.some(value => {
                  return isObject(value)
                      ? Object.values(value)
                              .some(cellValue => cellValue.toString().toLowerCase().includes(searchValue))
                      : value.toString().toLowerCase().includes(searchValue);
              })
          })
      }      
      DATA_ROWS.visibleRows = filterRows(DATA_ROWS.rows, inputValue);
      const toCreateDataRows: CustomEvent = new CustomEvent("to-create-data-rows", {
        bubbles: true,
        composed: true,
      });
      this.shadowRoot.dispatchEvent(toCreateDataRows);
      dataGrid.createRows(DATA_ROWS.visibleRows); 
      const columnsVisibility: string[] = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "[]");
      for (let i = 0; i < config.columns.length; i++) {
        const eachDataColumnGroup: NodeListOf<Element> = document.querySelectorAll("." + config.columns[i].id);
        const headersOfEachColumn: NodeListOf<Element> = document.querySelectorAll("." + config.columns[i].id + "-header");
        eachDataColumnGroup.forEach((element) => element.setAttribute("data-column-checkbox-checked", columnsVisibility[i]));
        headersOfEachColumn.forEach((element) => element.setAttribute("data-column-checkbox-checked", columnsVisibility[i]));
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
