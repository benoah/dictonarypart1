const cardItems = document.querySelector(".cardsStore");
const abcOrd = document.querySelector("#filter-az");

let html = "";
let list;


baseUrl = "https://www.benoa.no/cms/wp-json/wc/store/products";

fetch(baseUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (results) {
        list = results;
        cardPlacer(list);
    })
    .catch(function (error) {
        console.log(error);
    });



function cardPlacer(results) {
    console.dir(results);
    results.forEach(function (content) {
        html += ` <div class="cards-content">
      <a class="link" href="${content.permalink}"><img class="cards-image" src="${content.images[0].thumbnail}" alt="Show Image"> </a> 
          <div class="cards-text">
           <h4 class="cards-name">${content.name}</h4>
           <p class="cards-prices">${content.prices.price}$</p>
           <button class=""><a class="link" href="${content.permalink}">View More</a>
               </button>
          </div>
      </div>`;
        cardItems.innerHTML += html;
    });
}


abcOrd.addEventListener("click", (event) => {
    let sortThem = list.sort((a, b) => {
        let navnA = a.name.toUpperCase();
        let navnB = b.name.toUpperCase();
        if (navnA > navnB) return 2;
        if (navnA < navnB) return 0;
        return 0;
    });
    cardItems.innerHTML = "";
    cardPlacer(sortThem);
});

