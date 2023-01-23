import { arrayrecipes, arrayIngredients, arrayAppliances, arrayTools, arrayrecipesReset } from "../utils/initArrays.js";
import { initArrays, clearArrays, removeElement, resetRecipe } from "../utils/initArrays.js";
import { recipesFactories, getListIngredients, getListAppliances, getListTools } from "../factories/recipe.js";
import { setlistboxSize } from "../utils/resize-listbox.js";
import { normalize } from "../utils/remove_accent.js";

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


function createRecipe(arraysFilter) {
    const qsSectionRecipe = document.querySelector(".recipes");
    if (arrayrecipes.length !== 0) {
        arrayrecipes.forEach((recipe) => {
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

    for (let i = 0; i < arrayrecipes.length; i++) {
        const initArray = initArrays(arrayrecipes[i]);
        initArray.initArrayIngredient();
        initArray.initArrayAppliance();
        initArray.initArrayTool();
    }

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

    //renomer ce get ou les autres éléments qui n'en nont pas avec set, create etc
    getListIngredients(qsIngredientList, arrayIngredients);
    getListAppliances(qsApplianceList, arrayAppliances);
    getListTools(qsToolList, arrayTools);

    setlistboxSize(arrayIngredients, qsIngredientList, qsIngredientBox, qsIngredientInput)
    setlistboxSize(arrayTools, qsToolList, qsToolBox, qsToolInput)
    setlistboxSize(arrayAppliances, qsApplianceList, qsApplianceBox, qsApplianceInput)

}

export function initSearch() {
    // Delete all childrens of Recipe Section
    qsSectionRecipe.innerHTML = "";

    clearArrays();
}
export function searchByTag(filter) {

    if (qsFilterSelected.hasChildNodes()) {

        let selectedIngredients = [];
        let selectedTools = [];
        let selectedAppliances = [];

        //forEach
        let arraysFilter = filter;
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

        for (let i = 0; i < arraysFilter.length; i++) {
            let recipe = arraysFilter[i];
            let findIngredient = true;
            let findAppliance = true;
            let findTools = true;

            for (let j = 0; j < selectedIngredients.length; j++) {
                let ingredient = selectedIngredients[j];
                // if((((recipe.name).toLowerCase()).includes((el)) || ((recipe.description).toLowerCase()).includes(el))) {
                //  findIngredient = true;
                //  break;
                // }
                for (let k = 0; k < recipe.ingredients.length; k++) {
                    if ((ingredient) == ((recipe.ingredients[k].ingredient).toLowerCase())) {
                        findIngredient = true;
                        break;
                    }
                    else {
                        findIngredient = false;
                    }
                }
                if (!findIngredient) {
                    break;
                }
                console.log("findIngredient : " + findIngredient)
            }
            console.log("findIngredient : " + findIngredient)

            // If the selectedIngredients are found in the recipe or selectedIngredients is empty
            if (findIngredient) {
                // Convert every to for loop
                for (let j = 0; j < selectedAppliances.length; j++) {
                    if ((selectedAppliances[j]) == ((recipe.appliance).toLowerCase())) {
                        findAppliance = true;
                        break;
                    }
                    else {
                        findAppliance = false;
                    }
                }
                console.log("findAppliance : " + findAppliance)

                if (findAppliance) {
                    // Convert every to for loop
                    for (let j = 0; j < selectedTools.length; j++) {
                        for (let k = 0; k < recipe.ustensils.length; k++) {
                            if ((selectedTools[j]) == ((recipe.ustensils[k]).toLowerCase())) {
                                findTools = true;
                                break;
                            }
                            else {
                                findTools = false;
                            }
                        }
                        if (!findIngredient) {
                            break;
                        }
                    }

                    if (findTools === true) {
                        console.log(findIngredient, findAppliance, findTools)
                        if (findIngredient && findAppliance && findTools) {
                            let initArray = initArrays(recipe);
                            initArray.initArrayRecipe();
                        }

                    }
                }
            }
        }

        createRecipe(arraysFilter);
        updateFilterByTag()
    }
    else {
        resetSearch();
    }
}

export function searchByWord(el) {

    let arraysFilter = arrayrecipesReset;
    arraysFilter = updateRecipesByWord(el, arraysFilter)

    if (qsFilterSelected.hasChildNodes()) {
        clearArrays();
        searchByTag(arraysFilter)
    }
    else {
        createRecipe(arraysFilter);
        updateFilterByTag()

    }
}

export function updateRecipesByWord(el, arraysFilter) {
    el = normalize(el)

    for (let i = 0; i < arraysFilter.length; i++) {
        let recipe = arraysFilter[i]
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
    arraysFilter = arrayrecipes;
    return arraysFilter;
}

export function resetSearch() {
    initSearch();
    resetRecipe();
    createRecipe(arrayrecipes);
    updateFilterByTag()

}