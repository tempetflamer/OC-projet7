// Arrays
let recipes = [];
let recipesReset = [];
let ingredientsRecipes = [];
let appliancesRecipes = [];
let toolsRecipes = [];

/**
 * Factories, init each arrays for the given recipe
 * @param {*} data - recipe
 * @returns { initArrayRecipe, initArrayIngredient, initArrayAppliance, initArrayTool } - function to init each arrays
 */
export function initArrays(data) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;
    let value;
    let values;

    function initArrayRecipe() {
        recipes.push(data);
    }

    function initArrayIngredient() {
        ingredients.forEach((el) => {
            value = el.ingredient
            value = value.toLowerCase();
            value = value.charAt(0).toUpperCase() + value.slice(1)
            values = value + "s";

            if (!(ingredientsRecipes.indexOf(value) === -1) || !(ingredientsRecipes.indexOf((values)) === -1) || !(ingredientsRecipes.indexOf((value.slice(0, -1))) === -1)) {
                return
            }
            else {
                ingredientsRecipes.push(value);
            }
        });
    }

    function initArrayAppliance() {
        value = appliance
        value = value.toLowerCase();
        value = value.charAt(0).toUpperCase() + value.slice(1)
        if (!(appliancesRecipes.indexOf(value) === -1) || !(appliancesRecipes.indexOf((value + "s")) === -1) || !(appliancesRecipes.indexOf((value.slice(0, -1))) === -1)) {
            return
        }
        else {
            appliancesRecipes.push(appliance);
        }
    }

    function initArrayTool() {
        ustensils.forEach((el) => {
            value = el;
            value = value.toLowerCase();
            value = value.charAt(0).toUpperCase() + value.slice(1);
            if (!(toolsRecipes.indexOf(value) === -1) || !(toolsRecipes.indexOf((value + "s")) === -1) || !(toolsRecipes.indexOf((value.slice(0, -1))) === -1)) {
                return
            }
            else {
                toolsRecipes.push(value);
            }
        })
    }

    return { initArrayRecipe, initArrayIngredient, initArrayAppliance, initArrayTool }
}

// sort arrays by name
export function sortArrays() {
    ingredientsRecipes = ingredientsRecipes.sort(function (a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });
}

export function initResetArrays() {
    recipesReset = recipes;
}

export function clearArrays() {
    recipes = []
    ingredientsRecipes = [];
    toolsRecipes = [];
    appliancesRecipes = [];
}
/**
 * When an element is selected in the ingredient, appliance or tool list, he is removred from the list
 * @param {string} type - which list
 * @param {string} name - name of selected element
 */
export function removeElement(type, name) {
    if (type == "ingredient") {
        ingredientsRecipes = ingredientsRecipes.filter((ingredient) => ingredient !== name)
    }
    else if (type == "appliance") {
        appliancesRecipes = appliancesRecipes.filter((appliance) => appliance !== name)
    }
    else if (type == "tool") {
        toolsRecipes = toolsRecipes.filter((tool) => tool !== name)
    }

}

// reset the recipe array to start a new search
export function resetRecipe() {
    recipes = recipesReset;
}


// exports arrays
export { recipes, recipesReset, ingredientsRecipes, appliancesRecipes, toolsRecipes };
