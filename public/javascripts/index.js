async function init() {
  document.getElementById("journalEntry").value = "";
  document.getElementById("showfeedback").value = "";
  await loadIdentity();
  await loadMostRecentEntry();
}

let cardsId = []; // create a global array to save fetched cards ids

// Accepts a number to represent how many cards it needs to show
// Displays the HTML of the card reading
async function loadReading(numOfCards) {
  let htmlJSON = await fetchJSON("api/readings?numOfCards=" + numOfCards);
  console.log("loadReading, htmlJSON: " + htmlJSON.cardDisplay);
  cardsId = htmlJSON.cardsId;

  console.log("cardsId arr: " + cardsId);

  document.getElementById("cardDisplay").innerHTML = htmlJSON.cardDisplay;
  document.getElementById("descriptionDisplay").innerHTML =
    htmlJSON.descriptionDisplay;
}

// Preps a journal entry to get saved
async function saveNewEntry() {
  let journal = document.getElementById("journalEntry").value;
  if (cardsId.length == 0) {
    alert("Please draw Tarot cards");
  } else {
    await postEntryAndReading(journal);
    init();
  }
}

// Sends a journal entry to the database
async function postEntryAndReading(journal) {
  console.log("POSToneCards: " + journal);
  let typeOfReading = "";
  if (cardsId.length == 1) {
    typeOfReading = "singleReading";
  } else if (cardsId.length == 3) {
    typeOfReading = "tripleReading";
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
    inputFeedback.textContent = "Error: " + responseJson.error;
  }
  document.getElementById("journal-input")
    .insertBefore(inputFeedback, showEntry);
}

// Finds a user's most recent entry from the database
// Diplays the most recent entry to the DOM
async function loadMostRecentEntry() {
  document.getElementById("showEntry").innerHTML="";
  //get username to find user entries in users collection
  let userIdentity = await fetchJSON(`api/users/myIdentity`);

  if (userIdentity.status == "loggedin") {
    let username = userIdentity.userInfo.username;
    // get user entries
    let response = await fetch("api/readings/user?username=" + username);
    let responseJson = await response.json();
    if(responseJson.length > 0){
    let oneRead = responseJson[responseJson.length - 1];
    // load cards description
    let cardDescription = await loadCardsDescription(oneRead.cards);
    let result = `<div class="single-result">
                    <h3> Your Most Recent Reading: </h3>
                    <p><strong>Date:</strong> ${oneRead.date.substring(0, 10)} at ${oneRead.date.substring(11, 16)}</p>
                    <p><strong>Type Of Reading:</strong> ${oneRead.typeOfReading.substring(0, oneRead.typeOfReading.length - 7)} card reading</p>
                    <p><strong>Reading results:</strong></p>
                    <p>${cardDescription}</p>
                    <p><strong>Journal:</strong> ${oneRead.journalEntry}</p>
                    <hr>
                    </div>`;
    document.getElementById("showEntry").innerHTML += result;
    }
  }
}

// Receives an array of card IDS
// Returns HTML for the card descriptions
async function loadCardsDescription(cardsArr) {
  let results = ""
  for (let i = 0; i < cardsArr.length; i++) {
    let oneDescription = await fetch("api/readings/cardId?id=" + cardsArr[i]);
    oneDescription = await oneDescription.json();
    results += `${oneDescription}+<br>`;
  }
  return results
}
