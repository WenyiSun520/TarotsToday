loadEntry();
async function loadEntry() {
  document.getElementById("results").innerHTML = "";
  // get username to find user entries in users collection
  let userIdentity = await fetchJSON(`api/users/myIdentity`);
  if (userIdentity.status == "loggedin") {
    let username = userIdentity.userInfo.username;
    // get user entries
    let response = await fetch("api/readings/user?username=" + username); 
    let responseJson = await response.json();
    for (let i = 0; i < responseJson.length; i++) {
      let oneRead = responseJson[i];

      let result = `  <div class="entry-bg">
    <div class="entry-result">
                    Date: ${oneRead.date}
                    <p>Type Of Reading: ${oneRead.typeOfReading}</p>
                    <p>Cards:</p>
                    ${await loadCardsDescription(oneRead.cards)}
                    <p class="journal-p">Journal: ${oneRead.journalEntry}</p>
                    </div>
                    </div>
                   `;
      document.getElementById("results").innerHTML += result;
    }
  }
}

async function loadCardsDescription(cardsArr) {
  let results = "";
  for (let i = 0; i < cardsArr.length; i++) {
    let oneDescription = await fetch("api/readings/cardId?id=" + cardsArr[i]);
    oneDescription = await oneDescription.json();
    results += `${oneDescription}`;
  }
  return results;
}
