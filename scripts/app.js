const searchInput = document.querySelector('.recherche__container input');
const searchHiddenElements = document.querySelectorAll('body');
console.log(searchInput);

// Animation Input
searchInput.addEventListener('input', function(e) {

    if(e.target.value !== "") {
        e.target.parentNode.classList.add('active-input');
    } else if (e.target.value === "") {
        e.target.parentNode.classList.remove('active-input');
    }

})

let hiddenElement = document.querySelectorAll('.fa-chevron-up');
//hiddenElement.forEach((element) => element.style.display = "none");
hiddenElement.forEach((element) => element.classList.add("hidden"));