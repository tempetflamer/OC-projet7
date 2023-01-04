import { dataFetch } from "./utils/dataReader.js";
import { recipesFactories, getListIngredients, getListAppliances, getListTools } from "./factories/recipe.js";
import { initArrays, sortArrays } from "./utils/initArrays.js";
import { arrayrecipes, arrayIngredients, arrayAppliances, arrayTools } from "./utils/initArrays.js"

const searchInput = document.querySelector('.recherche__container input');
const qsBody = document.querySelector('body');

const qsIngredientBoxOff = document.querySelector('.--ingredients-off'); // utiliser box on plutôt la prochaine fois
const qsIngredientBoxOn = document.querySelector('.--ingredients-on');
const qsIngredientBox = document.querySelector('.listbox__container__ingredients'); // create a container-off container-on
const qsIngredientTitle = document.querySelector('.listbox__container__ingredients__title');
const qsIngredientInput = document.querySelector('.listbox__container__ingredients__input');
const qsIngredientSwap = document.querySelector('.listbox__container__ingredients--swap');
const qsIngredientList = document.querySelector('.listbox__container__ingredients__list');

const qsApplianceBoxOff = document.querySelector('.--devices-off'); // rename devices by Appliance
const qsApplianceBoxOn = document.querySelector('.--devices-on'); // rename devices by Appliance
const qsApplianceBox = document.querySelector('.listbox__container__devices'); // rename devices by Appliance
const qsApplianceTitle = document.querySelector('.listbox__container__devices__title');
const qsApplianceInput = document.querySelector('.listbox__container__devices__input');
const qsApplianceSwap = document.querySelector('.listbox__container__devices--swap');
const qsApplianceList = document.querySelector('.listbox__container__devices__list');

const qsToolBoxOff = document.querySelector('.--tools-off');
const qsToolBoxOn = document.querySelector('.--tools-on');
const qsToolBox = document.querySelector('.listbox__container__tools');
const qsToolTitle = document.querySelector('.listbox__container__tools__title');
const qsToolInput = document.querySelector('.listbox__container__tools__input');
const qsToolSwap = document.querySelector('.listbox__container__tools--swap');
const qsToolList = document.querySelector('.listbox__container__tools__list');


const qsCloseList = document.querySelectorAll('.fa-chevron-up');
const qsOpenList = document.querySelectorAll('.fa-chevron-down');

const qsCloseListIngredient = document.querySelector('.listbox__container__ingredients--swap > .fa-chevron-up');
const qsOpenListIngredient = document.querySelector('.listbox__container__ingredients--swap > .fa-chevron-down');
const qsCloseListTool = document.querySelector('.listbox__container__tools--swap > .fa-chevron-up');
const qsOpenListTool = document.querySelector('.listbox__container__tools--swap > .fa-chevron-down');
const qsCloseListAppliance = document.querySelector('.listbox__container__devices--swap > .fa-chevron-up');
const qsOpenListAppliance = document.querySelector('.listbox__container__devices--swap > .fa-chevron-down');

const searchHiddenElements = document.querySelectorAll('body');
console.log(searchInput);

let firstDisplayIngredient = false;
let firstDisplayAppliance = false;
let firstDisplayTool = false;

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
    const createAppliancetList = getListAppliances(qsApplianceList, arrayAppliances);
    const createTooltList = getListTools(qsToolList, arrayTools);
    //qsIngredientList

}

init();

