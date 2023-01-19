import { dataFetch } from "./utils/dataReader.js";
import { recipesFactories, getListIngredients, getListAppliances, getListTools } from "./factories/recipe.js";
import { initArrays, initResetArrays, sortArrays } from "./utils/initArrays.js";
import { arrayrecipes, arrayrecipesReset, arrayIngredients, arrayIngredientsReset, arrayAppliances, arrayAppliancesReset, arrayTools, arrayToolsReset } from "./utils/initArrays.js";
import { setlistboxSize } from "./utils/resize-listbox.js";
import { searchByTag, searchByWord, initSearch, resetSearch } from "./utils/search.js";

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

const qsCloseListIngredient = document.querySelector(".listbox__container__ingredients--swap > div >.fa-chevron-up");
const qsOpenListIngredient = document.querySelector(".listbox__container__ingredients--swap > div > .fa-chevron-down");
const qsCloseListTool = document.querySelector(".listbox__container__tools--swap > div > .fa-chevron-up");
const qsOpenListTool = document.querySelector(".listbox__container__tools--swap > div > .fa-chevron-down");
const qsCloseListAppliance = document.querySelector(".listbox__container__appliances--swap > div > .fa-chevron-up");
const qsOpenListAppliance = document.querySelector(".listbox__container__appliances--swap > div > .fa-chevron-down");

const searchHiddenElements = document.querySelectorAll("body");

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

  initResetArrays(),

    // Partie test
    //faire un js de trie
    sortArrays();

    setlistboxSize(arrayIngredients, qsIngredientList, qsIngredientBox, qsIngredientInput, qsApplianceInput, qsToolInput)
    setlistboxSize(arrayTools, qsToolList, qsToolBox, qsIngredientInput, qsApplianceInput, qsToolInput)
    setlistboxSize(arrayAppliances, qsApplianceList, qsApplianceBox, qsIngredientInput, qsApplianceInput, qsToolInput)

  qsIngredientBox.classList.add("box--off");
  qsApplianceBox.classList.add("box--off");
  qsToolBox.classList.add("box--off");

  //renomer ce get ou les autres éléments qui n'en nont pas avec set, create etc
  const createIngredientList = getListIngredients(qsIngredientList, arrayIngredients);
  const createAppliancetList = getListAppliances(qsApplianceList, arrayAppliances);
  const createTooltList = getListTools(qsToolList, arrayTools);
}

init();

function searchIngredient() {
  let filter = qsIngredientInput.value.toUpperCase();
  let allIngredients = document.querySelectorAll(".listbox__container__ingredients__list > li");
  let value, i, allVisibleIngredients;

  for (i = 0; i < allIngredients.length; i++) {
    value = allIngredients[i].innerText;
    if (value.toUpperCase().indexOf(filter) > -1) {
      allIngredients[i].classList.remove("hidden");
    } else {
      allIngredients[i].classList.add("hidden");
    }
  }
}
qsIngredientInput.addEventListener("keyup", searchIngredient); // je sais plus trop à quoi ca sert mais c'est pas utilisé

document.addEventListener("click", (e) => {
  if (qsIngredientBox.classList.contains("box--on")) {

    if (e.target.classList.contains("listbox__container__ingredients") || e.target.classList.contains("listbox__container__ingredients__title") ||
      e.target.classList.contains("listbox__container__ingredients--swap") || e.target.classList.contains("listbox__container__ingredients__title") ||
      e.target.classList.contains("fa-chevron-down") || e.target.classList.contains("listbox__container__ingredients__input") ||
      e.target.classList.contains("listbox__container__ingredients__list") || e.target.nodeName == "LI") {
      qsApplianceTitle.classList.remove("hidden");
      qsApplianceInput.classList.add("hidden");
      qsApplianceList.classList.add("hidden");
      qsApplianceBox.classList.remove("box--on"); //
      qsApplianceBox.classList.add("box--off");
      qsApplianceSwap.classList.remove("swap--on");
      qsOpenListAppliance.classList.remove("hidden");
      qsCloseListAppliance.classList.add("hidden");

      qsToolTitle.classList.remove("hidden");
      qsToolInput.classList.add("hidden");
      qsToolList.classList.add("hidden");
      qsToolBox.classList.remove("box--on"); //
      qsToolBox.classList.add("box--off");
      qsToolSwap.classList.remove("swap--on");
      qsOpenListTool.classList.remove("hidden");
      qsCloseListTool.classList.add("hidden");

    } else {
      qsIngredientTitle.classList.remove("hidden");
      qsIngredientInput.classList.add("hidden");
      qsIngredientList.classList.add("hidden");
      qsIngredientBox.classList.remove("box--on");
      qsIngredientBox.classList.add("box--off");
      qsIngredientSwap.classList.remove("swap--on");
      qsOpenListIngredient.classList.remove("hidden");
      qsCloseListIngredient.classList.add("hidden");
    }
  }

  // Appliance

  if (qsApplianceBox.classList.contains("box--on")) {

    if (e.target.classList.contains("listbox__container__appliances") || e.target.classList.contains("listbox__container__appliances__title") ||
      e.target.classList.contains("listbox__container__appliances--swap") || e.target.classList.contains("listbox__container__appliances__title") ||
      e.target.classList.contains("fa-chevron-down") || e.target.classList.contains("listbox__container__appliances__input") ||
      e.target.classList.contains("listbox__container__appliances__list") || e.target.nodeName == "LI") {
      // be sure que les deux autres avant se ferme dans ce cas
      qsIngredientTitle.classList.remove("hidden");
      qsIngredientInput.classList.add("hidden");
      qsIngredientList.classList.add("hidden");
      qsIngredientBox.classList.remove("box--on");
      qsIngredientBox.classList.add("box--off");
      qsIngredientSwap.classList.remove("swap--on");
      qsOpenListIngredient.classList.remove("hidden");
      qsCloseListIngredient.classList.add("hidden");

      qsToolTitle.classList.remove("hidden");
      qsToolInput.classList.add("hidden");
      qsToolList.classList.add("hidden");
      qsToolBox.classList.remove("box--on");
      qsToolBox.classList.add("box--off");
      qsToolSwap.classList.remove("swap--on");
      qsOpenListTool.classList.remove("hidden");
      qsCloseListTool.classList.add("hidden");

    } else {
      qsApplianceTitle.classList.remove("hidden");
      qsApplianceInput.classList.add("hidden");
      qsApplianceList.classList.add("hidden");
      qsApplianceBox.classList.remove("box--on");
      qsApplianceBoxOff.classList.add("box--off");
      qsApplianceSwap.classList.remove("swap--on");
      qsOpenListAppliance.classList.remove("hidden");
      qsCloseListAppliance.classList.add("hidden");
    }
  }

  // Tool

  if (qsToolBox.classList.contains("box--on")) {

    if (e.target.classList.contains("listbox__container__tools") || e.target.classList.contains("listbox__container__tools__title") ||
      e.target.classList.contains("listbox__container__tools--swap") || e.target.classList.contains("listbox__container__tools__title") ||
      e.target.classList.contains("fa-chevron-down") || e.target.classList.contains("listbox__container__tools__input") ||
      e.target.classList.contains("listbox__container__tools__list") || e.target.nodeName == "LI") {
      // pas besoin de fermer pour la technière techniquement

    } else {
      qsToolTitle.classList.remove("hidden");
      qsToolInput.classList.add("hidden");
      qsToolList.classList.add("hidden");
      qsToolBox.classList.remove("box--on");
      qsToolBox.classList.add("box--off");
      qsToolSwap.classList.remove("swap--on");
      qsOpenListTool.classList.remove("hidden");
      qsCloseListTool.classList.add("hidden");
    }
  }
});

