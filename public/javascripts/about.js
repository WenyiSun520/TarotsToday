// import {cards} from '../../data/tarotDeck.json'
// TODO make a button/link that accesses the page
import {promises as fs} from 'fs'
let cards = fs.readFile("../../data/tarotDeck.json", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  return jsonString
});

export async function getAllCards() {
    let htmlReturn = ""

    cards.forEach(card => {
        htmlReturn += `
        <p><strong>${card.name}</strong></p>
        <img src="${card.img}">
        <p>${card.description}</p>
        <br>
        `
    })

    document.getElementById("about-section").innerHTML = htmlReturn
}