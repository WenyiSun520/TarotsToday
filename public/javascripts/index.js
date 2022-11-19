async function init() {
  await loadIdentity();
}

async function loadOneCard() {
  // pull one random card
  // pull all cards
  let response = await fetch("api/readings");
  let cardData = await response.json();
  let htmlReturn = `
    <h2>${cardData.name}</h2>
    <img src="../imgs/cards/${cardData.img}" alt="${cardData.name}" />
    <p>Description: ${cardData.description}</p>
    <p class="d-none" id="cardId">${cardData.id}</p>
    `;
  document.getElementById("results").innerHTML = htmlReturn;
}

async function saveNewEntry() {
  let journal = document.getElementById("journalEntry").value;
  let cardId = document.getElementById("cardId").textContent;
  //debug:
  console.log("Jounal: " + journal);
  console.log("TarotId: " + cardId);

  postOneCard(cardId, journal);
}

async function postOneCard(card_id, journal) {
  console.log("POSToneCards: " + journal);
  let responseJson = await fetchJSON(`api/readings`, {
    method: "POST",
    body: {
      card_id: card_id,
      journal: journal,
    },
  });
  let inputFeedback = document.createElement("p");
  if (responseJson.status == "success") {
    inputFeedback.textContent = "Success!";
  } else {
    inputFeedback.textContent = "Fail!";
  }
  document.getElementById("journal-input").appendChild(inputFeedback);
}
