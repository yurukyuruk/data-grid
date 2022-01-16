import { config } from "./configExport.js";
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
        outline: 2px solid white;
        outline-offset: 1rem;   
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.9rem;
        text-align: center;
        width: 12rem;
      }
      .column-hider-button:hover {
        transform: scale(1.1);
      }
      .column-checkboxes-area {
        
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        background-color: rgb(252, 252, 184);
        position: absolute;
        top: 45%;
        left: 30%;
        z-index: 1;
        max-width: 35vw;
        flex-wrap: wrap;
        border: 2px solid rgb(235, 144, 101);
      }
      .column-hider-close-button {
        align-self: flex-end;
        border: black 1px solid;
        background-color: rgb(235, 144, 101);
        cursor: pointer;
        margin: 1px 1px 0 0;
      }
      .column-hider-close-button:hover {
        background-color: white;
      }
      .column-checkboxes {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
      }
      .column-checkbox {
        max-width: 200px;
        min-width: 100px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.88rem;
      }
      input[type='checkbox']{
        width: 10px !important;
        height: 10px !important;
        margin: 5px;
        -webkit-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        appearance: none;
        outline: 2px solid rgb(255, 255, 255);
        font-size: 0.8em;
        text-align: center;
        line-height: 1em;
        background: rgb(252, 252, 184);
      }
      
      input[type='checkbox']:checked:after {
        content: '✔';
        color: rgb(235, 144, 101);
      }
      .id-checkbox:hover, .gender-checkbox:hover, .first-name-checkbox:hover, .last-name-checkbox:hover,
      .birth-date-checkbox:hover, .age-checkbox:hover, .email-checkbox:hover, .address-checkbox:hover {
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
        background-color: white;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.9rem;
        text-align: center;
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
  public readonly shadowRoot: ShadowRoot;
  private readonly columnHiderButtonArea: HTMLDivElement;
  private readonly columnHiderButton: HTMLInputElement;
  private readonly columnCheckboxesArea: HTMLDivElement;
  private readonly columnHiderCloseButton: HTMLInputElement;
  private columnCheckboxes: HTMLDivElement;
  private readonly resetButton: HTMLInputElement;
  private allColumnCheckboxes!: NodeListOf<HTMLDivElement>;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.columnHiderButtonArea = this.shadowRoot.querySelector(".column-hider-button-area") as HTMLDivElement;
    this.columnHiderButton = this.shadowRoot.querySelector(".column-hider-button") as HTMLInputElement;
    this.columnCheckboxesArea = this.shadowRoot.querySelector(".column-checkboxes-area") as HTMLDivElement;
    this.columnHiderCloseButton = this.shadowRoot.querySelector(".column-hider-close-button") as HTMLInputElement;
    this.columnCheckboxes = this.shadowRoot.querySelector(".column-checkboxes") as HTMLDivElement;
    this.resetButton = this.shadowRoot.querySelector(".reset-button") as HTMLInputElement;
    this.initilizeListeners();
  }
  createAndSetCheckboxes(columnNames: string[]): void {
    for (let i = 0; i < columnNames.length; i++) {
      const checkboxHolder: HTMLDivElement = document.createElement("div");
      checkboxHolder.classList.add("column-checkbox");
      checkboxHolder.setAttribute("data-column-checkbox-checked", "true");
      const checkbox: HTMLInputElement = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.classList.add(columnNames[i] + "-checkbox");
      checkbox.setAttribute("checked", "checked");
      checkbox.addEventListener("click", (): void => {
        const wholeColumnData: NodeListOf<Element> = document.querySelectorAll("." + columnNames[i]);
        const checkboxElementsStateChange: boolean =
          wholeColumnData[0].getAttribute("data-column-checkbox-checked") === "true" ? false : true;
        wholeColumnData.forEach((data) => data.setAttribute("data-column-checkbox-checked", checkboxElementsStateChange.toString()));
        checkboxHolder.setAttribute("data-column-checkbox-checked", checkboxElementsStateChange.toString());
      });

      const checkboxLabel: HTMLLabelElement = document.createElement("label");
      checkboxLabel.textContent = config.columns[i].displayName;
      checkboxHolder.appendChild(checkbox);
      checkboxHolder.appendChild(checkboxLabel);
      this.columnCheckboxes.appendChild(checkboxHolder);
    }
  }

  initilizeListeners() {
    this.columnHiderButton.addEventListener("click", (): void => {
      this.createAndSetCheckboxes(config.getHtmlClassNamesOfColumns());
      this.getElementReferences();
      this.columnHiderButtonArea.setAttribute("data-column-hider-button-area-visible", "false");
      this.columnCheckboxesArea.setAttribute("data-column-checkboxes-area-visible", "true");
      const columnVisibilityInformation: string[] = JSON.parse(localStorage.getItem("columnVisibilityInformation") ?? "[]") as string[];
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
    this.columnHiderCloseButton.addEventListener("click", (): void => {
      config.saveColumnVisibilityStatus(this.allColumnCheckboxes);
      this.columnHiderButtonArea.setAttribute("data-column-hider-button-area-visible", "true");
      this.columnCheckboxesArea.setAttribute("data-column-checkboxes-area-visible", "false");
      this.columnCheckboxes.innerHTML = "";
    });

    this.resetButton.addEventListener("click", (): void => {
      if (this.allColumnCheckboxes === undefined) {
        return void 0;
      }
      this.columnCheckboxes.innerHTML = "";
      this.createAndSetCheckboxes(config.getHtmlClassNamesOfColumns());
      const wholeColumnData: NodeListOf<Element> = document.querySelectorAll("[data-column-checkbox-checked]");
      wholeColumnData.forEach((data) => data.setAttribute("data-column-checkbox-checked", "true"));
      this.allColumnCheckboxes.forEach((data) => data.setAttribute("data-column-checkbox-checked", "true"));
      config.clearColumnVisibilityInformation();
    });
  }

  getElementReferences() {
    this.columnCheckboxes = this.shadowRoot.querySelector(".column-checkboxes") as HTMLDivElement;
  }
}
customElements.define(ColumnHider.TAG, ColumnHider);
