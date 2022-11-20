async function init() {
  await loadIdentity();
  await loadEntry();
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
  init();
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
  document.getElementById("journal-input").insertBefore(inputFeedback, showEntry);
}

async function loadEntry() {
  
  let responseJson = await fetchJSON(`api/readings/entry`);
  if (responseJson.status == "success") {
    let readings = responseJson.readings;
    for (let i = 0; i < readings.length; i++) {
      let oneRead = readings[i];
      let cardInfo = await fetch("api/readings/cardId?id=" + oneRead.cards[0]);
      cardInfo = await cardInfo.json()
      let result = `Date:${oneRead.date} 
      <br>Type Of Reading: ${oneRead.typeOfReading}
      <br>${cardInfo}
      <br>Journal: ${oneRead.journalEntry}
      <hr>`;
      document.getElementById("showEntry").innerHTML += result;
    }
  }
}
