async function init() {
  document.getElementById("journalEntry").value = "";
  await loadIdentity();
  await loadEntry();
}
let cardsId = []; // create a global array to save fetched cards ids
async function loadReading(numOfCards) {
  let htmlJSON = await fetchJSON("api/readings?numOfCards=" + numOfCards);
  console.log("loadReading, htmlJSON: " + htmlJSON.cardDisplay);
  cardsId = htmlJSON.cardsId;

  console.log("cardsId arr: " + cardsId);

  document.getElementById("cardDisplay").innerHTML = htmlJSON.cardDisplay;
  document.getElementById("descriptionDisplay").innerHTML =
    htmlJSON.descriptionDisplay;
}

async function saveNewEntry() {
  let journal = document.getElementById("journalEntry").value;
  if (cardsId.length == 0) {
    alert("Please draw Tarot cards");
  } else {
    //debug:
    console.log("Jounal: " + journal);
    console.log("TarotId: " + cardsId);

    await postEntryAndReading(journal);
    init();
  }
}

async function postEntryAndReading(journal) {
  console.log("POSToneCards: " + journal);
  let typeOfReading = "";
  if (cardsId.length == 1) {
    typeOfReading = "singleReading";
  } else if (cardsId.length == 3) {
    typeOfReading = "tripleReading";
  } else if (cardsId.length == 5) {
    typeOfReading = "fiveCardsReading";
  }
  let responseJson = await fetchJSON(`api/readings`, {
    method: "POST",
    body: {
      typeOfReading: typeOfReading,
      card_id: cardsId,
      journal: journal,
    },
  });
  let inputFeedback = document.getElementById("showfeedback");
  if (responseJson.status == "Success") {
    inputFeedback.textContent = "Success!";
  } else {
    inputFeedback.textContent = "Fail!";
  }
  document.getElementById("journal-input")
    .insertBefore(inputFeedback, showEntry);
}

async function loadEntry() {
  let userIdentity = await fetchJSON(`api/users/myIdentity`);
  if (userIdentity.status == "loggedin") {
    let username = userIdentity.userInfo.username;
    //debug:
    // console.log("LoadEntry: username: " + username);
    let response = await fetch("api/readings/user?username=" + username);
    // console.log("response: "+response)
    let responseJson = await response.json();
    // console.log("responseJson: " + responseJson);
    for (let i = 0; i < responseJson.length; i++) {
      let oneRead = responseJson[i];
      let cardDescription = await loadCardsDescription(oneRead.cards);
      let result = `Date: ${oneRead.date}
                    <br> Type Of Reading: ${oneRead.typeOfReading}
                    <br> Reading results:<br> ${cardDescription}
                    <br> Journal: ${oneRead.journalEntry}
                    <hr>`;
      document.getElementById("showEntry").innerHTML += result;
    }
  }
}

async function loadCardsDescription(cardsArr) {
  let results = ""
  for (let i = 0; i < cardsArr.length; i++) {
    let oneDescription = await fetch("api/readings/cardId?id=" + cardsArr[i]);
    oneDescription = await oneDescription.json();
    results += `${oneDescription}+<br>`;
    // console.log("Results from loadCardsDescription()"+results)
  }
  return results
}
