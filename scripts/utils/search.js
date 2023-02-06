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
    recipes.forEach((recipe) => {
        const initArray = initArrays(recipe);
        initArray.initArrayIngredient();
        initArray.initArrayAppliance();
        initArray.initArrayTool();
    });

    // remove selected element from list of ingredient, tool or appliance
    let filtersSelected = qsFilterSelected.childNodes;
    let filterSelected;
    filtersSelected.forEach(el => {
        filterSelected = el.children[0].textContent
        if (el.classList.contains("type--ingredient")) {
            removeElement("ingredient", filterSelected)
        }
        if (el.classList.contains("type--appliance")) {
            removeElement("appliance", filterSelected)
        }
        if (el.classList.contains("type--tool")) {
            removeElement("tool", filterSelected)
        }
    });

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
        childrens.forEach(el => {
            children = childrens[i].children[0].textContent
            children = children.toLowerCase()
            if (childrens[i].classList.contains("type--ingredient")) { selectedIngredients.push(children); }
            if (childrens[i].classList.contains("type--appliance")) { selectedAppliances.push(children); }
            if (childrens[i].classList.contains("type--tool")) { selectedTools.push(children); }
            i++;
        });

        recipesFilter.forEach((recipe) => {
            let hasIngredients = selectedIngredients.every(el => {

                return recipe.ingredients.some((ingredient) => {
                    return ((el) == ((ingredient.ingredient).toLowerCase()));
                });
            });

            if (!hasIngredients) { return }

            let hasAppliances = selectedAppliances.every(el => {
                return ((el) == ((recipe.appliance).toLowerCase()));
            });

            if (!hasAppliances) { return }

            let hasTools = selectedTools.every(el => {
                return recipe.ustensils.some((ustensil) => {
                    return ((el) == ((ustensil).toLowerCase()));
                });
            });

            if (!hasTools) { return }
            
            if (hasIngredients && hasAppliances && hasTools) {
                let initArray = initArrays(recipe);
                initArray.initArrayRecipe();
            }

        });

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
 * @param {String} el - searchbar input value
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

    recipesFilter.forEach((recipe) => {
        if ((normalize(recipe.name)).includes(el) || (normalize(recipe.description)).includes(el)) {
            let initArray = initArrays(recipe);
            initArray.initArrayRecipe();
        }
        else {
            recipe.ingredients.forEach((ingredient) => {
                if ((normalize(ingredient.ingredient)).includes(el)) {
                    let initArray = initArrays(recipe);
                    initArray.initArrayRecipe();
                }
            })
        }
    })
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