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
const qsIngredientInput = document.querySelector(".listbox__container__ingredients__input");
const qsApplianceInput = document.querySelector(".listbox__container__appliances__input");
const qsToolInput = document.querySelector(".listbox__container__tools__input");

export function searchByTag() {
    if (qsIngredientSelected.hasChildNodes()) { //theoriquement cette fonction n'est pas lancé si on ne clique pas sur au moins un
        // Delete all childrens of Recipe Section

        let arraysFilter;
        arraysFilter = arrayrecipesReset;
        console.log(JSON.stringify(arraysFilter))
        let childrens = qsIngredientSelected.childNodes;
        let children;
        let type;
        let i = 0;

        qsSectionRecipe.innerHTML = "";

        childrens.forEach(el => {
            children = childrens[i].children[0].textContent
            if (childrens[i].classList.contains("type--ingredient")) { type = "ingredient" }
            if (childrens[i].classList.contains("type--appliance")) { type = "appliance" }
            if (childrens[i].classList.contains("type--tool")) { type = "tool" }
            clearArrays();
            arraysFilter = updateRecipesByTag(children, type, arraysFilter)
            i++;
        });

        createRecipe(arraysFilter);
        updateFilterByTag(type)
    }
}

export function searchByWord() {

}

export function updateRecipesByTag(el, type, arraysFilter) {

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



    // qsIngredientBox.classList.add("box--off");
    // qsApplianceBox.classList.add("box--off");
    // qsToolBox.classList.add("box--off");

    //renomer ce get ou les autres éléments qui n'en nont pas avec set, create etc
    getListIngredients(qsIngredientList, arrayIngredients);
    getListAppliances(qsApplianceList, arrayAppliances);
    getListTools(qsToolList, arrayTools);

    setlistboxSize(arrayIngredients, qsIngredientList, qsIngredientBox, qsIngredientInput, qsApplianceInput, qsToolInput)
    setlistboxSize(arrayTools, qsToolList, qsToolBox, qsIngredientInput, qsApplianceInput, qsToolInput)
    setlistboxSize(arrayAppliances, qsApplianceList, qsApplianceBox, qsIngredientInput, qsApplianceInput, qsToolInput)

}


