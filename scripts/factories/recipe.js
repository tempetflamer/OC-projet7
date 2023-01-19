import { arrayrecipes, clearArrays, arrayrecipesReset } from "../utils/initArrays.js";
import { searchByTag, searchByTag2, searchByWord } from "../utils/search.js";

const qsFiltersSelected = document.querySelector('.filterselected');
const qsIngredientInput = document.querySelector(".listbox__container__ingredients__input");
const qsApplianceInput = document.querySelector(".listbox__container__appliances__input");
const qsToolInput = document.querySelector(".listbox__container__tools__input");
const searchInput = document.querySelector(".recherche__container input");


export function recipesFactories(data) {

    function getRecipeCard() {
        const article = document.createElement('article');
        article.classList.add('recipes__card');

        const img = document.createElement('img');
        img.setAttribute("src", "../../assets/img/placeholder.jpg")
        //img.setAttribute("alt", data.name)
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
            // If unit > 2, we add a blank else it's m, l unit // possibility to add a variable for juste add an espace if >2 // for more visibilyu i didn't // finally i did it
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

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.classList.add('photographer__data');
        const imageLink = document.createElement('a');
        imageLink.href = './photographer.html?search&id=' + id;
        imageLink.tabIndex = "0";
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        img.classList.add('photographer__data__img');
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.classList.add("photographer__data__name");
        const pCity = document.createElement('p');
        pCity.textContent = city + ', ' + country;
        pCity.classList.add("photographer__data__location");
        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.classList.add('photographer__data__tagline');
        const pPrice = document.createElement('p');
        pPrice.textContent = price + '€/jour';
        pPrice.classList.add('photographer__data__price');
        article.appendChild(imageLink);
        imageLink.appendChild(img);
        imageLink.appendChild(h2);
        article.appendChild(pCity);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return (article);
    }


    return { getRecipeCard }
}

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

            searchByTag2();

            filterIcon.addEventListener("click", (e) => {
                filterDiv.remove()
                let search = searchInput.value;
                console.log("test0")
                if (searchInput.textLength > 2) {
                    console.log("test")
                    searchByWord(search)
                }
                else {
                    searchByTag2();
                }

            }, { once: true });

        });

    })

}

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
            searchByTag(arrayrecipesReset);

            filterIcon.addEventListener("click", (e) => {
                filterDiv.remove()

            }, { once: true });

        });

    })

}

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
            searchByTag();

            filterIcon.addEventListener("click", (e) => {
                filterDiv.remove()
            }, { once: true });

        });

    })

}
