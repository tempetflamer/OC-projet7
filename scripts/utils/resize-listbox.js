/**
 * This function adjust the size of a listbox based on the width of the current browser window.
 * For that, it remove all "box" classes from the listbox and the container element that holds the listbox 
 * (qsList and qsBox, respectively), then adding a new "box" class based on the width of the browser window.
 * Finally, the function also sets the placeholder text of an input element (qsInput) based on the current class of the container element.
 * @param {*} array - ingredients, applainces or tools array 
 * @param {HTML Element} qsList - listbox
 * @param {HTML Element} qsBox - container of listbox
 * @param {HTML Element} qsInput - input 
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
      else if (window.matchMedia("(min-width:1525px) and (max-width: 1799px)").matches) /*1760 */ {
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