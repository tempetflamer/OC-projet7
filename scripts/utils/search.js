import { arrayrecipes, arrayIngredients, arrayAppliances, arrayTools, arrayrecipesReset } from "../utils/initArrays.js";
import { initArrays, clearArrays, removeElement, resetRecipe } from "../utils/initArrays.js";
import { recipesFactories, getListIngredients, getListAppliances, getListTools } from "../factories/recipe.js";
import { setlistboxSize } from "../utils/resize-listbox.js";

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

    arrayrecipes.forEach((recipe) => {
        const initArray = initArrays(recipe);
        initArray.initArrayIngredient();
        initArray.initArrayAppliance();
        initArray.initArrayTool();
    });

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
        childrens.forEach(el => {
            children = childrens[i].children[0].textContent
            children = children.toLowerCase()
            if (childrens[i].classList.contains("type--ingredient")) { selectedIngredients.push(children); }
            if (childrens[i].classList.contains("type--appliance")) { selectedAppliances.push(children); }
            if (childrens[i].classList.contains("type--tool")) { selectedTools.push(children); }
            i++;
        });

        arraysFilter.forEach((recipe) => {
            let findIngredient = selectedIngredients.every(el => {
                // if((((recipe.name).toLowerCase()).includes((el)) || ((recipe.description).toLowerCase()).includes(el))) {
                //     return true;
                // }
                return recipe.ingredients.some((ingredient) => {
                    return ((el) == ((ingredient.ingredient).toLowerCase()));
                });
            });
            console.log("findIngredient : " + findIngredient)

            // If the selectedIngredients are found in the recipe or selectedIngredients is empty
            if (findIngredient === true) {

                let findAppliance = selectedAppliances.every(el => {
                    return ((el) == ((recipe.appliance).toLowerCase()));
                });
                console.log("findAppliance : " + findAppliance)

                // If the selectedAppliances are found in the recipe or selectedAppliances is empty
                if (findAppliance === true) {

                    let findTools = selectedTools.every(el => {
                        return recipe.ustensils.some((ustensil) => {
                            return ((el) == ((ustensil).toLowerCase()));
                        });
                    });

                    console.log("findTools : " + findTools + recipe.name)

                    if (findTools === true) {
                        console.log(findIngredient, findAppliance, findTools)
                        if (findIngredient && findAppliance && findTools) {
                            let initArray = initArrays(recipe);
                            initArray.initArrayRecipe();
                        }

                    }

                }

            }

        });

        createRecipe(arraysFilter);
        updateFilterByTag()
    }
    else {
        resetSearch();
    }
}

export function searchByWord(el) {

    let arraysFilter;
    arraysFilter = arrayrecipesReset;
    arraysFilter = updateRecipesByWord(el, arraysFilter)

    if (qsFilterSelected.hasChildNodes()) {
        console.log("arrayFilter apres seachWord : " + arraysFilter)
        clearArrays();
        searchByTag(arraysFilter)
    }
    else {
        createRecipe(arraysFilter);
        updateFilterByTag()

    }
}

export function updateRecipesByWord(el, arraysFilter) {

    arraysFilter.forEach((recipe) => {
        if (((recipe.name).toLowerCase()).includes(el.toLowerCase()) || ((recipe.description).toLowerCase()).includes(el.toLowerCase())) {
            let initArray = initArrays(recipe);
            initArray.initArrayRecipe();
        }
        else {
            recipe.ingredients.forEach((ingredient) => {
                if (((ingredient.ingredient).toLowerCase()).includes(el.toLowerCase())) {
                    let initArray = initArrays(recipe);
                    initArray.initArrayRecipe();
                }
            })
        }
    })
    arraysFilter = arrayrecipes;
    return arraysFilter;
}

export function resetSearch() {
    initSearch();
    resetRecipe();
    createRecipe(arrayrecipes);
    updateFilterByTag()

}