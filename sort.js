const {template} = {
  template: `
  <style>  .sorting {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(252, 252, 184);
    position: absolute;
    top: 45%;
    left: 30%;
    z-index: 1;
    max-height: 50vh;
  }
  .sort-line {
    display: flex;
  }
  .sort-data-button-area {
    padding: 2.1rem;
    background-color: rgb(252, 252, 184);
    display: flex;
    justify-content: center;
  }
  .sort-data-button {
    border: 1px solid black;
    background-color: rgb(235, 144, 101);
    cursor: pointer;
    outline: 2px solid white;
    outline-offset: 1rem;
  }
  .sort-data-button:hover {
    transform: scale(1.1);
  }
  .sort-adding-button {
    align-self: center;
    padding: 0 2px;
    margin: 5px;
    cursor: pointer;
    background-color: white;
    border: 1px solid black;
  }
  .close-button {
    align-self: flex-end;
    border: black 1px solid;
    background-color: rgb(235, 144, 101);
    cursor: pointer;
  }
  .sort-fields {
    width: 20vw;
    border: black 1px solid;
    text-align-last: center;
    margin: 5px;
  }
  .sort-directions {
    width: 20vw;
    border: black 1px solid;
    text-align-last: center;
    margin: 5px;
  }
  .option-default {
    display: none;
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
}
.submit-button {
  border: black 1px solid;
  width: 8vw;
  margin: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  padding-top: 0;
  padding-bottom: 0;
  background-color: white;
}
.reset-button:hover, .submit-button:hover, .sort-adding-button:hover {
  background-color: rgb(235, 144, 101);
}
.close-button:hover {
  background-color: white;
}
.sort-data-button, .sort-adding-button, .close-button, .sort-fields, .sort-directions, .reset-button, .submit-button, .sort-options-clone, .addition-symbol {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  text-align: center;
}
input[data-sort-button-visible="false"] {
  display: none;
}
section[data-sort-fields-visible="false"] {
  display: none;
}
div[data-sort-button-area-visible="false"] {
  display: none;
}
.chosen-option {
  display: none;
}
.sort-options-1, .sort-options-cloned {
  display:flex;
}
.sort-line {
  display: flex;
  flex-direction: column;
}
</style>
<div class="sort-data-button-area" data-sort-button-area-visible="true">
        <input class="sort-data-button" data-sort-button-visible="true" type="button" value="SORT DATA">
        </div>
        <section class="sorting" data-sort-fields-visible="false">
            <input class="close-button" type="button" value="x">
            <div class="sort-line"> 
                <div class="sort-options-1">
                    <select class="sort-fields" name="fields">
                        <option class="option-default" value="sort by" selected>sort by</option>
                        <option class="id" value="id">id</option>
                        <option class="gender" value="gender">gender</option>
                        <option class="first-name" value="first name">first name</option>
                        <option class="last-name" value="last name">last name</option>
                        <option class="birth-date" value="birth date">birth date</option>
                        <option class="age" value="age">age</option>
                        <option class="e-mail" value="e-mail">e-mail</option>
                        <option class="address" value="address">address</option>
                    </select>
                    <select class="sort-directions" name="direction">
                        <option class="option-default" value="sort direction" selected>sort direction</option>
                        <option value="ascending">ascending</option>
                        <option value="descending">descending</option>
                    </select>
                </div>
            </div>
            <input class="sort-adding-button" type="button" value="+">
            <div class="submit-buttons">
                <input class="reset-button" type="reset" value="clear">
                <input class="submit-button" type="submit" value="apply">
            </div>
        </section>
  `
};

