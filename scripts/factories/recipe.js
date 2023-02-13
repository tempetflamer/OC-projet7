import { recipesReset } from "../utils/initArrays.js";
import { searchByTag, searchByWord, initSearch } from "../utils/search.js";

const qsFiltersSelected = document.querySelector('.filterselected');
const qsIngredientInput = document.querySelector(".listbox__container__ingredients__input");
const qsApplianceInput = document.querySelector(".listbox__container__appliances__input");
const qsToolInput = document.querySelector(".listbox__container__tools__input");
const searchInput = document.querySelector(".recherche__container input");

/**
 * Recipe creation factory
 * Create recipe card
 * @param {*} data  - recipe
 * @return { getRecipeCard }
 */
export function recipesFactories(data) {

    function getRecipeCard() {
        const article = document.createElement('article');
        article.classList.add('recipes__card');

        const img = document.createElement('img');
        img.setAttribute("src", "./assets/img/placeholder.jpg")
        img.classList.add('recipes__card__img');
        article.appendChild(img);

        const cardDatas = document.createElement('div');
        cardDatas.classList.add('recipes__card__data')
        article.appendChild(cardDatas);

        const contentTop = document.createElement('div');
        contentTop.classList.add('recipes__card__data__content-top')
        cardDatas.appendChild(contentTop);

        const content = document.createElement('div');
        content.classList.add('recipes__card__data__content')
        cardDatas.appendChild(content);

        const titleRecipe = document.createElement('h3');
        titleRecipe.textContent = data.name;
        titleRecipe.classList.add('recipes__card__data__content-top__title')
        contentTop.appendChild(titleRecipe);
        const time = document.createElement('div');
        time.classList.add('recipes__card__data__content-top__time')
        contentTop.appendChild(time);

        const iconTime = document.createElement('i');
        iconTime.classList.add('fa-regular')
        iconTime.classList.add('fa-clock')
        iconTime.classList.add('fa-xl')
        time.appendChild(iconTime);
        const textTime = document.createElement('p');
        textTime.textContent = data.time + " min"
        time.appendChild(textTime);

        const list = document.createElement('ul');
        list.classList.add('recipes__card__data__content__ingredient-list')
        data.ingredients.forEach((ingredient) => {
            const listItem = document.createElement('li');
            let unit;
            let quantity;
            let name;
            if (ingredient.quantity) { quantity = ingredient.quantity; name = ingredient.ingredient + ": "; } else { quantity = ""; name = ingredient.ingredient; }
            if (ingredient.unit) { unit = ingredient.unit; if (ingredient.unit.length > 2) { unit = " " + unit } } else { unit = "" }
            listItem.innerHTML = "<li><b>" + name + "</b>" + quantity + unit; + "</li>"

            list.appendChild(listItem);
        })
        content.appendChild(list);

        const desc = document.createElement('p');
        desc.classList.add('recipes__card__data__content__desc')
        desc.textContent = data.description;
        content.appendChild(desc);


        return (article);
    }

    return { getRecipeCard }
}

/**
 * Create each ingredient of the ingredients list.
 * Also moves the selected ingredient in filterselected at click, 
 * before updating the list of recipes and then the list of available ingredients, appliances and tools.
 * add a remove event at click from the elements selected.
 * @param {HTMLElement} qsIngredientList 
 * @param {*} data - List of ingredients
 */