qsIngredientBoxOff.addEventListener("click", function (e) {
  if (qsIngredientInput.classList.contains("hidden")) {
    //retrait des toggle par des add et remove pour une meilleur compréhension
    qsIngredientTitle.classList.add("hidden");
    qsIngredientInput.classList.remove("hidden");
    qsIngredientList.classList.remove("hidden");
    qsIngredientInput.focus();
    qsIngredientBox.classList.add("box--on");
    qsIngredientBox.classList.remove("box--off");
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
    qsIngredientInput.classList.toggle("hidden");
    qsIngredientList.classList.toggle("hidden");
    qsIngredientBox.classList.toggle("box--on");
    qsIngredientBox.classList.remove("box--off");
    qsIngredientSwap.classList.toggle("swap--on");
  }
});

qsToolBox.addEventListener("click", function (e) {
  if (qsToolInput.classList.contains("hidden")) {
    //retrait des toggle par des add et remove pour une meilleur compréhension
    qsToolTitle.classList.add("hidden");
    qsToolInput.classList.remove("hidden");
    qsToolList.classList.remove("hidden");
    qsToolInput.focus();
    qsToolBox.classList.add("box--on");
    qsToolBox.classList.remove("box--off");
    qsToolSwap.classList.add("swap--on");
    qsOpenListTool.classList.add("hidden");
    qsCloseListTool.classList.remove("hidden");
  }
});

qsToolBox.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    qsToolTitle.classList.toggle("hidden");
    qsToolInput.classList.toggle("hidden");
    qsToolList.classList.toggle("hidden");
    qsToolBox.classList.toggle("box--on");
    qsToolBox.classList.remove("box--off");
    qsToolSwap.classList.toggle("swap--on");
  }
});

qsApplianceBox.addEventListener("click", function (e) {
  if (qsApplianceInput.classList.contains("hidden")) {
    //retrait des toggle par des add et remove pour une meilleur compréhension
    qsApplianceTitle.classList.add("hidden");
    qsApplianceInput.classList.remove("hidden");
    qsApplianceList.classList.remove("hidden");
    qsApplianceInput.focus();
    qsApplianceBox.classList.add("box--on");
    qsApplianceBox.classList.remove("box--off");
    qsApplianceSwap.classList.add("swap--on");
    qsOpenListAppliance.classList.add("hidden");
    qsCloseListAppliance.classList.remove("hidden");
  }
});

qsApplianceBox.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    qsApplianceTitle.classList.toggle("hidden");
    qsApplianceInput.classList.toggle("hidden");
    qsApplianceList.classList.toggle("hidden");
    qsApplianceBox.classList.toggle("box--on");
    qsApplianceBox.classList.remove("box--off");
    qsApplianceSwap.classList.toggle("swap--on");
  }
});

window.addEventListener("resize", (e) => {

  setlistboxSize(arrayIngredients, qsIngredientList, qsIngredientBox, qsIngredientInput, qsApplianceInput, qsToolInput)
  setlistboxSize(arrayTools, qsToolList, qsToolBox, qsIngredientInput, qsApplianceInput, qsToolInput)
  setlistboxSize(arrayAppliances, qsApplianceList, qsApplianceBox, qsIngredientInput, qsApplianceInput, qsToolInput)

});

searchInput.addEventListener("keyup", () => {
  let search = searchInput.value;
  console.log(search)
  console.log(searchInput, searchInput.textLength)
  console.info(arrayrecipes, " == ", arrayrecipesReset)
  if (searchInput.textLength > 2) {
    initSearch();
    searchByWord(search)
  }
  else if (searchInput.textLength < 3 && arrayrecipes != arrayrecipesReset) {
    resetSearch();
  }
})