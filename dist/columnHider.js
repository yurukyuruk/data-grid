import { config } from "./configExport.js";
import { sortModel } from "./index.js";
const { template } = {
    template: `
    <style>  
    .column-hider-button-area {
        background-color: rgb(252, 252, 184);
        display: flex;
        justify-content: center;
        margin-left: 2.1rem;
      }
      .column-hider-button {
        border: 1px solid black;
        background-color: rgb(235, 144, 101);
        cursor: pointer; 
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.9rem;
        text-align: center;
        width: 12rem;
        box-shadow: 0px 4px 5px 1px rgba(0, 0, 0, 0.4);
        transform: scale(1);
        transition: transform 300ms ease-in-out;  
      }
      .column-hider-button:hover {
        transform: scale(1.1);
      }
      .column-checkboxes-area {
        
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        background-color: rgb(248 248 214);
        position: absolute;
        top: 45%;
        left: 35%;
        z-index: 1;
        border-top: 20px solid rgb(235, 144, 101);
        box-shadow: 0 10px 10px 5px rgba(0, 0, 0, 0.4);
      }
      .column-hider-close-button {
        align-self: flex-end;
        border: none;
        background-color: rgb(235, 144, 101);
        cursor: pointer;
        margin-top: -20px;
      }
      .column-hider-close-button:hover {
        background-color: rgb(248 248 214);
      }
      .column-checkboxes {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr; 
      }
      .column-checkbox {
        max-width: 200px;
        min-width: 100px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.88rem;
        display: flex;
        align-items: center;
      }
      .checkbox{
        width: 15px;
        height: 15px;
        margin: 5px;
        padding-top: 1px;
        appearance: none;
        outline: 1px solid black;
        font-size: 0.8em;
        text-align: center;
        line-height: 1em;
        background-color: white;
        box-shadow: 0 3px 3px 1px rgba(0, 0, 0, 0.4);
      }
      
      .checkbox:checked:after {
        content: '✔';
        height: 15px;
        color: rgb(235, 144, 101);
      }
      .checkbox:hover {
        cursor: pointer;
      }
      div[data-column-hider-button-area-visible="false"] {
        display: none;
      }
      div[data-column-checkboxes-area-visible="false"] {
          display: none;
      }
      .reset-apply-buttons {
          display: flex;
          align-self: center;
      }
    .reset-button {
        border: black 1px solid;
        width: 8vw;
        margin: 5px;
        margin-bottom: 10px;
        cursor: pointer;
        padding-top: 0;
        padding-bottom: 0;
        background-color: rgba(104, 104, 46, 0.37);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.9rem;
        text-align: center;
        box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.4);
    }
    .reset-button:hover {
        background-color: rgb(235, 144, 101);
    }
    th[data-column-checkbox-checked="false"] {
      display: none;
    }
    td[data-column-checkbox-checked="false"] {
      display: none;
    }
    
  </style>
<div class="column-hider-button-area" data-column-hider-button-area-visible="true">
  <input class="column-hider-button" type="button" value="HIDE COLUMN">
</div>
<div class="column-checkboxes-area" data-column-checkboxes-area-visible="false">
    <div>
        <input class="column-hider-close-button" type="button" value="x">
    </div>
    <div class="column-checkboxes">
    </div>
    <div class="reset-apply-buttons">
        <input class="reset-button" type="button" value="reset">
    </div>
</div>

    `
};
export class ColumnHider extends HTMLElement {
    static TAG = "column-hider";
    shadowRoot;
    columnHiderButtonArea;
    columnHiderButton;
    columnCheckboxesArea;
    columnHiderCloseButton;
    columnCheckboxes;
    resetButton;
    allColumnCheckboxes;
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = template;
        this.columnHiderButtonArea = this.shadowRoot.querySelector(".column-hider-button-area");
        this.columnHiderButton = this.shadowRoot.querySelector(".column-hider-button");
        this.columnCheckboxesArea = this.shadowRoot.querySelector(".column-checkboxes-area");
        this.columnHiderCloseButton = this.shadowRoot.querySelector(".column-hider-close-button");
        this.columnCheckboxes = this.shadowRoot.querySelector(".column-checkboxes");
        this.resetButton = this.shadowRoot.querySelector(".reset-button");
        this.initilizeListeners();
    }
    createAndSetCheckboxes(columnNames) {
        for (let i = 0; i < columnNames.length; i++) {
            const checkboxHolder = document.createElement("div");
            checkboxHolder.classList.add("column-checkbox");
            checkboxHolder.setAttribute("data-column-checkbox-checked", "true");
            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.classList.add("checkbox");
            checkbox.setAttribute("checked", "checked");
            checkbox.addEventListener("click", () => {
                const wholeColumnData = document.querySelectorAll("." + columnNames[i]);
                const wholeColumnHeaders = document.querySelectorAll("." + columnNames[i] + "-header");
                const checkboxElementsStateChange = wholeColumnData[0].getAttribute("data-column-checkbox-checked") === "true" ? false : true;
                wholeColumnData.forEach((data) => data.setAttribute("data-column-checkbox-checked", checkboxElementsStateChange.toString()));
                wholeColumnHeaders.forEach((header) => header.setAttribute("data-column-checkbox-checked", checkboxElementsStateChange.toString()));
                checkboxHolder.setAttribute("data-column-checkbox-checked", checkboxElementsStateChange.toString());
            });
            const checkboxLabel = document.createElement("label");
            checkboxLabel.textContent = config.columns[i].displayName;
            checkboxHolder.appendChild(checkbox);
            checkboxHolder.appendChild(checkboxLabel);
            this.columnCheckboxes.appendChild(checkboxHolder);
        }
    }
    initilizeListeners() {
        this.columnHiderButton.addEventListener("click", () => {
            this.createAndSetCheckboxes(config.getHtmlClassNamesOfColumns());
            this.getElementReferences();
            this.table.classList.toggle("blured");
            this.columnHiderButtonArea.setAttribute("data-column-hider-button-area-visible", "false");
            this.columnCheckboxesArea.setAttribute("data-column-checkboxes-area-visible", "true");
            const columnVisibilityInformation = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "[]");
            this.allColumnCheckboxes = this.shadowRoot.querySelectorAll(".column-checkbox");
            if (localStorage.getItem("columnVisibilityInformation") !== null) {
                for (let i = 0; i < this.allColumnCheckboxes.length; i++) {
                    this.allColumnCheckboxes[i].setAttribute("data-column-checkbox-checked", columnVisibilityInformation[i]);
                    if (this.allColumnCheckboxes[i].getAttribute("data-column-checkbox-checked") === "false") {
                        this.allColumnCheckboxes[i].firstElementChild?.removeAttribute("checked");
                    }
                }
            }
        });
        this.columnHiderCloseButton.addEventListener("click", () => {
            this.table.classList.toggle("blured");
            sortModel.sortDataButton.classList.toggle("blured");
            config.saveColumnVisibilityStatus(this.allColumnCheckboxes);
            this.columnHiderButtonArea.setAttribute("data-column-hider-button-area-visible", "true");
            this.columnCheckboxesArea.setAttribute("data-column-checkboxes-area-visible", "false");
            this.columnCheckboxes.innerHTML = "";
        });
        this.resetButton.addEventListener("click", () => {
            if (this.allColumnCheckboxes === undefined) {
                return void 0;
            }
            this.columnCheckboxes.innerHTML = "";
            this.createAndSetCheckboxes(config.getHtmlClassNamesOfColumns());
            const wholeColumnData = document.querySelectorAll("[data-column-checkbox-checked]");
            wholeColumnData.forEach((data) => data.setAttribute("data-column-checkbox-checked", "true"));
            this.allColumnCheckboxes.forEach((data) => data.setAttribute("data-column-checkbox-checked", "true"));
            config.clearColumnVisibilityInformation();
        });
    }
    getElementReferences() {
        this.columnCheckboxes = this.shadowRoot.querySelector(".column-checkboxes");
        this.table = document.querySelector("#data-table");
    }
}
customElements.define(ColumnHider.TAG, ColumnHider);
//# sourceMappingURL=columnHider.js.map