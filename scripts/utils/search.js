import { recipes, ingredientsRecipes, appliancesRecipes, toolsRecipes, recipesReset } from "../utils/initArrays.js";
import { initArrays, clearArrays, removeElement, resetRecipe, sortArrays } from "../utils/initArrays.js";
import { recipesFactories, getListIngredients, getListAppliances, getListTools } from "../factories/recipe.js";
import { setlistboxSize } from "../utils/listbox.js";
import { normalize } from "../utils/normalize.js";

// DOM Elements
const qsFilterSelected = document.querySelector(".filterselected");
const qsIngredientList = document.querySelector(".listbox__container__ingredients__list");
const qsIngredientBox = document.querySelector(".listbox__container__ingredients");
const qsApplianceList = document.querySelector(".listbox__container__appliances__list");
const qsApplianceBox = document.querySelector(".listbox__container__appliances");
const qsToolList = document.querySelector(".listbox__container__tools__list");
const qsToolBox = document.querySelector(".listbox__container__tools");
const qsSectionRecipe = document.querySelector('.recipes');
const qsIngredientInput = document.querySelector(".listbox__container__ingredients__input");
const qsApplianceInput = document.querySelector(".listbox__container__appliances__input");
const qsToolInput = document.querySelector(".listbox__container__tools__input");

/**
 * Display recipes or display a error message when no recipe
 */ 
function displayRecipes() {
    const qsSectionRecipe = document.querySelector(".recipes");
    if (recipes.length !== 0) {
        recipes.forEach((recipe) => {
            const recipesModel = recipesFactories(recipe);
            const recipeCardDOM = recipesModel.getRecipeCard();
            qsSectionRecipe.appendChild(recipeCardDOM);
        })
    }
    else {
        const error = document.createElement('p');
        error.textContent = "Aucune recette ne correspond à votre critère... \r\n";
        error.textContent += "Vous pouvez chercher « tarte aux pommes », « poisson », etc. \r\n";
        error.classList.add('recipes__norecipes')
        qsSectionRecipe.appendChild(error);
    }
}

/**
 * Update the available filters
 */
function updateFilterByTag() {
    // Delete Lists Filters
    qsIngredientList.innerHTML = "";
    qsApplianceList.innerHTML = "";
    qsToolList.innerHTML = "";

    // Update each arrays with the recipes array
    for (let i = 0; i < recipes.length; i++) {
        const initArray = initArrays(recipes[i]);
        initArray.initArrayIngredient();
        initArray.initArrayAppliance();
        initArray.initArrayTool();
    }

    // remove selected element from list of ingredient, tool or appliance
    let filtersSelected = qsFilterSelected.childNodes;
    let filterSelected;
    let filters = qsIngredientList.childNodes;
    for (let i = 0; i < filtersSelected.length; i++) {
        filterSelected = filtersSelected[i].children[0].textContent
        if (filtersSelected[i].classList.contains("type--ingredient")) {
            removeElement("ingredient", filterSelected)
        }
        if (filtersSelected[i].classList.contains("type--appliance")) {
            filters = qsApplianceList.childNodes;
            removeElement("appliance", filterSelected)
        }
        if (filtersSelected[i].classList.contains("type--tool")) {
            filters = qsToolList.childNodes;
            removeElement("tool", filterSelected)
        }
    }

    sortArrays();

    // Create the ingredients, appliances and tools list
    getListIngredients(qsIngredientList, ingredientsRecipes);
    getListAppliances(qsApplianceList, appliancesRecipes);
    getListTools(qsToolList, toolsRecipes);

    // Set the size of each listbox 
    setlistboxSize(ingredientsRecipes, qsIngredientList, qsIngredientBox, qsIngredientInput)
    setlistboxSize(toolsRecipes, qsToolList, qsToolBox, qsToolInput)
    setlistboxSize(appliancesRecipes, qsApplianceList, qsApplianceBox, qsApplianceInput)

}

// Cleay Arrays and displayed recipes
export function initSearch() {
    qsSectionRecipe.innerHTML = "";
    clearArrays();
}

/**
 * Search for tag matching selected tags and update the recipes array.
 * @param {Array} recipesFilter 
 */
