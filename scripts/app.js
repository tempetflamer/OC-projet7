import { dataFetch } from "./utils/dataReader.js";
import { recipesFactories, getListIngredients, getListAppliances, getListTools } from "./factories/recipe.js";
import { initArrays, initResetArrays, sortArrays } from "./utils/initArrays.js";
import { recipes, recipesReset, ingredientsRecipes, appliancesRecipes, toolsRecipes } from "./utils/initArrays.js";
import { setlistboxSize, hideListbox, displayListbox, searchListbox } from "./utils/listbox.js";
import { searchByWord, initSearch, resetSearch, searchByTag } from "./utils/search.js";

// DOM Elements
const searchInput = document.querySelector(".recherche__container input");
const qsFilterSelected = document.querySelector(".filterselected");

const qsIngredientBox = document.querySelector(".listbox__container__ingredients");
const qsIngredientTitle = document.querySelector(".listbox__container__ingredients__title");
const qsIngredientInput = document.querySelector(".listbox__container__ingredients__input");
const qsIngredientSwap = document.querySelector(".listbox__container__ingredients--swap");
const qsIngredientList = document.querySelector(".listbox__container__ingredients__list");

const qsApplianceBox = document.querySelector(".listbox__container__appliances");
const qsApplianceTitle = document.querySelector(".listbox__container__appliances__title");
const qsApplianceInput = document.querySelector(".listbox__container__appliances__input");
const qsApplianceSwap = document.querySelector(".listbox__container__appliances--swap");
const qsApplianceList = document.querySelector(".listbox__container__appliances__list");

const qsToolBox = document.querySelector(".listbox__container__tools");
const qsToolTitle = document.querySelector(".listbox__container__tools__title");
const qsToolInput = document.querySelector(".listbox__container__tools__input");
const qsToolSwap = document.querySelector(".listbox__container__tools--swap");
const qsToolList = document.querySelector(".listbox__container__tools__list");

const qsCloseListIngredient = document.querySelector(".listbox__container__ingredients--swap > div >.fa-chevron-up");
const qsOpenListIngredient = document.querySelector(".listbox__container__ingredients--swap > div > .fa-chevron-down");
const qsCloseListTool = document.querySelector(".listbox__container__tools--swap > div > .fa-chevron-up");
const qsOpenListTool = document.querySelector(".listbox__container__tools--swap > div > .fa-chevron-down");
const qsCloseListAppliance = document.querySelector(".listbox__container__appliances--swap > div > .fa-chevron-up");
const qsOpenListAppliance = document.querySelector(".listbox__container__appliances--swap > div > .fa-chevron-down");

/**
 * Retrieve data in JSON file
 * Create all arrays and display recipes
 * Set the size of each listbox 
 * Init the box containing the listbox at closed (listbox not displayed)
 * Create the ingredients, appliances and tools list
 */
async function init() {
  const data = await dataFetch();
  const recipesSection = document.querySelector(".recipes");

  // Create arrays and displays recipes
  data.recipes.forEach((recipe) => {
    const recipesModel = recipesFactories(recipe);
    const recipeCardDOM = recipesModel.getRecipeCard();
    recipesSection.appendChild(recipeCardDOM);

    const initArray = initArrays(recipe);
    initArray.initArrayRecipe();
    initArray.initArrayIngredient();
    initArray.initArrayAppliance();
    initArray.initArrayTool();

  });

  initResetArrays();
  sortArrays();

  // Set the size of each listbox 
  setlistboxSize(ingredientsRecipes, qsIngredientList, qsIngredientBox, qsIngredientInput)
  setlistboxSize(toolsRecipes, qsToolList, qsToolBox, qsToolInput)
  setlistboxSize(appliancesRecipes, qsApplianceList, qsApplianceBox, qsApplianceInput)

  // At init the box at closed
  qsIngredientBox.classList.add("box--off");
  qsApplianceBox.classList.add("box--off");
  qsToolBox.classList.add("box--off");

  // Create the ingredients, appliances and tools list
  getListIngredients(qsIngredientList, ingredientsRecipes);
  getListAppliances(qsApplianceList, appliancesRecipes);
  getListTools(qsToolList, toolsRecipes);
}

init();


// Search in listbox the input keywords in listbox searchbar
qsIngredientInput.addEventListener("keyup", (e) => { searchListbox(e, "ingredients"); });
qsApplianceInput.addEventListener("keyup", (e) => { searchListbox(e, "appliances"); });
qsToolInput.addEventListener("keyup", (e) => { searchListbox(e, "tools"); });

