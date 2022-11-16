import express from "express";
var router = express.Router();


router.post("/", async (req, res) => {
  try {
    if (req.session.isAuthenticated) {
    //console.log("debug:" + req.body.created_date);
      let name = req.session.account.username;
      let userInfo = await req.models.Users.findOne({ username: name });
      if (userInfo == null) {
        // if this is the first-time user, create a schema for the user and save date
        let newUser = new req.models.Users({
          username: req.session.account.username,
          readings: [{
            typeOfReading: "SingleCard",
            cards: [req.body.card_id], 
            journalEntry: ""
          }],
        });
        await newUser.save();
      } else {
        userInfo.readings.push({
          typeOfReading: "SingleCard",
          cards: [req.body.card_id], 
          journalEntry: ""
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

