

export default async function previewReadings(cardsIdArr) {
  if (cardsIdArr.length == 1) {
    return previewSingle(cardsIdArr[0]);
  } else if (cardsIdArr.length == 3) {
    return previewTriple(cardsIdArr);
  } else if (cardsIdArr.length == 5) {
  }
}
async function previewSingle(id) {
  let oneDescription = await fetch("api/readings/cardId?id=" + id);

  oneDescription = await oneDescription.json();
  let result = `<div id="single-reading">
  Card: ${oneDescription.name}
    <br>Description: ${oneDescription.description}
    </div>
    `;
  return result;
}

async function previewTriple(ids) {
  let result = "";
  for (let i = 0; i < ids.length; i++) {
    let oneDescription = await fetch("api/readings/cardId?id=" + ids[i]);
    oneDescription = await oneDescription.json();
    results += `Card: ${oneDescription.name}
    <br>Description: ${oneDescription.description}
    <`;
  }
  return `<div id="triple-reading"> ${result}</div>`
}