function searchIngredient() {
    console.log("test d'entére")
    let filter = qsIngredientInput.value.toUpperCase();
    let allIngredients = document.querySelectorAll('.listbox__container__ingredients__list > li');
    let value, i, allVisibleIngredients;

    console.log("length ingredient list : " + allIngredients)

    console.log("length ingredient list : " + allIngredients.length)

    for (i = 0; i < allIngredients.length; i++) {
        value = allIngredients[i].innerText;
        console.log("value de search : " + value + " " + allIngredients[i].innerText)
        if (value.toUpperCase().indexOf(filter) > -1) {
            allIngredients[i].classList.remove("hidden");
            //allIngredients[i].style.display = "block";
        } else {
            allIngredients[i].classList.add("hidden");
            //allIngredients[i].style.display = "none";

        }
        //allVisibleIngredients = document.querySelectorAll('.listbox__container__ingredients__list > li:visible') // c'est avec jquery, pas natif
        //allVisibleIngredients = document.querySelectorAll('.listbox__container__ingredients__list > li:not([hidden])') // marche pas
        allVisibleIngredients = document.querySelectorAll('.listbox__container__ingredients__list > li:not(.hidden)')
        console.log("element visible : " + allVisibleIngredients.length + allVisibleIngredients[0])
        if (allVisibleIngredients.length < 2) {
            qsIngredientBox.classList.remove("box--on");
            qsIngredientBox.classList.add("box1--on");

        }
        else if (allVisibleIngredients.length == 2) {
            // qsIngredientBox.classList.remove("box--on");
            // qsIngredientBox.classList.add("box1--on");

        }
        else {
            // qsIngredientBox.classList.remove("box--on");
            // qsIngredientBox.classList.add("box1--on");
        }
    }

}
qsIngredientInput.addEventListener('keyup', searchIngredient);
// qsIngredientBox.addEventListener('click', function (e) {

//     if (qsIngredientInput.classList.contains("hidden")) {

//         //retrait des toggle ar des add et remove pour une meilleur compréhension
//         qsIngredientTitle.classList.add("hidden");
//         qsIngredientInput.classList.remove("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
//         qsIngredientList.classList.remove("hidden");
//         qsIngredientInput.focus();
//         qsIngredientBox.classList.add("box--on");
//         qsIngredientSwap.classList.add("swap--on");
//         qsOpenListIngredient.classList.add("hidden");
//         qsCloseListIngredient.classList.remove("hidden");


//         //ce battard marche clairement aps à cause de la aprtie au dessus qui à l'air de s'activer tout le temps

//         /*         qsBody.addEventListener("click", (e) => {
//                     if (qsIngredientTitle.classList.contains("hidden")) {
//                         qsIngredientTitle.classList.remove("hidden");
//                         qsIngredientInput.classList.add("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
//                         qsIngredientList.classList.add("hidden");
//                         qsIngredientBox.classList.remove("box--on");
//                         qsIngredientSwap.classList.remove("swap--on");
//                         qsOpenListIngredient.classList.add("hidden");
//                         qsCloseListIngredient.classList.remove("hidden");
//                     }
//                     else {

//                     }
//                 }); */
//     }

//     //sinon fermer
// /*     else if (qsIngredientTitle.classList.contains("hidden") && e.classList.contains(".fa-chevron-up")) {

//         qsIngredientTitle.classList.remove("hidden");
//         qsIngredientInput.classList.add("hidden");
//         qsIngredientList.classList.add("hidden");
//         qsIngredientBox.classList.remove("box--on");
//         qsIngredientSwap.classList.remove("swap--on");
//         qsOpenListIngredient.classList.remove("hidden");
//         qsCloseListIngredient.classList.add("hidden");


//     } */


// })


