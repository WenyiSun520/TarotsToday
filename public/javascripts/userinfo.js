async function init() {
  let responseJson = await getEntry();
  responseJson = filterEntry(responseJson);
  await loadEntry(responseJson);
}

// Request and return user entry from endpoint
async function getEntry() {
  // get username to find user entries in users collection

    let username = document.getElementById("userInfoName").textContent;
    // get user entries
    let response = await fetch("api/readings/user?username=" + username);
    let responseJson = await response.json();
    return responseJson;
  
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
    let id = oneRead._id;
    let cleanDate = oneRead.date.substring(0, 10);
    let cleanType = oneRead.typeOfReading.substring(
      0,
      oneRead.typeOfReading.length - 7
    );
    let post = `<p><strong>Date:</strong> ${cleanDate} at ${oneRead.date.substring(
      11,
      16
    )}</p>
                    <p><strong>Type Of Reading:</strong> ${cleanType} card reading</p>
                    <p><strong>Cards:</strong></p>
                    ${await loadCardsDescription(oneRead.cards)}
                    <p class="journal-p"><strong>Journal:</strong> 
                    ${oneRead.journalEntry}</p>`;

    let result = ` <div  class="entry-container"> 
                      <div id="${i}" class="entry-inner" onclick="flipEntry(${i})">
                      <div class="entry-front">
                       <img class="entry-pic" src='../imgs/entry-bg.webp' alt="Entry background picture" />
                      </div>
                    <div class="entry-back">
                    ${post}
                    <button  onclick="openShareWindow('${oneRead._id}')">Share this entry</button>
                    <button class="delete-btn" onclick="deleteEntry('${oneRead._id}')">&#10006;</button>
                    </div>
                    </div>
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

async function deleteEntry(id) {
  // console.log(id);
  let response = await fetch("api/readings/entryId?id=" + id, {
    method: "DELETE",
  });
  let responseJAon = await response.json();
  // console.log(responseJAon.status);
  if (responseJAon.status == "success") {
    init();
  } else {
    alert(responseJAon.error);
  }
}

async function openShareWindow(id) {
  // document.getElementById(id).classList.remove("is-flipped");
  document.querySelector(".share-entry").style.display = "flex";
  let response = await fetch("api/readings/previewPosts?id=" + id);
  let responseJson = await response.json();
  // let results = "";
  if (responseJson.status == "success") {
    let imgTags = responseJson.previewObj.imgs;
    // console.log("imgTags", imgTags);
    for (let i = 0; i < imgTags.length; i++) {
      document.querySelector(".post-preview").innerHTML += imgTags[i];
    }
    document.querySelector(".post-preview").innerHTML +=
      responseJson.previewObj.journal;
  } else {
    document.querySelector(".post-preview").innerHTML =
      "Can't find your preview post";
  }
  let idBox = document.createElement("div");
  idBox.setAttribute("id", "postId");
  idBox.textContent = id;
  document.querySelector(".share-entry").appendChild(idBox);
  document.querySelector("#postId").style.visibility = "hidden";

//   let title = document.querySelector(".title-input").value;
//   let content = document.querySelector(".publicpost-content").value;
//   entryObj = {
//     title:title,
//     content: content,
//     postId : id
//   }
//   console.log("entryObj", entryObj)
}


async function shareEntry() {
  // console.log("I'm in shareEntry");
  let title = document.querySelector(".title-input").value;
  let content = document.querySelector(".publicpost-content").value;
  let id = document.querySelector("#postId").textContent;

  let userIdentity = await fetchJSON(`api/users/myIdentity`);
  let username = userIdentity.userInfo.username;
  // console.log(username);
  let obj = {
    username: username,
    title: title,
    description: content,
    postId: id,
  };
  let response = await fetch("api/forum", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  let responseJson = await response.json();
  console.log(responseJson);
  if (responseJson.status == "Success") {
    document.querySelector(".share-entry").style.display = "none";
    init();
  } else {
   // alert(responseJson.error);
  }
}
