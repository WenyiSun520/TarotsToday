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

    document.getElementById("userInfoName").innerHTML = `<h1>${username}</h1>`;

    for (let i = 0; i < responseJson.length; i++) {
      let oneRead = responseJson[i];

      // let result = `<div class="entry-container">
      //               <div id="${i}" class="entry-inner" onclick="flipEntry(${i})">
      //               <div class="entry-front">
      //               <img class="entry-pic" src='../imgs/entry-bg.webp' alt="Entry background picture" />
      //               </div>
      //               <div class="entry-back">
      //               Date: ${oneRead.date}
      //               <p>Type Of Reading: ${oneRead.typeOfReading}</p>
      //               <p>Cards:</p>
      let cleanDate = oneRead.date.substring(0, 10);
      let cleanType = oneRead.typeOfReading.substring(
        0,
        oneRead.typeOfReading.length - 7
      );

      let result = ` <div  class="entry-container"> 
                      <div id="${i}" class="entry-inner" onclick="flipEntry(${i})">
                      <div class="entry-front">
                       <img class="entry-pic" src='../imgs/entry-bg.webp' alt="Entry background picture" />
                      </div>
                    <div class="entry-back">
                    <p><strong>Date:</strong> ${cleanDate} at ${oneRead.date.substring(11,16)}</p>
                    <p><strong>Type Of Reading:</strong> ${cleanType} card reading</p>
                    <p><strong>Cards:</strong></p>
                    ${await loadCardsDescription(oneRead.cards)}
                    <p class="journal-p"><strong>Journal:</strong> ${
                      oneRead.journalEntry
                    }</p>
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
