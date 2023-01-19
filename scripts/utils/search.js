import { arrayrecipes, arrayIngredients, arrayAppliances, arrayTools, arrayrecipesReset } from "../utils/initArrays.js";
import { initArrays, clearArrays, removeElement, resetRecipe } from "../utils/initArrays.js";
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
    qsIngredientList.innerHTML = "";
    qsApplianceList.innerHTML = "";
    qsToolList.innerHTML = "";

    arrayrecipes.forEach((recipe) => {
        const initArray = initArrays(recipe);
        //initArray.initArrayRecipe(); //doublon
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

    //renomer ce get ou les autres éléments qui n'en nont pas avec set, create etc
    getListIngredients(qsIngredientList, arrayIngredients);
    getListAppliances(qsApplianceList, arrayAppliances);
    getListTools(qsToolList, arrayTools);

    setlistboxSize(arrayIngredients, qsIngredientList, qsIngredientBox, qsIngredientInput, qsApplianceInput, qsToolInput)
    setlistboxSize(arrayTools, qsToolList, qsToolBox, qsIngredientInput, qsApplianceInput, qsToolInput)
    setlistboxSize(arrayAppliances, qsApplianceList, qsApplianceBox, qsIngredientInput, qsApplianceInput, qsToolInput)

}

export function initSearch() {
    // Delete all childrens of Recipe Section
    qsSectionRecipe.innerHTML = "";

    clearArrays();
}
export function searchByTag2(filter) {
    console.log("arrayfilter => filter : " + filter)
    console.log("arrayfilter => arrayrecipes : " + arrayrecipes)

    if (qsIngredientSelected.hasChildNodes()) { // techniquement il en a forcément

        let selectedIngredients = [];
        let selectedTools = [];
        let selectedAppliances = [];

        //forEach
        let arraysFilter;
        arraysFilter = filter;
        console.log("arrayfilter => filter : " + filter)
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

        arraysFilter.forEach((recipe) => {
            console.log("nouvelle entrée recipe")
            let oldValue = "";
            let newValue = "";
            let bool = true;
            let pass = false;
            let success = true;
            let i = 0;

            //test every
            let x = 1;
            //success = false;
            selectedIngredients.every(el => {
                console.log("entrée every", recipe.name, el)
                if ((((recipe.name).toLowerCase()).includes((el)) || ((recipe.description).toLowerCase()).includes(el))) {
                    console.log("entrée passé every", recipe.name, el)
                    if (x == selectedIngredients.length) {
                        console.log("arrivée")
                        // let initArray = initArrays(recipe);
                        // console.log("ajoute " + recipe + "au tableau")
                        // initArray.initArrayRecipe();
                        success = true;
                        return true;
                    }
                    else {
                        x++;
                        console.log("incrémentation de x : " + x)
                        return true;
                    }
                }
                else { success = false; return false; }
            });

            console.warn("success : " + success + " pass : " + pass)

            // Pour raccourcir, il faudrais refaire un tableau avec une colonne validée pour les valeurs par exemple, et on affiche seulment si elles sont toutes validées 
            if (success === false) {
                pass = false;
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
                    if (pass === true) { return true; }
                    if (pass === false) { return false; }
                })

                console.log("pass : ", pass)

                /* selectedAppliances.every(el => {
                    if (((el) == ((recipe.appliance).toLowerCase()))) {
                        pass = true;
                        return false;
                    }
                    else {
                        pass = false;
                        return true;
                    }
                })

                selectedTools.every(el => {
                    recipe.ustensils.every((ustensil) => {
                        if (((el) == ((ustensil).toLowerCase()))) {
                            pass = true;
                            return false;
                        }
                        else {
                            pass = false;
                            return true;
                        }
                    })
                    if (pass === true) { return true; }
                    if (pass === false) { return false; }
                }) */

                // recipe.ustensils.forEach((ustensil) => {
                //     if (((selectedTools)).includes(ustensil)) {
                //         pass = true;
                //         oldValue = newValue;
                //         newValue = recipe;
                //         if ((oldValue == newValue || (oldValue == "" && newValue != "")) && bool == true) {
                //             bool = true;
                //         }
                //         else {
                //             bool = false;
                //         }
                //     }
                // })


                /*                 if (pass === true) {
                                    let initArray = initArrays(recipe);
                                    console.log("ajoute " + recipe + "au tableau")
                                    initArray.initArrayRecipe();
                                }
                                else {
                                    console.info("ceci est un test de passage")
                                } */
            }

            // mettre passe dans la première vérifi pour se passer de cette vérification là ?
            // Si le(s) ingrédient(s) sélectionné(s) se trouvent dans la description, nom de la recette, les ingrédients de la recette ou qu'il n'y a pas d'ingrédient(s) sélectionné(s)
            if (pass === true || success === true) {
                pass = true;
                selectedAppliances.every(el => {
                    if (((el) == ((recipe.appliance).toLowerCase()))) {
                        pass = true;
                        return false;
                    }
                    else {
                        pass = false;
                        return true;
                    }
                })

                if (pass === true) {
                    selectedTools.every(el => {
                        recipe.ustensils.every((ustensil) => {
                            if (((el) == ((ustensil).toLowerCase()))) {
                                pass = true;
                                return false;
                            }
                            else {
                                pass = false;
                                return true;
                            }
                        })
                        if (pass === true) { return true; }
                        if (pass === false) { return false; }
                    })
                }

            }
            //if (pass === true || success === true) {
            if (pass === true) {
                let initArray = initArrays(recipe);
                console.log("ajoute " + recipe + "au tableau")
                initArray.initArrayRecipe();
            }
            else {
                console.info("ceci est un test de passage")
            }


            console.log("value pass : " + pass)

            // oldValue = "";
            // newValue = "";
            // bool = true;
            // pass = false;
            // if (((selectedAppliances)).includes((recipe.appliance))) {
            //     pass = true;
            //     oldValue = newValue;
            //     newValue = recipe;
            //     if ((oldValue == newValue || (oldValue == "" && newValue != "")) && bool == true) {
            //         bool = true;
            //     }
            //     else {
            //         bool = false;
            //     }
            // }

            // if (bool == true && pass == true) {
            //     let initArray = initArrays(recipe);
            //     initArray.initArrayRecipe();
            // }


            // oldValue = "";
            // newValue = "";
            // bool = true;
            // pass = false;
            // recipe.ustensils.forEach((ustensil) => {
            //     if (((selectedTools)).includes(ustensil)) {
            //         pass = true;
            //         oldValue = newValue;
            //         newValue = recipe;
            //         if ((oldValue == newValue || (oldValue == "" && newValue != "")) && bool == true) {
            //             bool = true;
            //         }
            //         else {
            //             bool = false;
            //         }
            //     }
            // })
            // console.log(bool)

            // if (bool == true && pass == true) {
            //     let initArray = initArrays(recipe);
            //     initArray.initArrayRecipe();
            // }

        })

        createRecipe(arraysFilter);
        updateFilterByTag(type)
    }
    else {
        resetSearch();
    }
}

