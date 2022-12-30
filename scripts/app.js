import { dataFetch } from "./utils/dataReader.js";
import { recipesFactories, getListIngredients } from "./factories/recipe.js";
import { initArrays, sortArrays } from "./utils/initArrays.js";
import {arrayrecipes, arrayIngredients, arrayAppliances, arrayTools} from "./utils/initArrays.js"

const searchInput = document.querySelector('.recherche__container input');

const qsIngredientBox = document.querySelector('.listbox__container__ingredients');
const qsIngredientTitle = document.querySelector('.listbox__container__ingredients__title');
const qsIngredientInput = document.querySelector('.listbox__container__ingredients__input');
const qsIngredientSwap = document.querySelector('.listbox__container__ingredients--swap');
const qsIngredientList = document.querySelector('.listbox__container__ingredients__list');

const qsApplianceBox = document.querySelector('.listbox__container__devices'); // rename devices by Appliance
const qsToolBox = document.querySelector('.listbox__container__tools');

const searchHiddenElements = document.querySelectorAll('body');
console.log(searchInput);

// Animation Input
searchInput.addEventListener('input', function (e) {

    if (e.target.value !== "") {
        e.target.parentNode.classList.add('active-input');
    } else if (e.target.value === "") {
        e.target.parentNode.classList.remove('active-input');
    }

})

let hiddenElement = document.querySelectorAll('.fa-chevron-up');
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

    //renomer ce get ou les autres éléments qui n'en nont pas avec set, create etc
    //const recipesModel = recipesFactories(recipe); //deja utilsier plus haut a vori plus atrd pour aps faire de doublon
    const createIngredientList = getListIngredients(qsIngredientList, arrayIngredients);
    //qsIngredientList

}

init();

qsIngredientBox.addEventListener('click', function (e) {

    qsIngredientTitle.classList.toggle("hidden");
    qsIngredientInput.classList.toggle("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
    qsIngredientList.classList.toggle("hidden");
    qsIngredientInput.focus();
    qsIngredientBox.classList.toggle("box--on")
    qsIngredientSwap.classList.toggle("swap--on")

})