import express from "express";
var router = express.Router();

router.post("/", (req, res) => {
  try {
    // Check if user is authenticated
    if (req.session.isAuthenticated) {
      // Get username and info
      let currentUsername = req.session.account.username;

      let newPost = new req.models.PublicEntry({
        username: String,
        title: String,
        description: String,
        content: {
          typeOfReading: String,
          cards: [String], // array of card ids
          journalEntry: String, // journal entry associated with the reading
          date: Date,
        },
      });
      // Save to database
      await newPost.save();

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

export default router;
