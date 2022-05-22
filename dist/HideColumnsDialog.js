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
        background-color: rgb(255 226 213);
        position: absolute;
        top: 45%;
        left: 35%;
        z-index: 1;
        box-shadow: 0 10px 10px 5px rgba(0, 0, 0, 0.4);
      }
      .modal-header {
        height: 20px;
        width: 100%;
        background-color: rgb(235, 144, 101);
      }
      .column-hider-close-button {
        height: 20px;
        width: 20px;
        align-self: flex-end;
        border: none;
        background-color: rgb(235, 144, 101);
        cursor: pointer;
        margin-top: -20px;
        transition: background-color 250ms ease-in-out;
      }
      .column-hider-close-button:hover {
        background-color: rgb(253 206 184);
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
        background-color: rgb(197 159 142);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.9rem;
        text-align: center;
        box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.4);
        transition: background-color 250ms ease-in-out;
    }
    .reset-button:hover {
        background-color: rgb(253 206 184);
    }
    th[data-column-checkbox-checked="false"] {
      display: none;
    }
    td[data-column-checkbox-checked="false"] {
      display: none;
    }
    .blured {
      filter: blur(2px);
    }
  </style>
<div class="column-hider-button-area" data-column-hider-button-area-visible="true">
  <input class="column-hider-button" type="button" value="HIDE COLUMN">
</div>
<div class="column-checkboxes-area" data-column-checkboxes-area-visible="false">
    <div class="modal-header"></div>
    <input class="column-hider-close-button" type="button" value="x">
    <div class="column-checkboxes"></div>
    <div class="reset-apply-buttons">
        <input class="reset-button" type="button" value="reset">
    </div>
</div>

    `
};
export class HideColumnsDialog extends HTMLElement {
    static TAG = "hide-columns-dialog";
    shadowRoot;
    columnHiderButtonArea;
    columnHiderButton;
    columnCheckboxesArea;
    columnHiderCloseButton;
    columnCheckboxes;
    resetButton;
    checkboxHolders;
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
        this.getElementReferences();
    }
    createAndSetCheckboxes = (columnNames, reset) => {
        this.columnCheckboxes.innerHTML = "";
        for (let i = 0; i < columnNames.length; i++) {
            const checkboxHolder = document.createElement("div");
            checkboxHolder.classList.add("column-checkbox");
            if (reset === "reset") {
                const toResetCheckboxHolderAttribute = new CustomEvent("to-reset-checkboxholder-attribute", {
                    bubbles: true,
                    composed: true,
                    detail: {
                        i: i,
                        checkboxHolder: checkboxHolder,
                    }
                });
                this.shadowRoot.dispatchEvent(toResetCheckboxHolderAttribute);
            }
            else {
                const toSetCheckboxHolderAttribute = new CustomEvent("to-set-checkboxholder-attribute", {
                    bubbles: true,
                    composed: true,
                    detail: {
                        i: i,
                        checkboxHolder: checkboxHolder,
                    }
                });
                this.shadowRoot.dispatchEvent(toSetCheckboxHolderAttribute);
            }
            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.classList.add("checkbox");
            checkbox.addEventListener("click", () => {
                const toClickCheckbox = new CustomEvent("to-click-checkbox", {
                    bubbles: true,
                    composed: true,
                    detail: {
                        i: i,
                        checkboxHolder: checkboxHolder,
                        checkboxHolders: this.checkboxHolders,
                        checkbox: checkbox
                    }
                });
                this.shadowRoot.dispatchEvent(toClickCheckbox);
            });
            if (checkboxHolder.getAttribute("data-column-checkbox-checked") === "false") {
                checkbox.removeAttribute("checked");
            }
            else {
                checkbox.setAttribute("checked", "checked");
            }
            const checkboxLabel = document.createElement("label");
            const toSetCheckboxTextcontent = new CustomEvent("to-set-checkbox-textcontent", {
                bubbles: true,
                composed: true,
                detail: {
                    checkboxLabel: checkboxLabel,
                    i: i
                }
            });
            this.shadowRoot.dispatchEvent(toSetCheckboxTextcontent);
            checkboxHolder.appendChild(checkbox);
            checkboxHolder.appendChild(checkboxLabel);
            this.columnCheckboxes.appendChild(checkboxHolder);
        }
        this.checkboxHolders = this.shadowRoot.querySelectorAll(".column-checkbox");
    };
    initilizeListeners() {
        this.columnHiderButton.addEventListener("click", () => {
            const toClickColumnHiderButton = new CustomEvent("to-click-column-hider-button", {
                bubbles: true,
                composed: true,
                detail: {
                    createAndSetCheckboxes: this.createAndSetCheckboxes
                }
            });
            this.shadowRoot.dispatchEvent(toClickColumnHiderButton);
            this.columnHiderButtonArea.setAttribute("data-column-hider-button-area-visible", "false");
            this.columnCheckboxesArea.setAttribute("data-column-checkboxes-area-visible", "true");
        });
        this.columnHiderCloseButton.addEventListener("click", () => {
            const toCloseColumnHiderButton = new CustomEvent("to-close-column-hider-button", {
                bubbles: true,
                composed: true,
                detail: {
                    checkboxHolders: this.checkboxHolders
                }
            });
            this.shadowRoot.dispatchEvent(toCloseColumnHiderButton);
            this.columnHiderButtonArea.setAttribute("data-column-hider-button-area-visible", "true");
            this.columnCheckboxesArea.setAttribute("data-column-checkboxes-area-visible", "false");
            this.columnCheckboxes.innerHTML = "";
        });
        this.resetButton.addEventListener("click", () => {
            if (this.checkboxHolders === undefined) {
                return void 0;
            }
            const toResetColumnHider = new CustomEvent("to-reset-column-hider", {
                bubbles: true,
                composed: true,
                detail: {
                    createAndSetCheckboxes: this.createAndSetCheckboxes
                }
            });
            this.shadowRoot.dispatchEvent(toResetColumnHider);
        });
    }
    getElementReferences() {
        this.columnCheckboxes = this.shadowRoot.querySelector(".column-checkboxes");
    }
}
customElements.define(HideColumnsDialog.TAG, HideColumnsDialog);
//# sourceMappingURL=HideColumnsDialog.js.map