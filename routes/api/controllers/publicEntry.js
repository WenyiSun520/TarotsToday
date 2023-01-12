import express from "express";
var router = express.Router();
router.get("/", async (req, res) => {
  try {
    let allPosts = await req.models.PublicEntry.find();
    res.json(allPosts);
  } catch (error) {
    console.log("Error getting public post from db", error);
    res.status(500).json({ status: "error", error: error });
  }
});

router.get("/user/:username?/post/:postId?", async (req, res) => {
  try {
    let username = req.params.username;
    let id = req.params.postId;
    // console.log("username: " + username + " id: " + id);
    let findUser = await req.models.Users.findOne({ username: username });
    // console.log("user's posts: " + findUser);
  
    let userReadings = findUser.readings.find((ele)=>ele._id == id)
    // console.log("user's public post: " + userReadings);
    if (userReadings == undefined) {
      res.status(401).json({ status: "error", error: "can't find the post" });
    } else {
      let imgTags = await readingPreview(req, userReadings.cards)
      let postObj = {
        cards: imgTags,
        journal: userReadings.journalEntry,
        date: userReadings.date
      };
  
      res.json({ status: "success", postObj: postObj });
    }
  } catch (error) {
    console.log("Error getting public post from db", error);
    res.status(500).json({ status: "error", error: error });
  }
});
async function readingPreview(req, entry) {
  let imgTags = await Promise.all(
    entry.map(async (id) => {
      let oneCard = await req.models.TarotCard.findOne({ id: id });
      return `<img class="oneCardDisplayImg" src="imgs/cards/${oneCard.img}" alt="${oneCard.name}" />`;
    })
  );
  // console.log("imgTags", imgTags)
  return imgTags;
}

router.post("/", async (req, res) => {
  try {
    // Check if user is authenticated
    if (req.session.isAuthenticated) {
      // Get username and info
      // let currentUsername = req.session.account.username;
      let username = req.body.username;
      let title = req.body.title;
      console.log("test post to public entry: " + username + " " + title);

      let newPost = new req.models.PublicEntry({
        username: req.body.username,
        title: req.body.title,
        description: req.body.description,
        content: req.body.postId,
      });
      console.log("test new post", newPost);
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
