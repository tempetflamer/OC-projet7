import { arrayrecipes, arrayIngredients, arrayAppliances, arrayTools, arrayrecipesReset } from "../utils/initArrays.js";
import { initArrays, clearArrays, removeElement } from "../utils/initArrays.js";
import { recipesFactories, getListIngredients, getListAppliances, getListTools } from "../factories/recipe.js";
import { setlistboxSize } from "../utils/resize-listbox.js";


const qsIngredientSelected = document.querySelector(".filterselected");
const qsIngredientList = document.querySelector(".listbox__container__ingredients__list");
const qsIngredientBox = document.querySelector(".listbox__container__ingredients");
const qsApplianceList = document.querySelector(".listbox__container__appliances__list");
const qsApplianceBox = document.querySelector(".listbox__container__appliances");
const qsToolList = document.querySelector(".listbox__container__tools__list");
const qsToolBox = document.querySelector(".listbox__container__tools");
const qsSectionRecipe = document.querySelector('.recipes');

export function searchByTag() {
    if (qsIngredientSelected.hasChildNodes()) {
        // Delete all childrens of Recipe Section
        while (qsSectionRecipe.firstChild) {
            qsSectionRecipe.removeChild(qsSectionRecipe.lastChild);
        }

        let arraysFilter;
        arraysFilter = arrayrecipesReset;
        let childrens = qsIngredientSelected.childNodes;
        let children;
        let type;
        for (let i = 0; i < childrens.length; i++) {
            children = childrens[i].children[0].textContent
            if (childrens[i].classList.contains("type--ingredient")) { type = "ingredient" }
            if (childrens[i].classList.contains("type--appliance")) { type = "appliance" }
            if (childrens[i].classList.contains("type--tool")) { type = "tool" }
            clearArrays();
            arraysFilter = updateRecipesByTag(children, type, arraysFilter)
        }
        createRecipe(arraysFilter);
        updateFilterByTag(type)
    }
}

export function searchByWord() {

}

export function updateRecipesByTag(el, type, arraysFilter) {e

    arraysFilter.forEach((recipe) => {
        if (((recipe.name).toLowerCase()).includes(el.toLowerCase()) || ((recipe.description).toLowerCase()).includes(el.toLowerCase())) {
            let initArray = initArrays(recipe);
            initArray.initArrayRecipe();
        }
        else {
            if (type == "ingredient") {
                recipe.ingredients.forEach((ingredient) => {
                    if (((ingredient.ingredient).toLowerCase()).includes(el.toLowerCase())) {
                        let initArray = initArrays(recipe);
                        initArray.initArrayRecipe();
                    }
                })
            }

            if (type == "appliance") {
                if (((recipe.appliance).toLowerCase()).includes(el.toLowerCase())) {
                    let initArray = initArrays(recipe);
                    initArray.initArrayRecipe();
                }
            }

            if (type == "tool") {
                recipe.ustensils.forEach((ustensil) => {
                    if (((ustensil).toLowerCase()).includes(el.toLowerCase())) {
                        let initArray = initArrays(recipe);
                        initArray.initArrayRecipe();
                    }
                })
            }
        }
    })
    arraysFilter = arrayrecipes;
    return arraysFilter;
}

function createRecipe(arraysFilter) {
    const qsSectionRecipe = document.querySelector(".recipes");
    arrayrecipes.forEach((recipe) => {
            const recipesModel = recipesFactories(recipe);
            const recipeCardDOM = recipesModel.getRecipeCard();
            qsSectionRecipe.appendChild(recipeCardDOM);
    })
}

function updateFilterByTag() {
    const qsSectionRecipe = document.querySelector(".recipes");

    // Delete Lists Filters
    while (qsIngredientList.firstChild) {
        qsIngredientList.removeChild(qsIngredientList.lastChild);
    }
    while (qsApplianceList.firstChild) {
        qsApplianceList.removeChild(qsApplianceList.lastChild);
    }
    while (qsToolList.firstChild) {
        qsToolList.removeChild(qsToolList.lastChild);
    }

    arrayrecipes.forEach((recipe) => {
        const initArray = initArrays(recipe);
        initArray.initArrayRecipe();
        initArray.initArrayIngredient();
        initArray.initArrayAppliance();
        initArray.initArrayTool();
    });
    
    // Faire un script de recherche directement dans le tableau
    let filtersSelected = qsIngredientSelected.childNodes;
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

    // Contrairement à la fonction juste au dessus, celle-ci, elle supprime les élément selectionné dans le html, celle du dessus le fait directement dans le tableau
    /*     let filtersSelected = qsIngredientSelected.childNodes;
        let filterSelected;
        let filters = qsIngredientList.childNodes;
        let filter;
        let type;
        for (let i = 0; i < filtersSelected.length; i++) {
            filterSelected = filtersSelected[i].children[0].textContent
            if (filtersSelected[i].classList.contains("type--ingredient")) {
                filters = qsIngredientList.childNodes;
                for (let j = 0; i < filters.length; j++) {
                    filter = filters[i].textContent
                    if (filter.toLowerCase() == filterSelected.toLowerCase()) {
                        filters[i].remove()
                    }
                }
            }
            if (filtersSelected[i].classList.contains("type--appliance")) {
                filters = qsApplianceList.childNodes;
                for (let j = 0; i < filters.length; j++) {
                    filter = filters[i].textContent
                    if (filter.toLowerCase() == filterSelected.toLowerCase()) {
                        filters[i].remove()
                    }
                }
            }
            if (filtersSelected[i].classList.contains("type--tool")) {
                filters = qsToolList.childNodes;
                for (let j = 0; i < filters.length; j++) {
                    filter = filters[i].textContent
                    if (filter.toLowerCase() == filterSelected.toLowerCase()) {
                        filters[i].remove()
                    }
                }
            }
        } */


    console.log("arrayIngredients 2 : " + arrayIngredients.length);


    //sortArrays();

    setlistboxSize(arrayIngredients, qsIngredientList, qsIngredientBox)
    setlistboxSize(arrayTools, qsToolList, qsToolBox)
    setlistboxSize(arrayAppliances, qsApplianceList, qsApplianceBox)

    // qsIngredientBox.classList.add("box--off");
    // qsApplianceBox.classList.add("box--off");
    // qsToolBox.classList.add("box--off");

    //renomer ce get ou les autres éléments qui n'en nont pas avec set, create etc
    const createIngredientList = getListIngredients(qsIngredientList, arrayIngredients);
    const createAppliancetList = getListAppliances(qsApplianceList, arrayAppliances);
    const createTooltList = getListTools(qsToolList, arrayTools);


}


