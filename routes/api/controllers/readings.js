import express from "express";
var router = express.Router();

router.get("/", async (req, res) => {
  // P1 respond with the json of a random card
  try {
    let randNum = Math.floor(Math.random() * 77);

    // pull all cards
    let oneCard = await req.models.TarotCard.find({ id: randNum });

    // return the json of the matching id
    console.log(JSON.stringify(oneCard));
    console.log();
    console.log(oneCard[0].name);
    res.json(oneCard[0]);
  } catch (error) {
    console.log("Error connecting to db", error);
    res.status(500).json({ status: "error", error: error });
  }

  // P(later) TO DO: respond with a json of different cards
  //          based on the query parameter "typeOfReading"
});

router.post("/", async (req, res) => {
  try {
    if (req.session.isAuthenticated) {
    //console.log("debug:" + req.body.created_date);
      let currentUsername = req.session.account.username;
      let userInfo = await req.models.Users.findOne({ username: currentUsername });
      if (userInfo == null) {
        // if this is the first-time user, create a schema for the user and save date
        let newUser = new req.models.Users({
          username: currentUsername,
          readings: [{
            typeOfReading: "SingleCard",
            cards: [req.body.card_id], 
            journalEntry: "",
            date: Date()
          }],
        });
        await newUser.save();
      } else {
        userInfo.readings.push({
          typeOfReading: "SingleCard",
          cards: userInfo.readings.cards.push(req.body.card_id), 
          journalEntry: "",
          date: Date()
        });
        await userInfo.save();
      }
      res.send({ status: "success" });
    } else {
      console.log("Error saving post: You haven't Login");
      res.send({ status: "Fail", error: "You haven't login" });
    }
  } catch (error) {
    console.log("Error saving post: ", error);
    res.status(500).json({ status: "error", error: error });
  }
});

