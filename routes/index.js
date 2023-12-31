const router = require("express").Router();
const passport = require("passport");

// The root route renders our only view
router.get("/", function (req, res) {
  res.redirect("/podcasts");
});

// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/podcasts",
    failureRedirect: "/podcasts",
  })
);

// OAuth logout route
router.get("/logout", function (req, res) {
  req.logout(function () {
    //< - req.logout comes from passport, and what it does is destorys the cookie keeping track of the user!
    res.redirect("/podcasts");
  });
});

module.exports = router;
