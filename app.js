let random = document.getElementById('random')
let category = document.getElementById('Category')
const modal = document.getElementById("modal");
const closeButton = document.getElementById("close-button");
const ingredientsList = document.getElementById("ingredients-list");

fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((data) => data.json())
    .then((e) => randomBuilder(e))
function randomBuilder(arr) {
    random.innerHTML = `<img src="${arr.meals[0].strMealThumb}"width=200px><div>${arr.meals[0].strMeal}<\div>`
}

function mealCardBuilder(arrays) {
    category.innerHTML = "";
    arrays.meals.forEach(array => {
        category.innerHTML += `<div class="meal">
    <img class="mealimg" src=${array.strMealThumb}>
    <h3>${array.strMeal}</h3> </div>`;
    var meal = document.getElementsByClassName("meal")
    for (let i=0; i<meal.length; i++) {
        meal[i].onclick=(e)=>{
            const parent = e.target.parentNode;
            const nameTag = parent.getElementsByTagName("h3")[0];
            fetchIngredient(nameTag.innerText)
        }
    }
    });
}

async function fetchIngredient(name) {
    console.log(name)
    let array;
    await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((dt)=>dt.json())
    .then((res)=>{
        array=res
    })
    modal.innerHTML=''
    for (let i = 1; i < 21; i++) {
        let ingredient = array.meals[0][`strIngredient${i}`];
        console.log(ingredient)
        modal.innerHTML += `${ingredient}<br><br>`;
    }
    displayModal()
}

function displayModal() {
    modal.style.display = "block"
    disappear()
}

function disappear() {
    modal.onclick=()=>{
        modal.style.display = "none"
    }
}


function searchResult(name) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
        .then((data) => data.json())
        .then((e) => mealCardBuilder(e))
}



let search = document.getElementById('search');
let searchInp = document.getElementById('searchInp');
search.onclick = () => {
    random.style.display = "none";
    let searchInput = searchInp.value;
    searchResult(searchInput);
}