export function searchByTag2() {
    if (qsIngredientSelected.hasChildNodes()) {
        // Delete all childrens of Recipe Section
        while (qsSectionRecipe.firstChild) {
            qsSectionRecipe.removeChild(qsSectionRecipe.lastChild);
        }

        let selectedIngredients = [];
        let selectedTools = [];
        let selectedAppliances = [];

        //forEach
        let arraysFilter;
        arraysFilter = arrayrecipesReset;
        let childrens = qsIngredientSelected.childNodes;
        let children;
        let type;
        for (let i = 0; i < childrens.length; i++) {
            children = childrens[i].children[0].textContent
            children = children.toLowerCase()
            if (childrens[i].classList.contains("type--ingredient")) { selectedIngredients.push(children); }
            if (childrens[i].classList.contains("type--appliance")) { selectedAppliances.push(children); }
            if (childrens[i].classList.contains("type--tool")) { selectedTools.push(children); }
        }

        clearArrays();
        arraysFilter.forEach((recipe) => {
            console.log("nouvelle entrée recipe")
            let oldValue = "";
            let newValue = "";
            let bool = true;
            let pass = false;
            let success = true;
            let i = 0;

            // La boucle repart toujours à 0 // make a every value, it's also an array element // else i can make an incrementation i et quand i == lenght je push dans le tableau
            // selectedIngredients.forEach(el => {
            //     console.log("nouvelle entrée selected ingrédient")
            //     if ((((recipe.name).toLowerCase()).includes((el)) || ((recipe.description).toLowerCase()).includes(el)) && bool === true) {
            //         i++;
            //         pass = true;
            //         oldValue = newValue;
            //         newValue = recipe;
            //         console.log("oldValue : ", oldValue, "newvalue : ", newValue)
            //         console.log("i : " + i)
            //         if ((oldValue === newValue || (oldValue === "" && newValue === ""))) {
            //             bool = true;
            //         }
            //         else {
            //             console.log("value false")
            //             bool = false;
            //         }

            //     }

            // });

            // console.log(bool)

            //test every
            let x = 1;
            success = false;
            selectedIngredients.every(el => {
                console.log("entrée every", recipe.name, el)
                if ((((recipe.name).toLowerCase()).includes((el)) || ((recipe.description).toLowerCase()).includes(el))) {
                    console.log("entrée passé every", recipe.name, el)
                    if (x == selectedIngredients.length) {
                        console.log("arrivée")
                        let initArray = initArrays(recipe);
                        initArray.initArrayRecipe();
                        success = true;
                        return true;
                    }
                    else {
                        x++;
                        console.log("incrémentation de x : " + x)
                        return true;
                    }
                }
                else { return false; }
            });

            console.warn("success : " + success)

            // Pour raccourcir, il faudrais refaire un tableau avec une colonne validée pour les valeurs par exemple, et on affiche seulment si elles sont toutes validées 
            if (success === false) {
                pass = true;
                selectedIngredients.every(el => {
                    recipe.ingredients.every((ingredient) => {
                        if (((el) == ((ingredient.ingredient).toLowerCase()))) {
                            pass = true;
                            return false;
                        }
                        else {
                            pass = false;
                            return true;
                        }
                    })
                    if (pass === true) { return true;}
                    if (pass === false) { return false;}
                })


                if (pass === true) {
                    let initArray = initArrays(recipe);
                    initArray.initArrayRecipe();
                }
            }


            console.log ("value pass : " + pass)

            // mix beetween every and foreach to try
            //  if (success === false) {
            //     let y = 1;
            //     recipe.ingredients.forEach((ingredient) => {
            //         selectedIngredients.every(el => {
            //             if (((el) == ((ingredient.ingredient).toLowerCase()))) {
            //                 pass = true;
            //                 oldValue = newValue;
            //                 newValue = recipe;
            //                 if (oldValue === newValue || (oldValue === "" && newValue !== "")) {
            //                     bool = true;
            //                 }
            //                 else {
            //                     bool = false;
            //                 }

            //             }

            //         });
            //     })
            //  }

            // console.log("true")

            // just add success to old try
            // if (success === false) {
            //     oldValue = "";
            //     newValue = "";
            //     bool = true;
            //     pass = false;
            //     recipe.ingredients.forEach((ingredient) => {
            //         selectedIngredients.forEach(el => {
            //             if (((el) == ((ingredient.ingredient).toLowerCase())) && bool === true) {
            //                 pass = true;
            //                 oldValue = newValue;
            //                 newValue = recipe;
            //                 if (oldValue === newValue || (oldValue === "" && newValue !== "")) {
            //                     bool = true;
            //                 }
            //                 else {
            //                     bool = false;
            //                 }

            //             }

            //         });
            //     })

            //     console.log("état de bool pour chaque ingrédient", bool)

            //     if (bool == true && pass == true) {
            //         let initArray = initArrays(recipe);
            //         initArray.initArrayRecipe();
            //     }

            // }

            // third try // le problème c'est include ne permet pas de rentrer dans false mdr et le false dans le 1er else ne permettra pas de faire toutes les vérifications
            /*  selectedIngredients.forEach(el => {
                 if ((((recipe.name).toLowerCase()).includes((el)) || ((recipe.description).toLowerCase()).includes(el)) && bool == true) {
                     pass = true;
                     oldValue = newValue;
                     newValue = recipe;
                     if ((oldValue == newValue || (oldValue == "" && newValue != ""))) {
                         bool = true;
                     }
                     else {
                         bool = false;
                         console.log(bool)
                         success = false;
                         return success; // peu être que si je créer une fonction de cette pute
                     }
 
                 }
                 else {
                     console.log("ceci est un test, esque al valeur de olvalue est conservé" + oldValue)
                     bool = false;
                 }
 
             });
 
             console.log("bool value : " + bool)
             console.log(success, oldValue)
             if (success == false) {
                 oldValue = "";
                 newValue = "";
                 bool = true;
                 pass = false;
                 recipe.ingredients.forEach((ingredient) => {
                     console.log("un ingredient des ingredients de la recette : " + (ingredient.ingredient).toLowerCase() + " == ingredient selectionné : " )
                     selectedIngredients.forEach(el => {
                         if (((el) == ((ingredient.ingredient).toLowerCase())) && bool == true) {
                             pass = true;
                             oldValue = newValue;
                             newValue = recipe;
                             if (oldValue == newValue || (oldValue == "" && newValue != "")) {
                                 bool = true;
                             }
                             else {
                                 bool = false;
                                 return;
                             }
         
                         }
         
                     });
                 })
             }
 
                 if (bool == true && pass == true) {
                     let initArray = initArrays(recipe);
                     initArray.initArrayRecipe();
                 } */

            oldValue = "";
            newValue = "";
            bool = true;
            pass = false;
            if (((selectedAppliances)).includes((recipe.appliance))) {
                pass = true;
                oldValue = newValue;
                newValue = recipe;
                if ((oldValue == newValue || (oldValue == "" && newValue != "")) && bool == true) {
                    bool = true;
                }
                else {
                    bool = false;
                }
            }

            if (bool == true && pass == true) {
                let initArray = initArrays(recipe);
                initArray.initArrayRecipe();
            }


            oldValue = "";
            newValue = "";
            bool = true;
            pass = false;
            recipe.ustensils.forEach((ustensil) => {
                if (((selectedTools)).includes(ustensil)) {
                    pass = true;
                    oldValue = newValue;
                    newValue = recipe;
                    if ((oldValue == newValue || (oldValue == "" && newValue != "")) && bool == true) {
                        bool = true;
                    }
                    else {
                        bool = false;
                    }
                }
            })

            if (bool == true && pass == true) {
                let initArray = initArrays(recipe);
                initArray.initArrayRecipe();
            }

            //j'ai besoin de le remettre a 0 en resortant, du coup faire qu'un seul tableau

            //}
            //arraysFilter = arrayrecipes;

        })
        //arraysFilter = arrayrecipes;
        //return arraysFilter;

        // clearArrays();
        // arraysFilter = updateRecipesByTag(children, type, arraysFilter)

        // console.log("arrayFilter : " + JSON.stringify(arraysFilter))
        // console.log("arrayRecipes : " + JSON.stringify(arrayrecipes))

        createRecipe(arraysFilter);
        updateFilterByTag(type)
    }
}