async function loadOneCard() {
    // pull one random card

    // pull all cards
    let response = await fetch("api/readings")
    let cardData = await response.json()

    let htmlReturn = `
    <h2>${cardData.name}</h2>
    <img src="../imgs/cards/${cardData.img}" alt="${cardData.name}" />
    <p>Description: ${cardData.description}</p>
    `

    document.getElementById("results").innerHTML = htmlReturn

    // draw random number
    // return that card id's image and description to the div
}