export function getListIngredients(qsIngredientList, data) {
    data.forEach((el) => {
        const item = document.createElement('li');
        item.textContent = el;
        qsIngredientList.appendChild(item);

        item.addEventListener("click", (e) => {
            const filterDiv = document.createElement('div');
            filterDiv.classList.add("filterselected__item")
            filterDiv.classList.add("type--ingredient")
            const filterText = document.createElement('p');
            filterText.textContent = item.textContent;
            filterDiv.appendChild(filterText)
            const filterIcon = document.createElement('i');
            filterIcon.classList.add("fa-regular");
            filterIcon.classList.add("fa-circle-xmark");
            filterIcon.classList.add("fa-lg");
            filterDiv.appendChild(filterIcon)
            qsFiltersSelected.appendChild(filterDiv);
            item.remove();

            qsIngredientInput.value = "";
            let search = searchInput.value;
            if (search.length > 2) {
                initSearch();
                searchByWord(search)
            }
            else {
                initSearch();
                searchByTag(recipesReset);
            }

            filterIcon.addEventListener("click", (e) => {
                filterDiv.remove()
                let search = searchInput.value;
                if (search.length > 2) {
                    initSearch();
                    searchByWord(search)
                }
                else {
                    initSearch();
                    searchByTag(recipesReset);
                }

            }, { once: true });

        });

    })

}

/**
 * Create each appliance of the appliances list.
 * Also moves the selected appliance in filterselected at click, 
 * before updating the list of recipes and then the list of available ingredients, appliances and tools.
 * Add a remove event at click from the elements selected.
 * @param {HTMLElement} qsApplianceList 
 * @param {*} data - List of appliance
 */
export function getListAppliances(qsApplianceList, data) {
    data.forEach((el) => {
        const item = document.createElement('li');
        item.textContent = el;
        qsApplianceList.appendChild(item);

        item.addEventListener("click", (e) => {
            const filterDiv = document.createElement('div');
            filterDiv.classList.add("filterselected__item")
            filterDiv.classList.add("type--appliance")
            const filterText = document.createElement('p');
            filterText.textContent = item.textContent;
            filterDiv.appendChild(filterText)
            const filterIcon = document.createElement('i');
            filterIcon.classList.add("fa-regular");
            filterIcon.classList.add("fa-circle-xmark");
            filterIcon.classList.add("fa-lg");
            filterDiv.appendChild(filterIcon)
            qsFiltersSelected.appendChild(filterDiv);
            item.remove();

            qsApplianceInput.value = "";
            let search = searchInput.value;
            if (search.length > 2) {
                initSearch();
                searchByWord(search)
            }
            else {
                initSearch();
                searchByTag(recipesReset);
            }

            filterIcon.addEventListener("click", (e) => {
                filterDiv.remove()
                let search = searchInput.value;
                if (search.length > 2) {
                    initSearch();
                    searchByWord(search)
                }
                else {
                    initSearch();
                    searchByTag(recipesReset);
                }

            }, { once: true });

        });

    })

}

/**
 * Create each tool of the tools list.
 * Also moves the selected tool in filterselected at click, 
 * before updating the list of recipes and then the list of available ingredients, appliances and tools.
 * Add a remove event at click from the elements selected.
 * @param {HTMLElement} qstoolList 
 * @param {*} data - List of tool
 */
export function getListTools(qstoolList, data) {
    data.forEach((el) => {
        const item = document.createElement('li');
        item.textContent = el;
        qstoolList.appendChild(item);

        item.addEventListener("click", (e) => {
            const filterDiv = document.createElement('div');
            filterDiv.classList.add("filterselected__item")
            filterDiv.classList.add("type--tool")
            const filterText = document.createElement('p');
            filterText.textContent = item.textContent;
            filterDiv.appendChild(filterText)
            const filterIcon = document.createElement('i');
            filterIcon.classList.add("fa-regular");
            filterIcon.classList.add("fa-circle-xmark");
            filterIcon.classList.add("fa-lg");
            filterDiv.appendChild(filterIcon)
            qsFiltersSelected.appendChild(filterDiv);
            item.remove();

            qsToolInput.value = "";
            let search = searchInput.value;
            if (search.length > 2) {
                initSearch();
                searchByWord(search)
            }
            else {
                initSearch();
                searchByTag(recipesReset);
            }

            filterIcon.addEventListener("click", (e) => {
                filterDiv.remove()
                let search = searchInput.value;
                if (search.length > 2) {
                    initSearch();
                    searchByWord(search)
                }
                else {
                    initSearch();
                    searchByTag(recipesReset);
                }

            }, { once: true });

        });

    })

}
