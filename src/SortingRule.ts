import { SortDirection } from "./types/enums.js";

const { template } = {
  template: `
    <style>  
      .option-default {
        display: none;
      }
      .sort-field, .sort-direction {
        width: 20vw;
        border: black 1px solid;
        text-align-last: center;
        margin: 5px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.9rem;
        text-align: center;
        background-color: rgb(248 248 214);
        margin-top: 12px;
      }
      .sort-line {
        display:flex;
      }
  </style>
    <div class="sort-line">
      <select class="sort-field" name="fields">
      </select>
      <select class="sort-direction" name="direction">
        <option class="option-default" value="sort direction" selected>Sort direction</option>
        <option class="option" value="ascending">Ascending</option>
        <option class="option" value="descending">Descending</option>
      </select>   
    </div>       
    `
};

export class SortingRule extends HTMLElement {
  static TAG = "sorting-rule";
  readonly shadowRoot: ShadowRoot;
  sortField!: HTMLSelectElement;
  sortDirection!: HTMLSelectElement;
  sortLine!: HTMLDivElement;
  constructor(sortFields: string[]) {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.getElementReferences();
    this.initilizeListeners();
    this.setSortByOptions(sortFields);
    this.setButtons();
  }
  set fieldOption(value: string) {
    this.sortField.value = value;
  }
  get fieldOption(): string {
    return this.sortField.value;
  }
  set directionOption(value: string) {//how to convert a string to enum
    this.sortDirection.value = value;
  }
  get directionOption(): SortDirection {
    return this.sortDirection.value;
  }
  setButtons(): void {
    this.sortDirection.disabled = true;
  }
  initilizeListeners() {
    this.sortField.addEventListener("change", (): void => {
      if (this.fieldOption !== "Sort By") {
        this.sortDirection.disabled = false;
      }
    });
    this.sortDirection.addEventListener("change", () => {
      const isDirectionSet: CustomEvent = new CustomEvent("is-direction-set", {
        bubbles: true,
        composed: true
      });
      this.shadowRoot.dispatchEvent(isDirectionSet);
    });
  }
  disableSelects(): void {
    this.sortField.disabled = true;
    this.sortDirection.disabled = true;
  }
  setSortByOptions(sortFields: string[]): void {
    if (sortFields === undefined) {
      return void 0;
    }

    sortFields.forEach((item) => {
      const fieldOptionElement = document.createElement("option");
      fieldOptionElement.textContent = item;
      fieldOptionElement.value = item;
      if (item === sortFields[0]) {
        fieldOptionElement.className = "option-default";
      }
      this.sortField.append(fieldOptionElement);
    });
  }

  getElementReferences() {
    this.sortField = this.shadowRoot.querySelector(".sort-field") as HTMLSelectElement;
    this.sortDirection = this.shadowRoot.querySelector(".sort-direction") as HTMLSelectElement;
    this.sortLine = this.shadowRoot.querySelector(".sort-line") as HTMLDivElement;
  }
}
customElements.define(SortingRule.TAG, SortingRule);