// ça amrche a peu près, creuser si le reste marche pas mieux
document.addEventListener("click", (e) => {

    console.log(qsIngredientBox.classList.contains("box--on"))
    if (qsIngredientBox.classList.contains("box--on")) {// normalement ça devrait etre box-on ou box-off devrait être box--off
        console.log("contains")

        if (e.target.classList.contains("listbox__container__ingredients") || e.target.classList.contains("listbox__container__ingredients__title") || e.target.classList.contains("listbox__container__ingredients--swap") || e.target.classList.contains("listbox__container__ingredients__title") || e.target.classList.contains("fa-chevron-down")
            || e.target.classList.contains("listbox__container__ingredients__input") || e.target.classList.contains("listbox__container__ingredients__list") || e.target.nodeName == "LI") // j'avais juste oublié de metrte ce puatin de target BORDEL DE MERD3E
        {
            console.log("if")
            return
        }
        /* me sert a rien puisquen effet je ne peux faire un return utile dans ce cas pou faire un else ensuite       // nodename marche avec LI contrairement à tagName  
        if ( true === true) {
                    for(let i=0; i<qsIngredientBox.childNodes.length; i++) {
                        return
                   }
                } */
        else {
            qsIngredientTitle.classList.remove("hidden");
            qsIngredientInput.classList.add("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
            qsIngredientList.classList.add("hidden");
            qsIngredientBox.classList.remove("box--on");
            qsIngredientSwap.classList.remove("swap--on");
            qsOpenListIngredient.classList.remove("hidden");
            qsCloseListIngredient.classList.add("hidden");
            console.log("else")

        }

    }

});


qsIngredientBoxOff.addEventListener('click', function (e) {

    if (qsIngredientInput.classList.contains("hidden")) {

        //retrait des toggle ar des add et remove pour une meilleur compréhension
        qsIngredientTitle.classList.add("hidden");
        qsIngredientInput.classList.remove("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
        qsIngredientList.classList.remove("hidden");
        qsIngredientInput.focus();
        qsIngredientBox.classList.add("box--on");
        qsIngredientSwap.classList.add("swap--on");
        qsOpenListIngredient.classList.add("hidden");
        qsCloseListIngredient.classList.remove("hidden");

        qsIngredientBox.classList.remove("--ingredients-off");
        qsCloseListIngredient.classList.add("--ingredients-on");

        // soit je fais seulement une utilisation, soit je fais en sorte qu'il el lance qu'une fois
        /*         if (!firstDisplayIngredient) {
                    qsCloseListIngredient.addEventListener('click', function (e) {
                        
                            //retrait des toggle ar des add et remove pour une meilleur compréhension
                            qsIngredientTitle.classList.remove("hidden");
                            qsIngredientInput.classList.add("hidden");
                            qsIngredientList.classList.add("hidden");
                            qsIngredientBox.classList.remove("box--on");
                            qsIngredientSwap.classList.remove("swap--on");
                            qsOpenListIngredient.classList.remove("hidden");
                            qsCloseListIngredient.classList.add("hidden");
                    
                            qsIngredientBox.classList.add("--ingredients-off");
                            qsCloseListIngredient.classList.remove("--ingredients-on");
                            console.log(firstDisplayIngredient)
        
                    })
                    firstDisplayIngredient = true;
                } */



    }
})




// qsCloseListIngredient.addEventListener('click', function (e) {
//     console.log("im here")

//     if (qsIngredientTitle.classList.contains("hidden")) {
//         console.log("im here2")
//         //return
// /*         qsIngredientTitle.classList.toggle("hidden");
//         qsIngredientInput.classList.toggle("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
//         qsIngredientList.classList.toggle("hidden");
//         qsIngredientInput.focus();
//         qsIngredientBox.classList.toggle("box--on");
//         qsIngredientSwap.classList.toggle("swap--on");
//         qsOpenListIngredient.classList.toggle("hidden");
//         qsCloseListIngredient.classList.toggle("hidden"); */
//         qsIngredientTitle.classList.remove("hidden");
//         qsIngredientInput.classList.add("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
//         qsIngredientList.classList.add("hidden");
//         //qsIngredientInput.focus();
//         qsIngredientBox.classList.remove("box--on");
//         qsIngredientSwap.classList.remove("swap--on");
//         qsOpenListIngredient.classList.remove("hidden");
//         qsCloseListIngredient.classList.add("hidden");
//     }
// /*     else {
//         qsIngredientTitle.classList.toggle("hidden");
//         qsIngredientInput.classList.toggle("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
//         qsIngredientList.classList.toggle("hidden");
//         qsIngredientInput.focus();
//         qsIngredientBox.classList.toggle("box--on");
//         qsIngredientSwap.classList.toggle("swap--on");
//         qsOpenListIngredient.classList.toggle("hidden");
//         qsCloseListIngredient.classList.toggle("hidden");
//     } */

// })

/* qsCloseList.forEach((e) => e.addEventListener("click", () => {
    console.log('test ' + e.classList)
    console.log(e.parentElement)
    if (e.parentElement.classList.contains("listbox__container__ingredients--swap")) {
        qsIngredientTitle.classList.remove("hidden");
        qsIngredientInput.classList.add("hidden");
        qsIngredientList.classList.add("hidden");
        qsIngredientBox.classList.remove("box--on");
        qsIngredientSwap.classList.remove("swap--on");
        qsOpenListIngredient.classList.remove("hidden");
        qsCloseListIngredient.classList.add("hidden");
    }

})); */

qsIngredientBox.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
        qsIngredientTitle.classList.toggle("hidden");
        qsIngredientInput.classList.toggle("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
        qsIngredientList.classList.toggle("hidden");
        qsIngredientBox.classList.toggle("box--on")
        qsIngredientSwap.classList.toggle("swap--on")
    }
});

