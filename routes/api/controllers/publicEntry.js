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

    let userReadings = findUser.readings.find((ele) => ele._id == id);
    // console.log("user's public post: " + userReadings);
    if (userReadings == undefined) {
      res.status(401).json({ status: "error", error: "can't find the post" });
    } else {
      let imgTags = await readingPreview(req, userReadings.cards);
      let postObj = {
        cards: imgTags,
        journal: userReadings.journalEntry,
        date: userReadings.date,
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
        like: [],
        dislike: [],
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
router.post("/likePost", async (req, res) => {
  try {
    if (req.session.isAuthenticated) {
      let postId = req.query.id;
      let post = await req.models.PublicEntry.findById(postId);
      if (post.like.includes(req.session.username)) {
        let index = post.like.indexOf(req.session.username);
        post.like.splice(index, 1);
      } else {
        post.like.push(req.session.username);
      }
      //if the user previsouly dislike the post, and change mind to like, 
      // remove username from dislike array
      if(post.dislike.includes(req.session.username)){
        let index = post.dislike.indexOf(req.session.username);
        post.dislike.splice(index, 1);
      }
      await post.save();
      res.json({ status: "success" });
    } else {
      res.json({
        status: "fail",
        error: "Please login and like or dislike a post",
      });
    }
  } catch (error) {
    console.log("Error updating likes from db", error);
    res.status(500).json({ status: "error", error: error });
  }
});

router.post("/dislikePost", async (req, res) => {
  try {
    if (req.session.isAuthenticated) {
      let postId = req.query.id;
      let post = await req.models.PublicEntry.findById(postId);
      if (post.dislike.includes(req.session.username)) {
        let index = post.dislike.indexOf(req.session.username);
        post.dislike.splice(index, 1);
      } else {
        post.dislike.push(req.session.username);
      }
      //if the user previsouly like the post, and change mind to dislike,
      // remove username from like array
      if (post.like.includes(req.session.username)) {
        let index = post.like.indexOf(req.session.username);
        post.like.splice(index, 1);
      }
      await post.save();
      res.json({ status: "success" });
    } else {
      res.json({
        status: "fail",
        error: "Please login and like or dislike a post",
      });
    }
  } catch (error) {
    console.log("Error updating likes from db", error);
    res.status(500).json({ status: "error", error: error });
  }
});

export default router;
