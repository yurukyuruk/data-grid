import { config } from "./config.js";
const { template } = {
    template: `
    <style>  
    .column-hider-button-area {
        background-color: rgb(252, 252, 184);
        display: flex;
        justify-content: center;
        padding: 2.1rem;
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
        width: 8rem;
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
    .reset-button, .apply-button {
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
    .reset-button:hover, .apply-button:hover {
        background-color: rgb(235, 144, 101);
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
        <input class="apply-button" type="button" value="apply">
    </div>
</div>

    `
};

export class ColumnHider extends HTMLElement {
    static TAG = "column-hider";
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = template;
        this.columnHiderButtonArea = this.shadowRoot.querySelector(".column-hider-button-area");
        this.columnHiderButton = this.shadowRoot.querySelector(".column-hider-button");
        this.columnCheckboxesArea = this.shadowRoot.querySelector(".column-checkboxes-area");
        this.columnHiderCloseButton = this.shadowRoot.querySelector(".column-hider-close-button");
        this.columnCheckboxes = this.shadowRoot.querySelector(".column-checkboxes");
        this.resetButton = this.shadowRoot.querySelector(".reset-button");
        this.applyButton = this.shadowRoot.querySelector(".apply-button");
        this.allColumnsInformation = [];
        this.initilizeListeners();
    }
    createAndSetCheckboxes(columnNames) {
        const addressColumnHeaderNames = ["country", "state", "city", "street", "house-number"];
        const addressColumnNames = ["address-summary", "country", "state", "city", "street", "house-number"];
        function createDataColumnTagNames(x) {
            return "." + columnNames[x] + "-data";
        } 
        function createAddressColumnHeaderTagNames(x) {
            return "." + addressColumnHeaderNames[x] + "-header";
        }
        function createAddressColumnTagNames(x) {
            return "." + addressColumnNames[x] + "-data";
        }
        for (let i = 0; i < columnNames.length; i++) {
            const checkboxHolder = document.createElement("div");
            checkboxHolder.classList.add("column-checkbox");
            checkboxHolder.setAttribute("data-column-checkbox-checked", "true");
            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.classList.add((columnNames[i] + "-checkbox")); 
            checkbox.setAttribute("checked", "checked");
            checkbox.addEventListener("click", () => {
                let wholeColumnData = document.querySelectorAll(createDataColumnTagNames(i));
                const checkboxElementsStateChange = wholeColumnData[0].getAttribute("data-column-checkbox-checked") === "true" ? false : true;
                wholeColumnData.forEach(data => data.setAttribute("data-column-checkbox-checked", checkboxElementsStateChange.toString()));
                checkboxHolder.setAttribute("data-column-checkbox-checked", checkboxElementsStateChange.toString());
                if(checkbox.classList.value === "address-checkbox") {
                    for(let i = 0; i < addressColumnHeaderNames.length; i++) {
                        let addressHeader = document.querySelector(createAddressColumnHeaderTagNames(i));
                        const addressCheckboxElementsStateChange = addressHeader.getAttribute("data-column-checkbox-checked") === "false" ? true : false;
                        addressHeader.setAttribute("data-column-checkbox-checked", addressCheckboxElementsStateChange.toString());
                    }
                    for(let i = 0; i < addressColumnNames.length; i++) {
                        let wholeAddressColumnData = document.querySelectorAll(createAddressColumnTagNames(i));
                        const addressCheckboxElementsStateChange = wholeAddressColumnData[0].getAttribute("data-column-checkbox-checked") === "false" ? true : false;
                        wholeAddressColumnData.forEach(data => data.setAttribute("data-column-checkbox-checked", addressCheckboxElementsStateChange.toString()));
                    }
                }
            });
 
            const checkboxLabel = document.createElement("label");
            checkboxLabel.textContent = columnNames[i];
            checkboxHolder.appendChild(checkbox);
            checkboxHolder.appendChild(checkboxLabel);
            this.columnCheckboxes.appendChild(checkboxHolder);
        }
    }

    initilizeListeners() {
        this.columnHiderButton.addEventListener("click", () => {
            this.createAndSetCheckboxes(["id", "gender", "first-name", "last-name", "birth-date", "age", "email", "address"]);
            this.getElementReferences();
            this.columnHiderButtonArea.setAttribute("data-column-hider-button-area-visible", "false");
            this.columnCheckboxesArea.setAttribute("data-column-checkboxes-area-visible", "true");
        })
        this.columnHiderCloseButton.addEventListener("click", () => {
            this.columnHiderButtonArea.setAttribute("data-column-hider-button-area-visible", "true");
            this.columnCheckboxesArea.setAttribute("data-column-checkboxes-area-visible", "false");
            this.columnCheckboxes.innerHTML = "";
        })
        this.applyButton.addEventListener("click", () => {
            this.collectColumnInformation();
            config.columns = this.allColumnsInformation;
            console.log(config);
        })
    }

    collectColumnInformation() {
        const columnNames = ["id", "gender", "firstName", "lastName", "birthDate", "age", "email", "address"];
        const columnDisplayNames = ["id", "gender", "first name", "last name", "birth date", "age", "e-mail", "address"];
        const columnTypes = ["string", "string", "string", "string", "date", "number", "string", "string"];
        let columnsVisibilityStatus = [];
        for(let i = 1; i < this.columnCheckboxes.childNodes.length; i++) {
            columnsVisibilityStatus.push(this.columnCheckboxes.childNodes[i].getAttribute("data-column-checkbox-checked"));
        }
        for(let i = 0; i < columnNames.length; i++) {
            const singleColumnInformation = {name: columnNames[i], displayName: columnDisplayNames[i], type: columnTypes[i], visible: columnsVisibilityStatus[i]};
            this.allColumnsInformation.push(singleColumnInformation);
        }
        
    }

    getElementReferences() {
        this.columnCheckboxes = this.shadowRoot.querySelector(".column-checkboxes");
        this.idCheckbox = this.shadowRoot.querySelector(".id-checkbox");
        this.genderCheckbox = this.shadowRoot.querySelector(".gender-checkbox");
        this.firstNameCheckbox = this.shadowRoot.querySelector(".first-name-checkbox");
        this.lastNameCheckbox = this.shadowRoot.querySelector(".last-name-checkbox");
        this.birthDateCheckbox = this.shadowRoot.querySelector(".birth-date-checkbox");
        this.ageCheckbox = this.shadowRoot.querySelector(".age-checkbox");
        this.emailCheckbox = this.shadowRoot.querySelector(".email-checkbox");
        this.addressCheckbox = this.shadowRoot.querySelector(".address-checkbox");
        
    }
}
customElements.define(ColumnHider.TAG, ColumnHider);

