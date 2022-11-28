async function init() {
    let htmlReturn = `<div class="row">`
    try {
        let allCardsJSON = await (await fetch(`../api/readings/all`)).json()

        allCardsJSON.forEach((card) => {
            htmlReturn += `<div class="col-sm-3 about-card">
            <p class="about-card-name"><strong>${card.name}</strong></p>
            <img src="/imgs/cards/${card.img}" class="about-card-img">
            <p>${card.description}</p>
        </div>
        <br>
        `
        })

        htmlReturn += "</div>"

        document.getElementById("about-section").innerHTML = htmlReturn
    } catch (error) {
        document.getElementById("about-section").innerHTML = `${error}`
    }
}