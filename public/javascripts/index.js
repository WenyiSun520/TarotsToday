async function init() {
  await loadIdentity()
}

async function loadOneCard() {
    // pull one random card
    // pull all cards
    let response = await fetch("api/readings")
    let cardData = await response.json()
    let htmlReturn = `
    <h2>${cardData.name}</h2>
    <img src="../imgs/cards/${cardData.img}" alt="${cardData.name}" />
    <p>Description: ${cardData.description}</p>
    <p class="d-none" id="cardId">${cardData.id}</p>
    `

    document.getElementById("results").innerHTML = htmlReturn
}

async function saveNewEntry() {
  let cardId = document.getElementById("cardId").innerText
  postOneCard(cardId)
}

async function postOneCard(card_id){
    let responseJson = await fetchJSON(`api/readings`,{
        method: "POST",
        body: {
            card_id : card_id,
            date: Date()
        }
    })

}
