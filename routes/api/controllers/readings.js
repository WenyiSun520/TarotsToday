import express from "express";
var router = express.Router();

// accepts a query parameter "numOfCards"
router.get("/", async (req, res) => {

  // log a reading with the right amount of cards
  try {
    //for the push
    let randNum = Math.floor(Math.random() * 77);

    // pull all cards
    let oneCard = await req.models.TarotCard.findOne({ id: randNum });

    // return the json of the matching id
    res.json(oneCard);
  } catch (error) {
    console.log("Error connecting to db", error);
    res.status(500).json({ status: "error", error: error });
  }
})

router.post("/", async (req, res) => {
  // repsond with the array of the json of the cards
  try {
    if (req.session.isAuthenticated) {
      // console.log("debug: made it into post");
      // Get username and info
      let currentUsername = req.session.account.username;
      let userInfo = await req.models.Users.findOne({ username: currentUsername });
      if (userInfo == null) {
        // if this is the first-time user, create a schema for the user and save reading
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
        // Existing user
        userInfo.readings.push({
          typeOfReading: "SingleCard",
          cards: [req.body.card_id],
          journalEntry: "",
          date: Date()
        });
        await userInfo.save();
      }

      res.send({ status: "success" });

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


export default router;