/*
export function searchByTag2(filter) {
    console.log("arrayfilter => filter : " + filter)
    console.log("arrayfilter => arrayrecipes : " + arrayrecipes)

    if (qsIngredientSelected.hasChildNodes()) { // techniquement il en a forcément

        let selectedIngredients = [];
        let selectedTools = [];
        let selectedAppliances = [];

        //forEach
        let arraysFilter;
        arraysFilter = filter;
        console.log("arrayfilter => filter : " + filter)
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

        arraysFilter.forEach((recipe) => {
            console.log("nouvelle entrée recipe")
            let oldValue = "";
            let newValue = "";
            let bool = true;
            let pass = false;
            let success = true;
            let i = 0;

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
                        console.log("ajoute " + recipe + "au tableau")
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
                else { success = false; return false; }
            });

            console.warn("success : " + success)

            // Pour raccourcir, il faudrais refaire un tableau avec une colonne validée pour les valeurs par exemple, et on affiche seulment si elles sont toutes validées 
            if (success === false) {
                pass = false;
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
                    if (pass === true) { return true; }
                    if (pass === false) { return false; }
                })


                if (pass === true) {
                    let initArray = initArrays(recipe);
                    console.log("ajoute " + recipe + "au tableau")
                    initArray.initArrayRecipe();
                }
                else { 
                    console.info("ceci est un test de passage")
                }
            }


            console.log("value pass : " + pass)

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
            console.log(bool)

            if (bool == true && pass == true) {
                let initArray = initArrays(recipe);
                initArray.initArrayRecipe();
            }

        })

        createRecipe(arraysFilter);
        updateFilterByTag(type)
    }
    else {
        resetSearch();
    }
}
*/


export function searchByWord(el) {

    let arraysFilter;
    arraysFilter = arrayrecipesReset;
    arraysFilter = updateRecipesByWord(el, arraysFilter)
    console.log("arrayFilter apres seachWord : " + arraysFilter)
    console.log("arrayFilter => arrayRecipes apres seachWord : " + arrayrecipes)

    if (qsIngredientSelected.hasChildNodes()) {
        console.log("arrayFilter apres seachWord : " + arraysFilter)
        clearArrays();
        searchByTag2(arraysFilter)
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
    console.log(arrayrecipes)
    createRecipe(arrayrecipes);
    console.log(arrayrecipes)
    updateFilterByTag()
    console.log(arrayrecipes) // c'est ici que c'est doublé

}