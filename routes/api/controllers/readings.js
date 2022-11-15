import express from "express";
var router = express.Router();

// accepts a query parameter "numOfCards"
router.get("/", async (req, res) => {

  // log a reading with the right amount of cards
  try {

    let cardIDs = []
    let cards = []
    
    // add the new cards to the cards array based on how many cards we need
    for (let i = 0; i < parseInt(req.query.numOfCards); i++) {
      // find a random card
      let randNum = Math.floor(Math.random() * 77);
      let oneCard = await req.models.TarotCard.findOne({ id: randNum });

      // check that it isn't in there already
      if (!cards.includes(oneCard)) {
        // add card id to what we'll send to the database
        cardIDs.push(oneCard._id)
        // add card json to what we'll send in the response
        cards.push(oneCard)
      } else { // run it again
        i--
      }
    }

    // make a new reading in the database
    let newReading = new req.models.Reading({
      username: req.session.account.username,
      reading_type: "SingleCardReading",
      tarot_cards: cardIDs, // ids of the tarot cards pulled
      // journal_entry: Number, // id of the journal entry associated with the reading
      date: Date // date drawn
    });

  } catch (error) {
    console.log("Error connecting to db", error);
    res.status(500).json({ status: "error", error: error });
  }

  // repsond with the array of the json of the cards
  try {
    res.send(cards)
  } catch (error) {
    console.log("Error connecting to db", error);
    res.status(500).json({ status: "error", error: error });
  }

});





export default router;



// ---- OUTDATED BUT STILL USEFUL ----

// router.post("/", async (req, res) => {
//   try {
//     if (req.session.isAuthenticated) {
//     //console.log("debug:" + req.body.created_date);
//       let name = req.session.account.username;
//       let userInfo = await req.models.Users.findOne({ username: name });
//       if (userInfo == null) {
//         // if this is the first-time user, create a schema for the user and save date
//         let newCard = new req.models.Users({
//           username: req.session.account.username,
//           drawnCard: {
//             card_id: req.body.card_id,
//             created_date: req.body.created_date
//           },
//         });
//         await newCard.save();
//       } else {
//         userInfo.drawnCard.push({
//           card_id: req.body.card_id,
//           created_date: req.body.created_date
//         });
//         userInfo.save();
//       }
//       res.send({ status: "success" });
//     } else {
//       console.log("Error saving post: You haven't Login");
//       res.send({ status: "Fail", error: "You haven't login" });
//     }
//   } catch (error) {
//     console.log("Error saving post: ", error);
//     res.status(500).json({ status: "error", error: error });
//   }
// });

