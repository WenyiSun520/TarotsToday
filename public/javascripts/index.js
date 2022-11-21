async function init() {
  await loadIdentity();
  await loadEntry();
}

async function loadReading(numOfCards) {
  let htmlJSON = await fetchJSON("api/readings?numOfCards=" + numOfCards);
  console.log("loadReading, htmlJSON: " + htmlJSON.cardDisplay)
  //let htmlJSON = await response.json();

  document.getElementById("cardDisplay").innerHTML = htmlJSON.cardDisplay;
  document.getElementById("descriptionDisplay").innerHTML = htmlJSON.descriptionDisplay;
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
