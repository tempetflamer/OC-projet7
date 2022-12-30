export function recipesFactories(data) {
    //id name servings ingredients time description appliance ustensils

    function getRecipeCard() {
        const article = document.createElement('article');
        article.classList.add('recipes__card');

        const img = document.createElement('img');
        img.setAttribute("src", "../../assets/img/1.jpg") //numero a remplacer par id
        img.setAttribute("alt", data.name)
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
        titleRecipe.classList.add('recipes__card__data__content__title')
        content.appendChild(titleRecipe);
        const time = document.createElement('div');
        time.classList.add('recipes__card__data__content__time')
        content.appendChild(time);

        const iconTime = document.createElement('i');
        iconTime.classList.add('fa-regular')
        iconTime.classList.add('fa-clock')
        iconTime.classList.add('fa-xl')
        time.appendChild(iconTime);
        const textTime = document.createElement('p');
        textTime.textContent =  data.time + " min"
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
        console.log("el",el);
        const item = document.createElement('li');
        item.textContent = el;
        qsIngredientList.appendChild(item);
        console.log(qsIngredientList)
    })

}
