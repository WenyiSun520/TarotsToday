async function init() {
  let responseJson = await getEntry();
  responseJson = filterEntry(responseJson);
  await loadEntry(responseJson);
}

// Request and return user entry from endpoint
async function getEntry() {
  // get username to find user entries in users collection
  let userIdentity = await fetchJSON(`api/users/myIdentity`);
  if (userIdentity.status == "loggedin") {
    let username = userIdentity.userInfo.username;
    document.getElementById("userInfoName").innerHTML = `<h1>${username}</h1>`;
    // get user entries
    let response = await fetch("api/readings/user?username=" + username);
    let responseJson = await response.json();
    return responseJson;
  }
}

//sort entries
function sortEntry(responseJson) {
  let selection = document.getElementById("time-sorting");
  let selectedValue = selection.options[selection.selectedIndex].value;
  if (selectedValue == "most-recent") {
    let stack = [];
    for (let i = responseJson.length - 1; i >= 0; i--) {
      stack.push(responseJson[i]);
    }
    return stack;
  }
  return responseJson;
}

//filter readings
function filterEntry(responseJson) {
  let readingTypes = document.getElementsByName("reading-filter");
  let selectFilter = "";
  for (let i of readingTypes) {
    if (i.checked) {
      console.log("i.checked is: " + i.value);
      selectFilter = i.value;
    }
  }

  if (selectFilter != "all-reading") {
    results = responseJson.filter((entry) => {
      return entry.typeOfReading === selectFilter;
    });
    return results;
  } else {
    return responseJson;
  }
}
// Returns HTML for all the user's past entried based on users selction and filter
async function loadEntry(responseJson) {
  responseJson = sortEntry(responseJson);
  document.getElementById("results").innerHTML = "";
  for (let i = 0; i < responseJson.length; i++) {
    let oneRead = responseJson[i];
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

                    <p><strong>Date:</strong> ${cleanDate} at ${oneRead.date.substring(
      11,
      16
    )}</p>
                    <p><strong>Type Of Reading:</strong> ${cleanType} card reading</p>
                    <p><strong>Cards:</strong></p>
                    ${await loadCardsDescription(oneRead.cards)}
                    <p class="journal-p"><strong>Journal:</strong> 
                    ${oneRead.journalEntry}</p>
                    </div>
                   
                    </div>
                    <button onclick="deleteEntry('${oneRead._id}')">&#10006;</button>
                    </div>
                   `;
    document.getElementById("results").innerHTML += result;
  }
}

// returns HTML descriptions off all the cards in the array it receives
async function loadCardsDescription(cardsArr) {
  let results = "";
  for (let i = 0; i < cardsArr.length; i++) {
    let oneDescription = await fetch("api/readings/cardId?id=" + cardsArr[i]);
    oneDescription = await oneDescription.json();
    results += `${oneDescription}`;
  }
  return results;
}
//flips all cards on the DOM
function flipAllEntries() {
  let isFlip = document.querySelector('input[id="is-all-flip"]:checked');
  if (isFlip == null) {
    document.querySelectorAll(".entry-inner").forEach((card) => {
      card.classList.toggle("is-flipped");
    });
  } else {
    document.querySelectorAll(".entry-inner").forEach((card) => {
      card.classList.toggle("is-flipped");
    });
  }
}
// flips the card on the DOM
function flipEntry(id) {
  let card = document.getElementById(id);
  card.classList.toggle("is-flipped");
}

async function deleteEntry(id){
  console.log(id);
  let response = await fetch("api/readings/entryId?id=" + id, {
    method: "DELETE"
  });
  let responseJAon = await response.json();
    console.log(responseJAon.status);
  if (responseJAon.status == "success") {
    init();
  } else {
    alert(responseJAon.error);
  }
}