/* qsBody.addEventListener("click", (e) => {

    if (qsIngredientTitle.classList.contains("hidden")) {
        qsIngredientTitle.classList.remove("hidden");
        qsIngredientInput.classList.add("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
        qsIngredientList.classList.add("hidden");
        qsIngredientBox.classList.remove("box--on");
        qsIngredientSwap.classList.remove("swap--on");
        qsOpenListIngredient.classList.add("hidden");
        qsCloseListIngredient.classList.remove("hidden");
    }
    e.stopPropagation();

}); */



qsToolBox.addEventListener('click', function (e) {
    if (qsToolInput.classList.contains("hidden")) {
        //retrait des toggle ar des add et remove pour une meilleur compréhension
        qsToolTitle.classList.add("hidden");
        qsToolInput.classList.remove("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
        qsToolList.classList.remove("hidden");
        qsToolInput.focus();
        qsToolBox.classList.add("box--on");
        qsToolSwap.classList.add("swap--on");
        qsOpenListTool.classList.add("hidden");
        qsCloseListTool.classList.remove("hidden");

    }
})

qsToolBox.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
        qsToolTitle.classList.toggle("hidden");
        qsToolInput.classList.toggle("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
        qsToolList.classList.toggle("hidden");
        qsToolBox.classList.toggle("box--on")
        qsToolSwap.classList.toggle("swap--on")
    }
});

qsApplianceBox.addEventListener('click', function (e) {
    if (qsApplianceInput.classList.contains("hidden")) {
        //retrait des toggle ar des add et remove pour une meilleur compréhension
        qsApplianceTitle.classList.add("hidden");
        qsApplianceInput.classList.remove("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
        qsApplianceList.classList.remove("hidden");
        qsApplianceInput.focus();
        qsApplianceBox.classList.add("box--on");
        qsApplianceSwap.classList.add("swap--on");
        qsOpenListAppliance.classList.add("hidden");
        qsCloseListAppliance.classList.remove("hidden");

    }

})

qsApplianceBox.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
        qsApplianceTitle.classList.toggle("hidden");
        qsApplianceInput.classList.toggle("hidden"); // c'est chiant parceque dès que tu reappuie dessus ca se barre
        qsApplianceList.classList.toggle("hidden");
        qsApplianceBox.classList.toggle("box--on")
        qsApplianceSwap.classList.toggle("swap--on")
    }
});


/* 
est-ce que c'est possible que la raison pour laquel ces trcus de merde ce modifie aps soit parceque j'ai mis les élément en const et que je fais add or remove dans classlist ?
bah non parceque sinon ca s'ouvrirais même pas

*/