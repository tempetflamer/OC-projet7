import { recipes, ingredientsRecipes, appliancesRecipes, toolsRecipes, recipesReset } from "../utils/initArrays.js";
import { initArrays, clearArrays, removeElement, resetRecipe } from "../utils/initArrays.js";
import { recipesFactories, getListIngredients, getListAppliances, getListTools } from "../factories/recipe.js";
import { setlistboxSize } from "../utils/resize-listbox.js";
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

    // Create the ingredients, appliances and tools list
    getListIngredients(qsIngredientList, ingredientsRecipes);
    getListAppliances(qsApplianceList, appliancesRecipes);
    getListTools(qsToolList, toolsRecipes);

    // Set the size of each listbox 
    setlistboxSize(ingredientsRecipes, qsIngredientList, qsIngredientBox, qsIngredientInput)
    setlistboxSize(toolsRecipes, qsToolList, qsToolBox, qsToolInput)
    setlistboxSize(appliancesRecipes, qsApplianceList, qsApplianceBox, qsApplianceInput)

}

export function initSearch() {
    // Delete all childrens of Recipe Section
    qsSectionRecipe.innerHTML = "";

    clearArrays();
}
export function searchByTag(recipesFilter) {

    if (qsFilterSelected.hasChildNodes()) {

        let selectedIngredients = [];
        let selectedTools = [];
        let selectedAppliances = [];

        //forEach
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

            // If the selectedIngredients are found in the recipe or selectedIngredients is empty
            if (hasIngredients === true) {

                let hasAppliances = selectedAppliances.every(el => {
                    return ((el) == ((recipe.appliance).toLowerCase()));
                });

                // If the selectedAppliances are found in the recipe or selectedAppliances is empty
                if (hasAppliances === true) {

                    let hasTools = selectedTools.every(el => {
                        return recipe.ustensils.some((ustensil) => {
                            return ((el) == ((ustensil).toLowerCase()));
                        });
                    });


                    if (hasTools === true) {
                        if (hasIngredients && hasAppliances && hasTools) {
                            let initArray = initArrays(recipe);
                            initArray.initArrayRecipe();
                        }

                    }

                }

            }

        });

        displayRecipes();
        updateFilterByTag()
    }
    else {
        resetSearch();
    }
}

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

export function resetSearch() {
    initSearch();
    resetRecipe();
    displayRecipes();
    updateFilterByTag()

}