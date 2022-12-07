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

export default router;