export function searchByTag(recipesFilter) {

    if (qsFilterSelected.hasChildNodes()) {

        let selectedIngredients = [];
        let selectedTools = [];
        let selectedAppliances = [];

        let childrens = qsFilterSelected.childNodes;
        let children;
        let i = 0;
        for (let i = 0; i < childrens.length; i++) {
            children = childrens[i].children[0].textContent
            children = children.toLowerCase()
            if (childrens[i].classList.contains("type--ingredient")) { selectedIngredients.push(children); }
            if (childrens[i].classList.contains("type--appliance")) { selectedAppliances.push(children); }
            if (childrens[i].classList.contains("type--tool")) { selectedTools.push(children); }
            i++;
        }

        for (let i = 0; i < recipesFilter.length; i++) {
            let recipe = recipesFilter[i];
            let hasIngredients = true;
            let hasAppliances = true;
            let hasTools = true;

            for (let j = 0; j < selectedIngredients.length; j++) {
                let ingredient = selectedIngredients[j];
                for (let k = 0; k < recipe.ingredients.length; k++) {
                    if ((ingredient) == ((recipe.ingredients[k].ingredient).toLowerCase())) {
                        hasIngredients = true;
                        break;
                    }
                    else {
                        hasIngredients = false;
                    }
                }
                if (!hasIngredients) {
                    break;
                }
            }

            if (hasIngredients) {
                for (let j = 0; j < selectedAppliances.length; j++) {
                    if ((selectedAppliances[j]) == ((recipe.appliance).toLowerCase())) {
                        hasAppliances = true;
                        break;
                    }
                    else {
                        hasAppliances = false;
                    }
                }

                if (hasAppliances) {
                    for (let j = 0; j < selectedTools.length; j++) {
                        for (let k = 0; k < recipe.ustensils.length; k++) {
                            if ((selectedTools[j]) == ((recipe.ustensils[k]).toLowerCase())) {
                                hasTools = true;
                                break;
                            }
                            else {
                                hasTools = false;
                            }
                        }
                        if (!hasTools) {
                            break;
                        }
                    }

                    if (hasTools === true) {
                        if (hasIngredients && hasAppliances && hasTools) {
                            let initArray = initArrays(recipe);
                            initArray.initArrayRecipe();
                        }

                    }
                }
            }
        }

        displayRecipes();
        updateFilterByTag()
    }
    else {
        resetSearch();
    }
}

/**
 * Entry function
 * Start to update recipes array with updateRecipesByWord function
 * If filters selected, continue on serachByTag function
 * Else, directly update the displayed recipes and the available filters
 * @param {*} el - searchbar input value
 */
export function searchByWord(el) {

    let recipesFilter = recipesReset;
    recipesFilter = updateRecipesByWord(el, recipesFilter)

    if (qsFilterSelected.hasChildNodes()) {
        clearArrays();
        searchByTag(recipesFilter)
    }
    else {
        displayRecipes();
        updateFilterByTag()

    }
}

/**
 * Search for recipes matching the input value update the recipe array with the results
 * @param {String} el - searchbar input value
 * @param {Array} recipesFilter - tableau des recettes
 * @returns {Array} filtered recipes array
 */
export function updateRecipesByWord(el, recipesFilter) {
    el = normalize(el)

    for (let i = 0; i < recipesFilter.length; i++) {
        let recipe = recipesFilter[i]
        if ((normalize(recipe.name)).includes(el) || (normalize(recipe.description)).includes(el)) {
            let initArray = initArrays(recipe);
            initArray.initArrayRecipe();
        }
        else {
            for (let j = 0; j < recipe.ingredients.length; j++) {
                let ingredient = recipe.ingredients[j];
                if ((normalize(ingredient.ingredient)).includes(el)) {
                    let initArray = initArrays(recipe);
                    initArray.initArrayRecipe();
                }
            }
        }
    }
    recipesFilter = recipes;
    return recipesFilter;
}

/**
 * Reset arrays and displayed recipes
 * Display all recipes
 * Update available tags
 */
export function resetSearch() {
    initSearch();
    resetRecipe();
    displayRecipes();
    updateFilterByTag()

}