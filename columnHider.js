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
          padding: 0 0 1rem 1rem;
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
      }
      .column-hider-close-button {
        align-self: flex-end;
        border: black 1px solid;
        background-color: rgb(235, 144, 101);
        cursor: pointer;
      }
      .column-hider-close-button:hover {
        background-color: white;
      }
      .column-checkboxes {
          display: flex;
          flex-wrap: wrap;
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
        
  </style>
<div class="column-hider-button-area" data-column-hider-button-area-visible="true">
  <input class="column-hider-button" type="button" value="HIDE COLUMN">
</div>
<div class="column-checkboxes-area" data-column-checkboxes-area-visible="false">
    <div>
        <input class="column-hider-close-button" type="button" value="x">
    </div>
    <div class="column-checkboxes">
        <div class="column-checkbox">
            <input type="checkbox" name="id" class="id-checkbox" checked>
            <label for="id">id</label>
        </div>
        <div class="column-checkbox" data-column-checkbox-checked="true">
            <input type="checkbox" name="gender" class="gender-checkbox" checked>
            <label for="gender">gender</label>
        </div>
        <div class="column-checkbox" data-column-checkbox-checked="true">
            <input type="checkbox" name="first name" class="first-name-checkbox" checked>
            <label for="first name">first name</label>
        </div>
        <div class="column-checkbox" data-column-checkbox-checked="true">
            <input type="checkbox" name="last name" class="last-name-checkbox" checked>
            <label for="last name">last name</label>
        </div>
        <div class="column-checkbox" data-column-checkbox-checked="true">
            <input type="checkbox" name="birth date" class="birth-date-checkbox" checked>
            <label for="birth date">birth date</label>
        </div>
        <div class="column-checkbox" data-column-checkbox-checked="true">
            <input type="checkbox" name="age" class="age-checkbox" checked>
            <label for="age">age</label>
        </div>
        <div class="column-checkbox" data-column-checkbox-checked="true">
            <input type="checkbox" name="e-mail" class="email-checkbox" checked>
            <label for="e-mail">e-mail</label>
        </div>
        <div class="column-checkbox" data-column-checkbox-checked="true">
            <input type="checkbox" name="address" class="address-checkbox" checked>
            <label for="address">address</label>
        </div>
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
        this.getElementReferences();
        this.initilizeListeners();
    }

    initilizeListeners() {
        this.columnHiderButtonArea.addEventListener("click", () => {
            this.columnHiderButtonArea.setAttribute("data-column-hider-button-area-visible", "false");
            this.columnCheckboxesArea.setAttribute("data-column-checkboxes-area-visible", "true");
        })
        this.columnHiderCloseButton.addEventListener("click", () => {
            this.columnHiderButtonArea.setAttribute("data-column-hider-button-area-visible", "true");
            this.columnCheckboxesArea.setAttribute("data-column-checkboxes-area-visible", "false");
        })
        this.idCheckbox.addEventListener("click", () => {
            let idDatas = document.querySelectorAll(".id-data");
            const idCheckboxElementsStateChange = idDatas[0].getAttribute("data-column-checkbox-checked") === "true" ? false : true;
            idDatas.forEach(data => data.setAttribute("data-column-checkbox-checked", idCheckboxElementsStateChange.toString()));
        })
        this.genderCheckbox.addEventListener("click", () => {
            let genderDatas = document.querySelectorAll(".gender-data");
            const genderCheckboxElementsStateChange = genderDatas[0].getAttribute("data-column-checkbox-checked") === "true" ? false : true;
            genderDatas.forEach(data => data.setAttribute("data-column-checkbox-checked", genderCheckboxElementsStateChange.toString()));
        })
        this.firstNameCheckbox.addEventListener("click", () => {
            let firstNameDatas = document.querySelectorAll(".first-name-data");
            const firstNameCheckboxElementsStateChange = firstNameDatas[0].getAttribute("data-column-checkbox-checked") === "true" ? false : true;
            firstNameDatas.forEach(data => data.setAttribute("data-column-checkbox-checked", firstNameCheckboxElementsStateChange.toString()));
        })
        this.lastNameCheckbox.addEventListener("click", () => {
            let lastNameDatas = document.querySelectorAll(".last-name-data");
            const lastNameCheckboxElementsStateChange = lastNameDatas[0].getAttribute("data-column-checkbox-checked") === "true" ? false : true;
            lastNameDatas.forEach(data => data.setAttribute("data-column-checkbox-checked", lastNameCheckboxElementsStateChange.toString()));
        })
        this.birthDateCheckbox.addEventListener("click", () => {
            let birthDateDatas = document.querySelectorAll(".birth-date-data");
            const birthDateCheckboxElementsStateChange = birthDateDatas[0].getAttribute("data-column-checkbox-checked") === "true" ? false : true;
            birthDateDatas.forEach(data => data.setAttribute("data-column-checkbox-checked", birthDateCheckboxElementsStateChange.toString()));
        })
        this.ageCheckbox.addEventListener("click", () => {
            let ageDatas = document.querySelectorAll(".age-data");
            const ageCheckboxElementsStateChange = ageDatas[0].getAttribute("data-column-checkbox-checked") === "true" ? false : true;
            ageDatas.forEach(data => data.setAttribute("data-column-checkbox-checked", ageCheckboxElementsStateChange.toString()));
        })
        this.emailCheckbox.addEventListener("click", () => {
            let emailDatas = document.querySelectorAll(".email-data");
            const emailCheckboxElementsStateChange = emailDatas[0].getAttribute("data-column-checkbox-checked") === "true" ? false : true;
            emailDatas.forEach(data => data.setAttribute("data-column-checkbox-checked", emailCheckboxElementsStateChange.toString()));
        })
        this.addressCheckbox.addEventListener("click", () => {
            let addressDatas = document.querySelectorAll(".address-summary-data");
            let addressDataHeader = document.querySelector(".address-data");
            const addressCheckboxElementsStateChange = addressDatas[0].getAttribute("data-column-checkbox-checked") === "true" ? false : true;
            addressDataHeader.setAttribute("data-column-checkbox-checked", addressCheckboxElementsStateChange.toString());
            addressDatas.forEach(data => data.setAttribute("data-column-checkbox-checked", addressCheckboxElementsStateChange.toString()));
        })
    }

    getElementReferences() {
        this.idCheckbox = this.shadowRoot.querySelector(".id-checkbox");
        this.genderCheckbox = this.shadowRoot.querySelector(".gender-checkbox");
        this.firstNameCheckbox = this.shadowRoot.querySelector(".first-name-checkbox");
        this.lastNameCheckbox = this.shadowRoot.querySelector(".last-name-checkbox");
        this.birthDateCheckbox = this.shadowRoot.querySelector(".birth-date-checkbox");
        this.ageCheckbox = this.shadowRoot.querySelector(".age-checkbox");
        this.emailCheckbox = this.shadowRoot.querySelector(".email-checkbox");
        this.addressCheckbox = this.shadowRoot.querySelector(".address-checkbox");
        this.columnHiderButtonArea = this.shadowRoot.querySelector(".column-hider-button-area");
        this.columnCheckboxesArea = this.shadowRoot.querySelector(".column-checkboxes-area");
        this.columnHiderCloseButton = this.shadowRoot.querySelector(".column-hider-close-button");
    }
}
customElements.define(ColumnHider.TAG, ColumnHider);

