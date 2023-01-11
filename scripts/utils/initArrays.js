let arrayrecipes = [];
let arrayrecipesReset = [];
let arrayIngredients = [];
let arrayIngredientsReset = [];
let arrayAppliances = [];
let arrayAppliancesReset = [];
let arrayTools = [];
let arrayToolsReset = [];

export function initArrays(data) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;
    let value;
    let values;

    function initArrayRecipe() {
        arrayrecipes.push(data);
    }

    function initArrayIngredient() {
        ingredients.forEach((el) => {
            console.log(el);
            console.log(el.ingredient);
            value = el.ingredient
            value = value.toLowerCase();
            value = value.charAt(0).toUpperCase() + value.slice(1)
            values = value + "s";
            console.log("value to lower case except first character : " + value);
            console.log("value to lower case except first characterresultat : " + arrayIngredients.indexOf((value)) === -1);
            console.log("value to lower case except first character whith s : " + values);
            console.log("value to lower case except first character whith s resultat : " + arrayIngredients.indexOf((values)) === -1);
            // Quand on cherche pomme, on doit chercher à la fois pomme et pommes (value & value + "s"), puis, pour pommes chercher pommes et pomme (value, et value.slice(-last character))
            if (!(arrayIngredients.indexOf(value) === -1) || !(arrayIngredients.indexOf((values)) === -1) || !(arrayIngredients.indexOf((value.slice(0, -1))) === -1)) {
                // if ((arrayIngredients.indexOf(el.ingredient) == !(el.ingredient).match(/(?<![aei])([ie][d])(?=[^a-zA-Z])|(?<=[ertkgwmnl])s(?=[^a-zA-Z])/gm)))
                // {console.log("elements qui match le regex : " + el.ingredient)}
                // arrayIngredients.forEach((el) => {
                //     console.log("el", el);
                //     const item = document.createElement('li');
                //     item.textContent = el;
                //     qstoolList.appendChild(item);
                //     console.log(qstoolList)
                // })
                //arrayIngredients.push(value);
                return


            }
            else {
                arrayIngredients.push(value);
            }
        });
        console.log("arrayIngredients : " + arrayIngredients.toString());
        console.log("arrayIngredients : " + arrayIngredients.length);
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
        // if (arrayAppliances.indexOf(appliance) === -1) {
        //     arrayAppliances.push(appliance);
        // }
        console.log("arrayAppareils : " + arrayAppliances.toString());
        console.log("arrayAppareils: " + arrayAppliances.length);
    }

    function initArrayTool() {
        ustensils.forEach((el) => {
            /*             console.log("boucle des tools : " + el);
                        if (arrayTools.indexOf(el) === -1) {
                            arrayTools.push(el);
                            console.log("tool pusher : " + el);
                        } */
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
        console.log("arrayTools: " + arrayTools.toString());
        console.log("arrayTools : " + arrayTools.length);
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

    console.log("arrayIngredients : " + arrayIngredients.toString());
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


// exports tab
export { arrayrecipes, arrayrecipesReset, arrayIngredients, arrayIngredientsReset, arrayAppliances, arrayAppliancesReset, arrayTools, arrayToolsReset };
//exempel export {department, tasks};