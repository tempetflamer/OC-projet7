let arrayrecipes = [];
let arrayrecipesReset = [];
let arrayIngredients = [];
let arrayIngredientsReset = [];
let arrayAppliances = [];
let arrayAppliancesReset = [];
let arrayTools = [];
let arrayToolsReset = [];

// Factories
export function initArrays(data) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;
    let value;
    let values;

    function initArrayRecipe() {
        arrayrecipes.push(data);
    }

    function initArrayIngredient() {
        ingredients.forEach((el) => {
            value = el.ingredient
            value = value.toLowerCase();
            value = value.charAt(0).toUpperCase() + value.slice(1)
            values = value + "s";

            // Quand on cherche pomme, on doit chercher à la fois pomme et pommes (value & value + "s"), puis, pour pommes chercher pommes et pomme (value, et value.slice(-last character))
            if (!(arrayIngredients.indexOf(value) === -1) || !(arrayIngredients.indexOf((values)) === -1) || !(arrayIngredients.indexOf((value.slice(0, -1))) === -1)) {
                return
            }
            else {
                arrayIngredients.push(value);
            }
        });
    }

    function initArrayAppliance() {
        value = appliance
        value = value.toLowerCase();
        value = value.charAt(0).toUpperCase() + value.slice(1)
        // Quand on cherche pomme, on doit chercher à la fois pomme et pommes (value & value + "s"), puis, pour pommes chercher pommes et pomme (value, et value.slice(-last character))
        if (!(arrayAppliances.indexOf(value) === -1) || !(arrayAppliances.indexOf((value + "s")) === -1) || !(arrayAppliances.indexOf((value.slice(0, -1))) === -1)) {
            return
        }
        else {
            arrayAppliances.push(appliance);
        }
    }

    function initArrayTool() {
        ustensils.forEach((el) => {
            value = el;
            value = value.toLowerCase();
            value = value.charAt(0).toUpperCase() + value.slice(1);
            // Quand on cherche pomme, on doit chercher à la fois pomme et pommes (value & value + "s"), puis, pour pommes chercher pommes et pomme (value, et value.slice(-last character))
            if (!(arrayTools.indexOf(value) === -1) || !(arrayTools.indexOf((value + "s")) === -1) || !(arrayTools.indexOf((value.slice(0, -1))) === -1)) {
                return
            }
            else {
                arrayTools.push(value);
            }
        })
    }

    return { initArrayRecipe, initArrayIngredient, initArrayAppliance, initArrayTool }
}

export function sortArrays() {
    arrayIngredients = arrayIngredients.sort(function (a, b) {
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
    arrayrecipesReset = arrayrecipes;
    arrayIngredientsReset = arrayIngredients;
    arrayAppliancesReset = arrayAppliances;
    arrayToolsReset = arrayTools;
}

export function clearArrays() {
    arrayrecipes = []
    arrayIngredients = [];
    arrayTools = [];
    arrayAppliances = [];
}

export function removeElement(type, name) {
    if (type == "ingredient") {
        arrayIngredients = arrayIngredients.filter((ingredient) => ingredient !== name)
    }
    else if (type == "appliance") {
        arrayAppliances = arrayAppliances.filter((appliance) => appliance !== name)
    }
    else if (type == "tool") {
        arrayTools = arrayTools.filter((tool) => tool !== name)
    }

}

export function resetRecipe() {
    arrayrecipes = arrayrecipesReset;
}


// exports arrays
export { arrayrecipes, arrayrecipesReset, arrayIngredients, arrayIngredientsReset, arrayAppliances, arrayAppliancesReset, arrayTools, arrayToolsReset };
