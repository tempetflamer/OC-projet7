/**
 * This function adjust the size of a listbox based on the width of the current browser window.
 * For that, it remove all "box" classes from the listbox and the container element that holds the listbox 
 * (qsList and qsBox, respectively), then adding a new "box" class based on the width of the browser window.
 * Finally, the function also sets the placeholder text of an input element (qsInput) based on the current class of the container element.
 * @param {*} array - ingredients, applainces or tools array 
 * @param {HTMLElement} qsList - listbox
 * @param {HTMLElement} qsBox - container of listbox
 * @param {HTMLElement} qsInput - input 
 */
export function setlistboxSize(array, qsList, qsBox, qsInput) {

   let j = 1;

  for (let i = 1; i < 9; i++ ) {
    qsList.classList.remove("box" + i);
    qsBox.classList.remove("box" + i);
  }

  for (let i = 0; i < array.length + 1; i = i + 10, j++) {
    if (i + 10 > array.length) {
      if (window.matchMedia("(min-width:2050px)").matches) {
        if (j > 8) {
            qsList.classList.add("box" + 8);
          qsBox.classList.add("box" + 8);
        } else {
          qsList.classList.add("box" + j);
          qsBox.classList.add("box" + j);
        }

      }
      else if (window.matchMedia("(min-width:1800px) and (max-width: 2049px)").matches) {
        if (j > 7) {
          qsList.classList.add("box" + 7);
          qsBox.classList.add("box" + 7);
        } else {
          qsList.classList.add("box" + j);
          qsBox.classList.add("box" + j);
        }
      }
      else if (window.matchMedia("(min-width:1525px) and (max-width: 1799px)").matches) {
        if (j > 6) {
          qsList.classList.add("box" + 6);
          qsBox.classList.add("box" + 6);
        } else {
          qsList.classList.add("box" + j);
          qsBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(min-width:1280px) and (max-width: 1524px)").matches) {
        if (j > 5) {
          qsList.classList.add("box" + 5);
          qsBox.classList.add("box" + 5);
        } else {
          qsList.classList.add("box" + j);
          qsBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(min-width:1025px) and (max-width: 1279px)").matches) {
        if (j > 4) {
          qsList.classList.add("box" + 4);
          qsBox.classList.add("box" + 4);
        } else {
          qsList.classList.add("box" + j);
          qsBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(min-width:769px) and (max-width: 1024px)").matches) {
        if (j > 3) {
          qsList.classList.add("box" + 3);
          qsBox.classList.add("box" + 3);
        } else {
          qsList.classList.add("box" + j);
          qsBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(min-width:521px) and (max-width: 768px)").matches) {
        if (j > 2) {
          qsList.classList.add("box" + 2);
          qsBox.classList.add("box" + 2);
        } else {
          qsList.classList.add("box" + j);
          qsBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(max-width: 520px)").matches) {
        qsList.classList.add("box" + 1);
        qsBox.classList.add("box" + 1);
      } 
    }
  }

  if (qsList.classList.contains("box1")) {
    qsInput.placeholder = "Rechercher..."
  }
  else {
    if (qsBox.classList.contains("listbox__container__ingredients")) {qsInput.placeholder = "Rechercher un ingrédient";}
    if (qsBox.classList.contains("listbox__container__appliances")) {qsInput.placeholder = "Rechercher un appareil";}
    if (qsBox.classList.contains("listbox__container__tools")) {qsInput.placeholder = "Rechercher un ustensiles";}  
  }


}

/**
 * Function that hides the open listbox
 * HTMLElement can be from Ingredient, Appliance or Tool list
 * @param {HTMLElement} qsTitle 
 * @param {HTMLElement} qsInput 
 * @param {HTMLElement} qsList 
 * @param {HTMLElement} qsBox 
 * @param {HTMLElement} qsSwap 
 * @param {HTMLElement} qsOpenList 
 * @param {HTMLElement} qsCloseList 
 */
export function hideListbox(qsTitle, qsInput, qsList, qsBox, qsSwap, qsOpenList, qsCloseList) {
  qsTitle.classList.remove("hidden");
  qsInput.classList.add("hidden");
  qsList.classList.add("hidden");
  qsBox.classList.remove("box--on");
  qsBox.classList.add("box--off");
  qsSwap.classList.remove("swap--on");
  qsOpenList.classList.remove("hidden");
  qsCloseList.classList.add("hidden");
  qsInput.value ="";
}

/**
 * Function that display the listbox
 * HTMLElement can be from Ingredient, Appliance or Tool list
 * @param {HTMLElement} qsTitle 
 * @param {HTMLElement} qsInput 
 * @param {HTMLElement} qsList 
 * @param {HTMLElement} qsBox 
 * @param {HTMLElement} qsSwap 
 * @param {HTMLElement} qsOpenList 
 * @param {HTMLElement} qsCloseList 
 */
export function displayListbox(qsTitle, qsInput, qsList, qsBox, qsSwap, qsOpenList, qsCloseList) {
  qsTitle.classList.add("hidden");
  qsInput.classList.remove("hidden");
  qsList.classList.remove("hidden");
  qsInput.focus();
  qsBox.classList.add("box--on");
  qsBox.classList.remove("box--off");
  qsSwap.classList.add("swap--on");
  qsOpenList.classList.add("hidden");
  qsCloseList.classList.remove("hidden");
}

/**
 * Search in current list, the input word(s)
 * @param {HTMLElement} qsInput - event
 * @param {String} type 
 */
export function searchListbox(qsInput, type) {
  let filter = qsInput.target.value.toUpperCase();
  let allElements = document.querySelectorAll(`.listbox__container__${type}__list > li`);
  let value, i;

  for (i = 0; i < allElements.length; i++) {
    value = allElements[i].innerText;
    if (value.toUpperCase().indexOf(filter) > -1) {
      allElements[i].classList.remove("hidden");
    } else {
      allElements[i].classList.add("hidden");
    }
  }
}