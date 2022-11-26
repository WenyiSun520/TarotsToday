async function init() {
    let htmlReturn = ""
    try {
        let allCardsJSON = await fetch(`../api/readings/all`);

        allCardsJSON.forEach(card => {
            htmlReturn += `
        <p><strong>${card.name}</strong></p>
        <img src="/imgs/${card.img}">
        <p>${card.description}</p>
        <br>
        `
        })

        document.getElementById("about-section").innerHTML = htmlReturn
    } catch (error) {
        document.getElementById("about-section").innerHTML = `Hello I'm here ${error}`
    }
}