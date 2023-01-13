async function init() {
  await returnCards();
  await loadIdentity();
}

// Runs through all the tarot cards in our database
// Returns html for the tarot card about page
async function getAllTarots() {
  return await (await fetch(`../api/readings/all`)).json();
}
async function returnCards() {
  let htmlReturn = `<div class="row">`;
  try {
    let allCardsJSON = await getAllTarots();

    allCardsJSON.forEach((card) => {
      htmlReturn += `<div class="col-sm-3 about-card">
            <p class="about-card-name"><strong>${card.name}</strong></p>
            <img src="/imgs/cards/${card.img}" class="about-card-img">
            <p>${card.description}</p>
        </div>
        <br>
        `;
    });
    htmlReturn += "</div>";
    document.getElementById("about-section").innerHTML = htmlReturn;
  } catch (error) {
    document.getElementById("about-section").innerHTML = `${error}`;
  }
}

//user can hit enter to search
let searchInput = document.querySelector(".about-tarot-searchbar");
// console.log("searchInput: ",searchInput)
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchCard();
  }
});
async function searchCard() {
  let htmlReturn = `<div class="row">`;
  let query = document.querySelector(".about-tarot-searchbar").value;
  let allCardsJSON = await getAllTarots();
  // console.log("allcards: ", allCardsJSON);
  let filteredCards = allCardsJSON.filter((card) => {
    return card.name.toLowerCase().includes(query.toLowerCase());
  });
  // console.log("filterCards: ", filteredCards);
  filteredCards.forEach((card) => {
    htmlReturn += `<div class="col-sm-3 about-card">
            <p class="about-card-name"><strong>${card.name}</strong></p>
            <img src="/imgs/cards/${card.img}" class="about-card-img">
            <p>${card.description}</p>
        </div>
        <br>
        `;
  });
  htmlReturn += "</div>";
  document.getElementById("about-section").innerHTML = htmlReturn;
}
