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
    console.log("debug:" + req.body.created_date);
      let name = req.session.account.username;
      let userInfo = await req.models.Users.findOne({ username: name });
      if (userInfo == null) {
        // if this is the first-time user, create a schema for the user and save date
        let newCard = new req.models.Users({
          username: req.session.account.username,
          drawnCard: {
            card_id: req.body.card_id,
            created_date: req.body.created_date
          },
        });
        await newCard.save();
      } else {
        userInfo.drawnCard.push({
          card_id: req.body.card_id,
          created_date: req.body.created_date
        });
        userInfo.save();
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

export default router;
