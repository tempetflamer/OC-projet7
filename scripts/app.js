import { dataFetch } from "./utils/dataReader.js";
import { recipesFactories, getListIngredients, getListAppliances, getListTools } from "./factories/recipe.js";
import { initArrays, sortArrays } from "./utils/initArrays.js";
import { arrayrecipes, arrayIngredients, arrayAppliances, arrayTools } from "./utils/initArrays.js";

const searchInput = document.querySelector(".recherche__container input");
const qsBody = document.querySelector("body");

const qsIngredientBoxOff = document.querySelector(".--ingredients-off"); // utiliser box on plutôt la prochaine fois
const qsIngredientBoxOn = document.querySelector(".--ingredients-on");
const qsIngredientBox = document.querySelector(".listbox__container__ingredients"); // create a container-off container-on
const qsIngredientTitle = document.querySelector(".listbox__container__ingredients__title");
const qsIngredientInput = document.querySelector(".listbox__container__ingredients__input");
const qsIngredientSwap = document.querySelector(".listbox__container__ingredients--swap");
const qsIngredientList = document.querySelector(".listbox__container__ingredients__list");

const qsApplianceBoxOff = document.querySelector(".--appliances-off"); // rename appliances by Appliance
const qsApplianceBoxOn = document.querySelector(".--appliances-on"); // rename appliances by Appliance
const qsApplianceBox = document.querySelector(".listbox__container__appliances"); // rename appliances by Appliance
const qsApplianceTitle = document.querySelector(".listbox__container__appliances__title");
const qsApplianceInput = document.querySelector(".listbox__container__appliances__input");
const qsApplianceSwap = document.querySelector(".listbox__container__appliances--swap");
const qsApplianceList = document.querySelector(".listbox__container__appliances__list");

const qsToolBoxOff = document.querySelector(".--tools-off");
const qsToolBoxOn = document.querySelector(".--tools-on");
const qsToolBox = document.querySelector(".listbox__container__tools");
const qsToolTitle = document.querySelector(".listbox__container__tools__title");
const qsToolInput = document.querySelector(".listbox__container__tools__input");
const qsToolSwap = document.querySelector(".listbox__container__tools--swap");
const qsToolList = document.querySelector(".listbox__container__tools__list");

const qsCloseList = document.querySelectorAll(".fa-chevron-up");
const qsOpenList = document.querySelectorAll(".fa-chevron-down");

const qsCloseListIngredient = document.querySelector(".listbox__container__ingredients--swap > .fa-chevron-up");
const qsOpenListIngredient = document.querySelector(".listbox__container__ingredients--swap > .fa-chevron-down");
const qsCloseListTool = document.querySelector(".listbox__container__tools--swap > .fa-chevron-up");
const qsOpenListTool = document.querySelector(".listbox__container__tools--swap > .fa-chevron-down");
const qsCloseListAppliance = document.querySelector(".listbox__container__appliances--swap > .fa-chevron-up");
const qsOpenListAppliance = document.querySelector(".listbox__container__appliances--swap > .fa-chevron-down");

const searchHiddenElements = document.querySelectorAll("body");
console.log(searchInput);

let firstDisplayIngredient = false;
let firstDisplayAppliance = false;
let firstDisplayTool = false;

// Animation Input
searchInput.addEventListener("input", function (e) {
  if (e.target.value !== "") {
    e.target.parentNode.classList.add("active-input");
  } else if (e.target.value === "") {
    e.target.parentNode.classList.remove("active-input");
  }
});

let hiddenElement = document.querySelectorAll(".fa-chevron-up");
//hiddenElement.forEach((element) => element.style.display = "none");
hiddenElement.forEach((element) => element.classList.add("hidden"));