export class MySortingSection extends HTMLElement {
  static TAG = "my-sorting-section";
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.getElementReferences();
    this.setButtons();
    this.initializeListeners();
  }
  setButtons() {
    this.submitButton.disabled = true;
    this.sortAddingButton.disabled = true;
    this.defaultSortDirection.disabled = true;
  }
  initializeListeners() {
    this.sortDataButton.addEventListener("click", () => {
      this.sortDataButtonArea.setAttribute("data-sort-button-area-visible", "false");
      this.sortDataButton.setAttribute("data-sort-button-visible", "false");
      this.sortingArea.setAttribute("data-sort-fields-visible", "true");
      this.table.classList.toggle("blured");
    });

    this.resetButton.addEventListener("click", () => {
      this.allSortOptionsCloned = this.shadowRoot.querySelectorAll(".sort-options-cloned");
      this.allSortOptionsCloned.forEach(element => element.remove());
      this.sortFields = this.shadowRoot.querySelector(".sort-fields");
      this.sortFields.selectedIndex = 0;
      this.sortDirections = this.shadowRoot.querySelector(".sort-directions");
      this.sortDirections.selectedIndex = 0;
      this.sortAddingButton.disabled = true;
      this.submitButton.disabled = true;
      this.defaultSortDirection.disabled = true;
    })
    
    this.closeButton.addEventListener("click", () => {
      this.sortDataButtonArea.setAttribute("data-sort-button-area-visible", "true");
      this.sortDataButton.setAttribute("data-sort-button-visible", "true");
      this.sortingArea.setAttribute("data-sort-fields-visible", "false");
      this.table.classList.toggle("blured");
    })

    this.defaultSortField.addEventListener("change", () => {
      if(this.defaultSortField !== "sort by") {
        this.defaultSortDirection.disabled = false;
      }
    })
    this.defaultSortDirection.addEventListener("change", () => {
      if(this.defaultSortDirection !== "sort direction") {
        this.sortAddingButton.disabled = false;
        this.submitButton.disabled = false;
      }
    })

    this.sortAddingButton.addEventListener("click", () => {
      this.clickCount += 1;
      this.submitButton.disabled = true;
      this.sortAddingButton.disabled = true;
      let sortOptionsCloned = this.sortOptions1.cloneNode(true);
      sortOptionsCloned.classList = "sort-options-cloned";
      this.sortLine.insertBefore(sortOptionsCloned, this.sortOptions1.nextSibling);
      let sortOptionsList = [this.sortOptions1];
      sortOptionsList.push(sortOptionsCloned);
      
      let currentSelectInput = sortOptionsList[this.clickCount];
      let currentSelectedSortField = currentSelectInput.firstElementChild;
      let currentSelectedSortDirection = currentSelectInput.lastElementChild;
      currentSelectedSortField.addEventListener("change", () => {
        let selectedSortFieldOption = currentSelectedSortField.value;
        if(selectedSortFieldOption !== "sort by") {
          currentSelectedSortDirection.disabled = false;
        }
        currentSelectedSortDirection.push(this.selectedSortFieldOption);
      })
    
      currentSelectedSortDirection.addEventListener("change", () => {
        let selectedSortDirectionOption = currentSelectedSortDirection.value;
        if(selectedSortDirectionOption !== "sort direction ") {
          this.sortAddingButton.disabled = false;
        }
      })
    
      currentSelectInput.addEventListener("change", () => {
        let selectedSortFieldOption = currentSelectedSortField.value;
        let selectedSortDirectionOption = currentSelectedSortDirection.value;
        if(selectedSortFieldOption !== "sort by" && selectedSortDirectionOption !== "sort direction") {
          this.submitButton.disabled = false;
        } else{this.submitButton.disabled = true;
          this.sortAddingButton.disabled = true;
        };  
      })
      
    
      this.defaultSortDirection.disabled = true;
      this.selectInputs = this.shadowRoot.querySelectorAll(".sort-line")[this.clickCount];
      if(this.clickCount > this.columnCount - 1) {
        this.sortAddingButton.disabled = true;
      }


   
        /*if(selectedSortFieldOption === "id") {
            allIdOptions.classList.add("chosen-option");
        } else if(selectedSortFieldOption === "gender") {    
            allGenderOptions.classList.add("chosen-option");
        } else if(selectedSortFieldOption === "first name") {    
            allFirstNameOptions.classList.add("chosen-option");
        } else if(selectedSortFieldOption === "last name") {    
            allLastNameOptions.classList.add("chosen-option");
        } else if(selectedSortFieldOption === "birth date") {   
            allBirthDateOptions.classList.add("chosen-option");
        } else if(selectedSortFieldOption === "age") {   
            allAgeOptions.classList.add("chosen-option");
        } else if(selectedSortFieldOption === "e-mail") {
            allEmailOptions.classList.add("chosen-option");
        } else if(selectedSortFieldOption === "address") { 
            allAddressOptions.classList.add("chosen-option");
        }*/ 
    
  })


  }
  getElementReferences() {
    this.sortingArea = this.shadowRoot.querySelector(".sorting");
    this.sortDataButtonArea = this.shadowRoot.querySelector(".sort-data-button-area");
    this.sortDataButton = this.shadowRoot.querySelector(".sort-data-button");
    this.sortOptions1 = this.shadowRoot.querySelector(".sort-options-1");
    this.defaultSortField = this.shadowRoot.querySelector(".sort-fields");
    this.defaultSortDirection = this.shadowRoot.querySelector(".sort-directions");
    
    this.sortAddingButton = this.shadowRoot.querySelector(".sort-adding-button");
    this.submitButton = this.shadowRoot.querySelector(".submit-button");
    this.resetButton = this.shadowRoot.querySelector(".reset-button");
    this.columnCount = document.querySelector(".columns").childElementCount;
    this.clickCount = 0; 
    this.closeButton = this.shadowRoot.querySelector(".close-button");
    this.selectInputs = this.shadowRoot.querySelector(".sort-options-1");
    this.table = document.querySelector('#data-table');
    this.sortLine = this.shadowRoot.querySelector(".sort-line");
    /*this.allIdOptions = this.shadowRoot.querySelector(".sort-options-cloned .id");
    this.allGenderOptions = this.shadowRoot.querySelector(".sort-options-cloned .gender");
    this.allFirstNameOptions = this.shadowRoot.querySelector(".sort-options-cloned .first-name");
    this.allLastNameOptions = this.shadowRoot.querySelector(".sort-options-cloned .last-name");
    this.allBirthDateOptions = this.shadowRoot.querySelector(".sort-options-cloned .birth-date");
    this.allAgeOptions = this.shadowRoot.querySelector(".sort-options-cloned .age");
    this.allEmailOptions = this.shadowRoot.querySelector(".sort-options-cloned .e-mail");
    this.allAddressOptions = this.shadowRoot.querySelector(".sort-options-cloned .address");*/
  }
  
}

customElements.define(MySortingSection.TAG, MySortingSection);
