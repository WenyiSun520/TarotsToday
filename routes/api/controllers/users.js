import express from "express";
var router = express.Router();

// Gets the current user's identity
router.get("/myIdentity", (req, res, next) => {
  // Check if user is logged into current session
  // Set login status and userInfo
  if (req.session.isAuthenticated) {
    res.json({
      status: "loggedin",
      userInfo: {
        name: req.session.account.name,
        username: req.session.account.username,
      },
    });
  } else {
    // Else set login status as logged out
    res.json({ status: "loggedout" });
    return;
  }
});
// Gets all user's public posts
router.get("/getAllPosts", async(req, res)=>{
  try{
  let username = req.session.account.username;
  let allPosts = await req.models.PublicEntry.find({ username: username });
  res.json(allPosts)
  }catch(error){
    console.log("Error getting user public posts from db", error);
    res.status(500).json({ status: "error", error: error });
  }
});
// Delete User's shared post
router.delete("/postId", async (req, res) => {
  try {
    if (req.session.isAuthenticated) {
      let id = req.query.id;
      // let username = req.session.account.username;

      //delete the post,
       let isPostDelete = await req.models.PublicEntry.deleteOne({
        _id: id,
      });
      //delete the comments related to the post
       let isCommentDelete = await req.models.Comment.deleteMany({
        post: id,
      });

        res.json({ status: "success" });
    } else {
      res.status(401).json({ status: "error", error: "not logged in" });
    }
  } catch (error) {
    console.log("Error deleteing your shared post: ", error);
    res.status(500).json({ status: "error", error: error });
  }
});
// get all comments published by the user
router.get("/getAllComments", async (req, res) => {
  try {
    let username = req.session.account.username;
    let allPosts = await req.models.Comment.find({ username: username });
    res.json(allPosts);
  } catch (error) {
    console.log("Error getting user public posts from db", error);
    res.status(500).json({ status: "error", error: error });
  }
});

// Delete User's comment
router.delete("/commentId", async (req, res) => {
  try {
    if (req.session.isAuthenticated) {
      let id = req.query.id;

      //delete the comments related to the post
      await req.models.Comment.deleteOne({
        _id: id,
      });

        res.json({ status: "success" });
    } else {
      res.status(401).json({ status: "error", error: "not logged in" });
    }
  } catch (error) {
    console.log("Error deleteing comment: ", error);
    res.status(500).json({ status: "error", error: error });
  }
});
export default router;
