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
    let newCard = new req.models.Users({
      username: req.session.account.username,
      drawnCard: [
        {
          card_id: req.card_id,
          date: req.date,
        },
      ],
    });
    await newCard.save();
    res.send({ status: "success" });
  } catch (error) {
    console.log("Error saving post: ", error);
    res.status(500).json({ status: "error", error: error });
  }
});

export default router;
