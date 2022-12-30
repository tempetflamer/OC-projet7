let arrayrecipes = [];
let arrayIngredients = [];
let arrayAppliances = [];
let arrayTools = [];

export function initArrays(data) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;
    
    function initArrayRecipe(){
        arrayrecipes.push();
    }
    
    function initArrayIngredient() {
        ingredients.forEach((el) => {
            console.log(el);
            console.log(el.ingredient);
            if (arrayIngredients.indexOf(el.ingredient) === -1) {
                arrayIngredients.push(el.ingredient);

               }
               else {
               }
        });
        console.log("arrayIngredients : " + arrayIngredients.toString());
        console.log("arrayIngredients : " + arrayIngredients.length);
    }
    
    function initArrayAppliance() {
        arrayAppliances.push();
    }
    
    function initArrayTool() {
        arrayTools.push();
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

// exports tab
export {arrayrecipes, arrayIngredients, arrayAppliances, arrayTools};
//exempel export {department, tasks};