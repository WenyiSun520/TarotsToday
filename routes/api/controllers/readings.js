import express from "express";
var router = express.Router();

// Accepts a query parameter "numOfCards"
// Returns the html for one reading
router.get("/", async (req, res) => {
  let returnHTML;

  // get the right html for the different types of readings
  if (req.query.numOfCards == 1) {
    returnHTML = await oneCardReading(req);
  } else if (req.query.numOfCards == 3) {
    returnHTML = await threeCardReading(req);
  }
  res.send(returnHTML);
});

// Request has a session which has the account that is logged in
// Request has models for users
// Posts (or doesn't post) the new reading and journal entry depending on status
router.post("/", async (req, res) => {
  // respond with the array of the json of the cards
  try {
    // Check if user is authenticated
    if (req.session.isAuthenticated) {
      // Get username and info
      let currentUsername = req.session.account.username;
      let userInfo = await req.models.Users.findOne({
        username: currentUsername,
      });

      if (userInfo == null) {
        // if this is the first-time user, create a schema for the user and save reading
        let newUser = new req.models.Users({
          username: currentUsername,
          // Add their first reading (current one)
          readings: [
            {
              typeOfReading: req.body.typeOfReading,
              cards: req.body.card_id,
              journalEntry: req.body.journal,
              date: Date().toLocaleString("en-US", {
                timeZone: "America/Los_Angeles",
              }),
            },
          ],
        });
        // Save to database
        await newUser.save();
      } else {
        // See if user has already saved an entry for that day
        // Get most recent reading date
        let recentDate = userInfo.readings[userInfo.readings.length - 1].date.toString().substring(0, 10)
        let currentDate = Date().toLocaleString("en-US").substring(0, 10)

        if (recentDate == currentDate) {
          // If yes, show alert
          res.send({ status: "failed", error: "Already entered an entry for today! Please come back again tomorrow!!" })
          return;
        } else {
          // Existing user with no entry today
          userInfo.readings.push({
            typeOfReading: req.body.typeOfReading,
            cards: req.body.card_id,
            journalEntry: req.body.journal,
            date: Date().toLocaleString("en-US"),
          });
          await userInfo.save();
        }
      }
      res.send({ status: "Success" });
    } else {
      // Not signed in
      console.log("Error saving post: You haven't Login");
      res.send({ status: "Fail", error: "You haven't login" });
    }
  } catch (error) {
    console.log("Error connecting to db", error);
    res.status(500).json({ status: "error", error: error });
  }
});

// Takes in username
// Returns json of all readings for user
router.get("/user", async (req, res) => {
  let username = req.query.username;
  try {
    let user = await req.models.Users.findOne({
      // find user in User collection and get all the readings
      username: username,
    });
    let userReadings = user.readings;
    res.json(userReadings);
  } catch (error) {
    console.log("Error fetching user results", error);
    res.status(500).json({ status: "error", error: error });
  }
});

// Takes in card id number
// returns information about the card with the id (name and description)
router.get("/cardId", async (req, res) => {
  let id = req.query.id;

  // log a reading with the right amount of cards
  try {
    // pull all cards
    let oneCard = await req.models.TarotCard.findOne({ id: id });
    let result = `<div class="one-result">
    <div class="title">${oneCard.name}</div> 
    <div class="description"><strong>Description:</strong> ${oneCard.description}</div>
    </div>`;
    // return the json
    res.json(result);
  } catch (error) {
    console.log("Error connecting to db", error);
    res.status(500).json({ status: "error", error: error });
  }
});

// Return all cards in database in json format
router.get("/all", async (req, res) => {
  try {
    // pull all cards
    await req.models.TarotCard.find({}).then((doc) => {
      res.json(doc)
    })
  } catch (error) {
    console.log("Error connecting to db", error);
    res.status(500).json({ status: "error", error: error });
  }
});

export default router;

// Returns html for a single one card reading 
async function oneCardReading(req) {
  try {
    // add meanings for the different cards in relation to where they are in the
    // spread (more relevant in the 3 card readings)
    let meanings = ["This card represents you"];

    // get the json object ready to build
    let returnHTML = {
      cardDisplay: "",
      descriptionDisplay: "",
      cardsId: [],
    };

    // pick one random card
    let randNum = Math.floor(Math.random() * 77);
    let oneCard = await req.models.TarotCard.findOne({ id: randNum });
    returnHTML.cardsId.push(randNum);

    // create the html out of the info
    let random_boolean = Math.random();
    returnHTML.cardDisplay = `
      <div id="cardsJSON" class="d-none" cardsJSON="${JSON.stringify([
      oneCard,
    ])}"></div>
      <div class="col-12 text-center">
        <img class="oneCardDisplayImg ${random_boolean < 0.5 ? "rotate-img" : ""
      }" src="imgs/cards/${oneCard.img}" alt="${oneCard.name}" />
        <p>1</p>
      </div>
    `;
    returnHTML.descriptionDisplay = await createDescriptionDisplay(
      [oneCard],
      meanings
    );

    // return the html
    return returnHTML;
  } catch (error) {
    console.log("Error connecting to db", error);
    res.status(500).json({ status: "error", error: error });
  }
}

// Returns html for a single three card reading 
async function threeCardReading(req) {
  try {
    // add meanings for the different cards in relation to where they are in the spread 
    let meanings = [
      "This card represents the past",
      "This card represents the present",
      "This card represents the future",
    ];

    // get the json object ready to build
    let returnHTML = {
      cardDisplay: "",
      descriptionDisplay: "",
      cardsId: [],
    };

    // get the pulled cards array ready
    let cards = [];

    // pick one 3 random cards
    for (let i = 1; i < 4; i++) {
      let randNum = Math.floor(Math.random() * 77);
      let oneCard = await req.models.TarotCard.findOne({ id: randNum });
      
      // if it's not already in the array add it to the array
      if (!returnHTML.cardsId.includes(randNum)) {
        cards.push(oneCard);
        returnHTML.cardsId.push(randNum);
      } else {
        //otherwise go another round
        i--;
      }
    }

    // create the card display html
    cards.map((card, index) => {
      let random_boolean = Math.random();
      returnHTML.cardDisplay += `
        <div class="col-4 text-center">
          <img class="oneCardDisplayImg ${random_boolean < 0.5 ? "rotate-img" : ""
        }" src="imgs/cards/${card.img}" alt="${card.name}" />
          <p>${index + 1}</p>
        </div>
      `;
    });

    // create the description display html
    returnHTML.descriptionDisplay = await createDescriptionDisplay(
      cards,
      meanings
    );

    // return the results
    return returnHTML;
  } catch (error) {
    console.log("Error connecting to db", error);
    res.status(500).json({ status: "error", error: error });
  }
}

// Takes in array of cards and array of meanings
// Returns the html for the description of the cards 
async function createDescriptionDisplay(cards, meanings) {
  // Create template for displaying description
  let descriptionDisplay = `
    <div class="row" id="descriptionHeader" >
      <div class="col-1">Num</div>
      <div class="col-5">Card Name and Description</div>
      <div class="col-1"></div>
      <div class="col-5">Meaning</div>
    </div>`;

    // Create the html to display for each card in card array
  for (let i = 0; i < cards.length; i++) {
    descriptionDisplay += `
      <div class="row descrRow">
        <div class="col-1">${i + 1}</div>
        <div class="col-5"> 
          <h2>${cards[i].name}</h2>
          <p>${cards[i].description}</p>
        </div>
        <div class="col-1"> ➡ </div>
        <div class="col-5">
          <p>${meanings[i]}</p>
        </div>
      </div>
    `;
  }

  return descriptionDisplay;
}
