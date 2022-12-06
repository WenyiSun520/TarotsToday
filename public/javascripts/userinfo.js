
loadEntry();

async function loadEntry() {
  document.getElementById("results").innerHTML = "";
  // get username to find user entries in uesers collection
  let userIdentity = await fetchJSON(`api/users/myIdentity`);
  if (userIdentity.status == "loggedin") {
    let username = userIdentity.userInfo.username;
    //debug:
    console.log("LoadEntry: username: " + username);
    let response = await fetch("api/readings/user?username=" + username); //get user entries
    console.log("response: " + response);
    let responseJson = await response.json();
    for (let i = 0; i < responseJson.length; i++) {
      let oneRead = responseJson[i];

      let result = `<div class="entry-container">
                    <div id="${i}" class="entry-inner" onclick="flipEntry(${i})">
                    <div class="entry-front">
                    <img class="entry-pic" src='../imgs/entry-bg.webp' alt="Entry background picture" />
                    </div>
                    <div class="entry-back">
                    Date: ${oneRead.date}
                    <p>Type Of Reading: ${oneRead.typeOfReading}</p>
                    <p>Cards:</p>
                    ${await loadCardsDescription(oneRead.cards)}
                    <p class="journal-p">Journal: ${oneRead.journalEntry}</p>
                    </div>
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

function flipEntry(id) {
  let card = document.getElementById(id);
  card.classList.toggle("is-flipped");
}