async function init() {
  const data = await dataFetch();
  const recipesSection = document.querySelector(".recipes");

  data.recipes.forEach((recipe) => {
    console.log(recipe);
    const recipesModel = recipesFactories(recipe);
    const recipeCardDOM = recipesModel.getRecipeCard();
    recipesSection.appendChild(recipeCardDOM);

    const initArray = initArrays(recipe);
    initArray.initArrayRecipe();
    initArray.initArrayIngredient();
    initArray.initArrayAppliance();
    initArray.initArrayTool();

    // const photographerModel = photographerFactory(photographer);
    // const userCardDOM = photographerModel.getUserCardDOM();
    // photographersSection.appendChild(userCardDOM);
  });

  // Partie test
  //faire un js de trie
  sortArrays();

  // il faut que j'enlève box-on et que je mettre un box off plutôt
  console.log("taille du array ingrédient" + arrayIngredients.length);
  let i = 0;
  let j = 1;

  for (let i = 0; i < arrayIngredients.length + 1; i = i + 10, j++) {
    if (i + 10 > arrayIngredients.length) {
      if (window.matchMedia("(min-width:2050px)").matches) {
        if (j > 8) {
          qsIngredientList.classList.add("box" + 8);
          qsIngredientBox.classList.add("box" + 8);
        } else {
          qsIngredientList.classList.add("box" + j);
          qsIngredientBox.classList.add("box" + j);
        }

      }
      else if (window.matchMedia("(min-width:1800px) and (max-width: 2049px)").matches) {
        if (j > 7) {
          qsIngredientList.classList.add("box" + 7);
          qsIngredientBox.classList.add("box" + 7);
        } else {
          qsIngredientList.classList.add("box" + j);
          qsIngredientBox.classList.add("box" + j);
        }
      }
      else if (window.matchMedia("(min-width:1525px) and (max-width: 1799px)").matches) /*1760 */ {
        if (j > 6) {
          qsIngredientList.classList.add("box" + 6);
          qsIngredientBox.classList.add("box" + 6);
        } else {
          qsIngredientList.classList.add("box" + j);
          qsIngredientBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(min-width:1280px) and (max-width: 1524px)").matches) {
        if (j > 5) {
          qsIngredientList.classList.add("box" + 5);
          qsIngredientBox.classList.add("box" + 5);
        } else {
          qsIngredientList.classList.add("box" + j);
          qsIngredientBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(min-width:1025px) and (max-width: 1279px)").matches) {
        if (j > 4) {
          qsIngredientList.classList.add("box" + 4);
          qsIngredientBox.classList.add("box" + 4);
        } else {
          qsIngredientList.classList.add("box" + j);
          qsIngredientBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(min-width:769px) and (max-width: 1024px)").matches) {
        if (j > 3) {
          qsIngredientList.classList.add("box" + 3);
          qsIngredientBox.classList.add("box" + 3);
        } else {
          qsIngredientList.classList.add("box" + j);
          qsIngredientBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(min-width:521px) and (max-width: 768px)").matches) {
        if (j > 2) {
          qsIngredientList.classList.add("box" + 2);
          qsIngredientBox.classList.add("box" + 2);
        } else {
          qsIngredientList.classList.add("box" + j);
          qsIngredientBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(max-width: 520px)").matches) {
        qsIngredientList.classList.add("box" + 1);
        qsIngredientBox.classList.add("box" + 1);
      } /* else {
        if (j > 8) {
          //qsIngredientList.classList.add("box"+7);
          qsIngredientBox.classList.add("box" + 7);
        } else {
          qsIngredientList.classList.add("box" + j);
          qsIngredientBox.classList.add("box" + j);
        }
      } */
    }
  }
  console.log("combien vaut j : " + j);

  console.log("taille du array appliance" + arrayAppliances.length);

  i = 0;
  j = 1;
  for (let i = 0; i < arrayAppliances.length + 1; i = i + 10, j++) {
    if (i + 10 > arrayAppliances.length) {
      if (window.matchMedia("(min-width:2050px)").matches) {
        if (j > 8) {
          qsApplianceList.classList.add("box" + 8);
          qsApplianceBox.classList.add("box" + 8);
        } else {
          qsApplianceList.classList.add("box" + j);
          qsApplianceBox.classList.add("box" + j);
        }

      }
      else if (window.matchMedia("(min-width:1800px) and (max-width: 2049px)").matches) {
        if (j > 7) {
          qsApplianceList.classList.add("box" + 7);
          qsApplianceBox.classList.add("box" + 7);
        } else {
          qsApplianceList.classList.add("box" + j);
          qsApplianceBox.classList.add("box" + j);
        }
      }
      else if (window.matchMedia("(min-width:1525px) and (max-width: 1799px)").matches) /*1760 */ {
        if (j > 6) {
          qsApplianceList.classList.add("box" + 6);
          qsApplianceBox.classList.add("box" + 6);
        } else {
          qsApplianceList.classList.add("box" + j);
          qsApplianceBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(min-width:1280px) and (max-width: 1524px)").matches) {
        if (j > 5) {
          qsApplianceList.classList.add("box" + 5);
          qsApplianceBox.classList.add("box" + 5);
        } else {
          qsApplianceList.classList.add("box" + j);
          qsApplianceBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(min-width:1025px) and (max-width: 1279px)").matches) {
        if (j > 4) {
          qsApplianceList.classList.add("box" + 4);
          qsApplianceBox.classList.add("box" + 4);
        } else {
          qsApplianceList.classList.add("box" + j);
          qsApplianceBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(min-width:769px) and (max-width: 1024px)").matches) {
        if (j > 3) {
          qsApplianceList.classList.add("box" + 3);
          qsApplianceBox.classList.add("box" + 3);
        } else {
          qsApplianceList.classList.add("box" + j);
          qsApplianceBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(min-width:521px) and (max-width: 768px)").matches) {
        if (j > 2) {
          qsApplianceList.classList.add("box" + 2);
          qsApplianceBox.classList.add("box" + 2);
        } else {
          qsApplianceList.classList.add("box" + j);
          qsApplianceBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(max-width: 520px)").matches) {
        qsApplianceList.classList.add("box" + 1);
        qsApplianceBox.classList.add("box" + 1);
      } /* else {
        if (j > 8) {
          //qsApplianceList.classList.add("box"+7);
          qsApplianceBox.classList.add("box" + 7);
        } else {
          qsApplianceList.classList.add("box" + j);
          qsApplianceBox.classList.add("box" + j);
        }
      } */
    }
  }
  console.log("combien vaut j : " + j);

  console.log("taille du array tool" + arrayTools.length);

  i = 0;
  j = 1;
  for (let i = 0; i < arrayTools.length + 1; i = i + 10, j++) {
    if (i + 10 > arrayTools.length) {
      if (window.matchMedia("(min-width:2050px)").matches) {
        if (j > 8) {
          qsToolList.classList.add("box" + 8);
          qsToolBox.classList.add("box" + 8);
        } else {
          qsToolList.classList.add("box" + j);
          qsToolBox.classList.add("box" + j);
        }

      }
      else if (window.matchMedia("(min-width:1800px) and (max-width: 2049px)").matches) {
        if (j > 7) {
          qsToolList.classList.add("box" + 7);
          qsToolBox.classList.add("box" + 7);
        } else {
          qsToolList.classList.add("box" + j);
          qsToolBox.classList.add("box" + j);
        }
      }
      else if (window.matchMedia("(min-width:1525px) and (max-width: 1799px)").matches) /*1760 */ {
        if (j > 6) {
          qsToolList.classList.add("box" + 6);
          qsToolBox.classList.add("box" + 6);
        } else {
          qsToolList.classList.add("box" + j);
          qsToolBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(min-width:1280px) and (max-width: 1524px)").matches) { // sur chrome a 1279 on passe a 5 mdr
        if (j > 5) {
          qsToolList.classList.add("box" + 5);
          qsToolBox.classList.add("box" + 5);
        } else {
          qsToolList.classList.add("box" + j);
          qsToolBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(min-width:1025px) and (max-width: 1279px)").matches) {
        if (j > 4) {
          qsToolList.classList.add("box" + 4);
          qsToolBox.classList.add("box" + 4);
        } else {
          qsToolList.classList.add("box" + j);
          qsToolBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(min-width:769px) and (max-width: 1024px)").matches) {
        if (j > 3) {
          qsToolList.classList.add("box" + 3);
          qsToolBox.classList.add("box" + 3);
        } else {
          qsToolList.classList.add("box" + j);
          qsToolBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(min-width:521px) and (max-width: 768px)").matches) {
        if (j > 2) {
          qsToolList.classList.add("box" + 2);
          qsToolBox.classList.add("box" + 2);
        } else {
          qsToolList.classList.add("box" + j);
          qsToolBox.classList.add("box" + j);
        }
      } else if (window.matchMedia("(max-width: 520px)").matches) {
        qsToolList.classList.add("box" + 1);
        qsToolBox.classList.add("box" + 1);
      } /* else {
        if (j > 8) {
          //qsToolList.classList.add("box"+7);
          qsToolBox.classList.add("box" + 7);
        } else {
          qsToolList.classList.add("box" + j);
          qsToolBox.classList.add("box" + j);
        }
      } */
    }
  }
  console.log("combien vaut j : " + j);

  qsIngredientBox.classList.add("box-off");
  qsApplianceBox.classList.add("box-off");
  qsToolBox.classList.add("box-off");

  //renomer ce get ou les autres éléments qui n'en nont pas avec set, create etc
  const createIngredientList = getListIngredients(qsIngredientList, arrayIngredients);
  const createAppliancetList = getListAppliances(qsApplianceList, arrayAppliances);
  const createTooltList = getListTools(qsToolList, arrayTools);
}

init();

function searchIngredient() {
  console.log("test d'entére");
  let filter = qsIngredientInput.value.toUpperCase();
  let allIngredients = document.querySelectorAll(
    ".listbox__container__ingredients__list > li"
  );
  let value, i, allVisibleIngredients;

  console.log("length ingredient list : " + allIngredients);

  console.log("length ingredient list : " + allIngredients.length);

  for (i = 0; i < allIngredients.length; i++) {
    value = allIngredients[i].innerText;
    console.log(
      "value de search : " + value + " " + allIngredients[i].innerText
    );
    if (value.toUpperCase().indexOf(filter) > -1) {
      allIngredients[i].classList.remove("hidden");
      //allIngredients[i].style.display = "block";
    } else {
      allIngredients[i].classList.add("hidden");
      //allIngredients[i].style.display = "none";
    }
    //allVisibleIngredients = document.querySelectorAll('.listbox__container__ingredients__list > li:visible') // c'est avec jquery, pas natif
    //allVisibleIngredients = document.querySelectorAll('.listbox__container__ingredients__list > li:not([hidden])') // marche pas
    allVisibleIngredients = document.querySelectorAll(
      ".listbox__container__ingredients__list > li:not(.hidden)"
    );
    console.log(
      "element visible : " +
      allVisibleIngredients.length +
      allVisibleIngredients[0]
    );
    if (allVisibleIngredients.length < 2) {
      // qsIngredientBox.classList.remove("box--on");
      // qsIngredientBox.classList.add("box1--on");
    } else if (allVisibleIngredients.length == 2) {
      // qsIngredientBox.classList.remove("box--on");
      // qsIngredientBox.classList.add("box1--on");
    } else {
      // qsIngredientBox.classList.remove("box--on");
      // qsIngredientBox.classList.add("box1--on");
    }
  }
}
qsIngredientInput.addEventListener("keyup", searchIngredient);

document.addEventListener("click", (e) => {
  console.log(qsIngredientBox.classList.contains("box--on"));
  if (qsIngredientBox.classList.contains("box--on")) {
    // normalement ça devrait etre box-on ou box-off devrait être box--off
    console.log("contains");

    if ( e.target.classList.contains("listbox__container__ingredients") || e.target.classList.contains("listbox__container__ingredients__title") ||
      e.target.classList.contains("listbox__container__ingredients--swap") || e.target.classList.contains("listbox__container__ingredients__title") ||
      e.target.classList.contains("fa-chevron-down") || e.target.classList.contains("listbox__container__ingredients__input") ||
      e.target.classList.contains("listbox__container__ingredients__list") || e.target.nodeName == "LI" ) {
      qsApplianceTitle.classList.remove("hidden");
      qsApplianceInput.classList.add("hidden");
      qsApplianceList.classList.add("hidden");
      qsApplianceBox.classList.remove("box--on"); //
      qsApplianceBox.classList.add("box-off");
      qsApplianceSwap.classList.remove("swap--on");
      qsOpenListAppliance.classList.remove("hidden");
      qsCloseListAppliance.classList.add("hidden");

      qsToolTitle.classList.remove("hidden");
      qsToolInput.classList.add("hidden");
      qsToolList.classList.add("hidden");
      qsToolBox.classList.remove("box--on"); //
      qsToolBox.classList.add("box-off");
      qsToolSwap.classList.remove("swap--on");
      qsOpenListTool.classList.remove("hidden");
      qsCloseListTool.classList.add("hidden");

      console.log("if");
      return;
    } else {
      qsIngredientTitle.classList.remove("hidden");
      qsIngredientInput.classList.add("hidden");
      qsIngredientList.classList.add("hidden");
      qsIngredientBox.classList.remove("box--on");
      qsIngredientBox.classList.add("box-off");
      qsIngredientSwap.classList.remove("swap--on");
      qsOpenListIngredient.classList.remove("hidden");
      qsCloseListIngredient.classList.add("hidden");
      console.log("else");
    }
  }

  // Appliance

  if (qsApplianceBox.classList.contains("box--on")) {
    console.log("contains");

    if ( e.target.classList.contains("listbox__container__appliances") || e.target.classList.contains("listbox__container__appliances__title") ||
      e.target.classList.contains("listbox__container__appliances--swap") || e.target.classList.contains("listbox__container__appliances__title") ||
      e.target.classList.contains("fa-chevron-down") || e.target.classList.contains("listbox__container__appliances__input") ||
      e.target.classList.contains("listbox__container__appliances__list") || e.target.nodeName == "LI" ) {
      // be sure que les deux autres avant se ferme dans ce cas
      qsIngredientTitle.classList.remove("hidden");
      qsIngredientInput.classList.add("hidden");
      qsIngredientList.classList.add("hidden");
      qsIngredientBox.classList.remove("box--on");
      qsIngredientBox.classList.add("box-off");
      qsIngredientSwap.classList.remove("swap--on");
      qsOpenListIngredient.classList.remove("hidden");
      qsCloseListIngredient.classList.add("hidden");

      qsToolTitle.classList.remove("hidden");
      qsToolInput.classList.add("hidden");
      qsToolList.classList.add("hidden");
      qsToolBox.classList.remove("box--on");
      qsToolBox.classList.add("box-off");
      qsToolSwap.classList.remove("swap--on");
      qsOpenListTool.classList.remove("hidden");
      qsCloseListTool.classList.add("hidden");
      console.log("if");
      return;
    } else {
      qsApplianceTitle.classList.remove("hidden");
      qsApplianceInput.classList.add("hidden");
      qsApplianceList.classList.add("hidden");
      qsApplianceBox.classList.remove("box--on");
      qsApplianceBoxOff.classList.add("box-off");
      qsApplianceSwap.classList.remove("swap--on");
      qsOpenListAppliance.classList.remove("hidden");
      qsCloseListAppliance.classList.add("hidden");
      console.log("else");
    }
  }

  // Tool

  if (qsToolBox.classList.contains("box--on")) {
    console.log("contains");

    if ( e.target.classList.contains("listbox__container__tools") || e.target.classList.contains("listbox__container__tools__title") ||
      e.target.classList.contains("listbox__container__tools--swap") || e.target.classList.contains("listbox__container__tools__title") ||
      e.target.classList.contains("fa-chevron-down") || e.target.classList.contains("listbox__container__tools__input") ||
      e.target.classList.contains("listbox__container__tools__list") || e.target.nodeName == "LI" ) {
      // pas besoin de fermer pour la technière techniquement
      console.log("if");
      return;
    } else {
      qsToolTitle.classList.remove("hidden");
      qsToolInput.classList.add("hidden");
      qsToolList.classList.add("hidden");
      qsToolBox.classList.remove("box--on");
      qsToolBox.classList.add("box-off");
      qsToolSwap.classList.remove("swap--on");
      qsOpenListTool.classList.remove("hidden");
      qsCloseListTool.classList.add("hidden");
      console.log("else");
    }
  }
});

qsIngredientBoxOff.addEventListener("click", function (e) {
  if (qsIngredientInput.classList.contains("hidden")) {
    //retrait des toggle ar des add et remove pour une meilleur compréhension
    qsIngredientTitle.classList.add("hidden");
    qsIngredientInput.classList.remove("hidden");
    qsIngredientList.classList.remove("hidden");
    qsIngredientInput.focus();
    qsIngredientBox.classList.add("box--on");
    qsIngredientBox.classList.remove("box-off");
    qsIngredientSwap.classList.add("swap--on");
    qsOpenListIngredient.classList.add("hidden");
    qsCloseListIngredient.classList.remove("hidden");

    qsIngredientBox.classList.remove("--ingredients-off");
    qsCloseListIngredient.classList.add("--ingredients-on");

  }
});

qsIngredientBox.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    qsIngredientTitle.classList.toggle("hidden");
    qsIngredientInput.classList.toggle("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
    qsIngredientList.classList.toggle("hidden");
    qsIngredientBox.classList.toggle("box--on");
    qsIngredientBox.classList.remove("box-off");
    qsIngredientSwap.classList.toggle("swap--on");
  }
});

qsToolBox.addEventListener("click", function (e) {
  if (qsToolInput.classList.contains("hidden")) {
    //retrait des toggle ar des add et remove pour une meilleur compréhension
    qsToolTitle.classList.add("hidden");
    qsToolInput.classList.remove("hidden");
    qsToolList.classList.remove("hidden");
    qsToolInput.focus();
    qsToolBox.classList.add("box--on");
    qsToolBox.classList.remove("box-off");
    qsToolSwap.classList.add("swap--on");
    qsOpenListTool.classList.add("hidden");
    qsCloseListTool.classList.remove("hidden");
  }
});

qsToolBox.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    qsToolTitle.classList.toggle("hidden");
    qsToolInput.classList.toggle("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
    qsToolList.classList.toggle("hidden");
    qsToolBox.classList.toggle("box--on");
    qsToolBox.classList.remove("box-off");
    qsToolSwap.classList.toggle("swap--on");
  }
});

qsApplianceBox.addEventListener("click", function (e) {
  if (qsApplianceInput.classList.contains("hidden")) {
    //retrait des toggle ar des add et remove pour une meilleur compréhension
    qsApplianceTitle.classList.add("hidden");
    qsApplianceInput.classList.remove("hidden");
    qsApplianceList.classList.remove("hidden");
    qsApplianceInput.focus();
    qsApplianceBox.classList.add("box--on");
    qsApplianceBox.classList.remove("box-off");
    qsApplianceSwap.classList.add("swap--on");
    qsOpenListAppliance.classList.add("hidden");
    qsCloseListAppliance.classList.remove("hidden");
  }
});

qsApplianceBox.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    qsApplianceTitle.classList.toggle("hidden");
    qsApplianceInput.classList.toggle("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
    qsApplianceList.classList.toggle("hidden");
    qsApplianceBox.classList.toggle("box--on");
    qsApplianceBox.classList.remove("box-off");
    qsApplianceSwap.classList.toggle("swap--on");
  }
});
