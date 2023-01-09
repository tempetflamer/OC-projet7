export function setlistboxSize(array, qsList, qsBox) {

  console.log("taille du array" + array.length);
  //let i = 0;
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
      } /* else {
        if (j > 8) {
          //qsList.classList.add("box"+7);
          qsBox.classList.add("box" + 7);
        } else {
          qsList.classList.add("box" + j);
          qsBox.classList.add("box" + j);
        }
      } */
    }
  }
  console.log("combien vaut j : " + j);

}