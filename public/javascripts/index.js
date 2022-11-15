
async function loadOneCard() {
  // pull one random card

  // pull all cards
  let response = await fetch("api/readings" + "?numOfCards=1"); // we will change one to a variable we can change 
  let cardData = await response.json();

  let htmlReturn = ``

  // for every card in the responsive add a new card to the screen
  for (let i = 0; i < cardData.length; i++) {
    htmlReturn += `
    <h2>${cardData.name}</h2>
    <img src="../imgs/cards/${cardData.img}" alt="${cardData.name}" />
    <p>Description: ${cardData.description}</p>
    `;
  }

  document.getElementById("results").innerHTML = htmlReturn;
}

// async function postOneCard(card_id) {
//   let responseJson = await fetchJSON(`api/readings`, {
//     method: "POST",
//     body: {
//       card_id: card_id,
//       created_date: Date()
//     },
//   });
// }