// Event that hides the open listbox when the user clicks outside the listbox or on the button to close the listbox
document.addEventListener("click", (e) => {

  // Ingredient listbox
  if (qsIngredientBox.classList.contains("box--on")) {
    if (e.target.classList.contains("listbox__container__ingredients") || e.target.classList.contains("listbox__container__ingredients__title") ||
      e.target.classList.contains("listbox__container__ingredients--swap") || e.target.classList.contains("listbox__container__ingredients__title") ||
      e.target.classList.contains("fa-chevron-down") || e.target.classList.contains("listbox__container__ingredients__input") ||
      e.target.classList.contains("listbox__container__ingredients__list") || e.target.nodeName == "LI") {
      hideListbox(qsApplianceTitle, qsApplianceInput, qsApplianceList, qsApplianceBox, qsApplianceSwap, qsOpenListAppliance, qsCloseListAppliance)
      hideListbox(qsToolTitle, qsToolInput, qsToolList, qsToolBox, qsToolSwap, qsOpenListTool, qsCloseListTool)
    } else {
      hideListbox(qsIngredientTitle, qsIngredientInput, qsIngredientList, qsIngredientBox, qsIngredientSwap, qsOpenListIngredient, qsCloseListIngredient)
      searchInput.textLength > 2 ? (initSearch(), searchByWord(searchInput.value)) : (initSearch(), searchByTag(recipesReset));
    }
  }

  // Appliance listbox
  if (qsApplianceBox.classList.contains("box--on")) {
    if (e.target.classList.contains("listbox__container__appliances") || e.target.classList.contains("listbox__container__appliances__title") ||
      e.target.classList.contains("listbox__container__appliances--swap") || e.target.classList.contains("listbox__container__appliances__title") ||
      e.target.classList.contains("fa-chevron-down") || e.target.classList.contains("listbox__container__appliances__input") ||
      e.target.classList.contains("listbox__container__appliances__list") || e.target.nodeName == "LI") {
      hideListbox(qsIngredientTitle, qsIngredientInput, qsIngredientList, qsIngredientBox, qsIngredientSwap, qsOpenListIngredient, qsCloseListIngredient)
      hideListbox(qsToolTitle, qsToolInput, qsToolList, qsToolBox, qsToolSwap, qsOpenListTool, qsCloseListTool)
    } else {
      hideListbox(qsApplianceTitle, qsApplianceInput, qsApplianceList, qsApplianceBox, qsApplianceSwap, qsOpenListAppliance, qsCloseListAppliance)
      searchInput.textLength > 2 ? (initSearch(), searchByWord(searchInput.value)) : (initSearch(), searchByTag(recipesReset));
    }
  }

  // Tool Listbox
  if (qsToolBox.classList.contains("box--on")) {

    if (e.target.classList.contains("listbox__container__tools") || e.target.classList.contains("listbox__container__tools__title") ||
      e.target.classList.contains("listbox__container__tools--swap") || e.target.classList.contains("listbox__container__tools__title") ||
      e.target.classList.contains("fa-chevron-down") || e.target.classList.contains("listbox__container__tools__input") ||
      e.target.classList.contains("listbox__container__tools__list") || e.target.nodeName == "LI") {
    } else {
      hideListbox(qsToolTitle, qsToolInput, qsToolList, qsToolBox, qsToolSwap, qsOpenListTool, qsCloseListTool)
      searchInput.textLength > 2 ? (initSearch(), searchByWord(searchInput.value)) : (initSearch(), searchByTag(recipesReset));
    }
  }
});

// Events that display the listbox when the user clicks on the listbox
qsIngredientBox.addEventListener("click", function (e) {
  if (qsIngredientInput.classList.contains("hidden")) {
    displayListbox(qsIngredientTitle, qsIngredientInput, qsIngredientList, qsIngredientBox, qsIngredientSwap, qsOpenListIngredient, qsCloseListIngredient)
    qsIngredientBox.classList.remove("--ingredients-off");
    qsCloseListIngredient.classList.add("--ingredients-on");
  }
});

qsToolBox.addEventListener("click", function (e) {
  if (qsToolInput.classList.contains("hidden")) {
    displayListbox(qsToolTitle, qsToolInput, qsToolList, qsToolBox, qsToolSwap, qsOpenListTool, qsCloseListTool)
    qsToolBox.classList.remove("--tools-off");
    qsCloseListTool.classList.add("--tools-on");
  }
});

qsApplianceBox.addEventListener("click", function (e) {
  if (qsApplianceInput.classList.contains("hidden")) {
    displayListbox(qsApplianceTitle, qsApplianceInput, qsApplianceList, qsApplianceBox, qsApplianceSwap, qsOpenListAppliance, qsCloseListAppliance)
    qsApplianceBox.classList.remove("--appliances-off");
    qsCloseListAppliance.classList.add("--appliances-on");
  }
});


// Event that resizes the listboxes according to the change of the window size
window.addEventListener("resize", (e) => {

  setlistboxSize(ingredientsRecipes, qsIngredientList, qsIngredientBox, qsIngredientInput)
  setlistboxSize(toolsRecipes, qsToolList, qsToolBox, qsToolInput)
  setlistboxSize(appliancesRecipes, qsApplianceList, qsApplianceBox, qsApplianceInput)

});

// When input in searchbar, search for input keywords in recipes
searchInput.addEventListener("keyup", () => {
  let search = searchInput.value;
  if (searchInput.textLength > 2) {
    initSearch();
    searchByWord(search)
  }
  else if (searchInput.textLength < 3 && qsFilterSelected.hasChildNodes()) {
    initSearch();
    searchByTag(recipesReset);
  }
  else if (searchInput.textLength < 3 && recipes != recipesReset) {
    resetSearch();
  }
})