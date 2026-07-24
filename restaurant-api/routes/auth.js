const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure"
  }),
  (req, res) => {
    res.redirect("/api-docs");
  }
);

router.get("/status", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      authenticated: false,
      message: "You are not logged in."
    });
  }

  res.status(200).json({
    authenticated: true,
    user: {
      id: req.user._id,
      displayName: req.user.displayName,
      email: req.user.email,
      photo: req.user.photo
    }
  });
});

router.get("/failure", (req, res) => {
  res.status(401).json({
    message: "Google authentication failed."
  });
});

router.get("/logout", (req, res, next) => {
  req.logout((logoutError) => {
    if (logoutError) {
      return next(logoutError);
    }

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return next(sessionError);
      }

      res.clearCookie("restaurant.sid");

      res.status(200).json({
        message: "Logged out successfully."
      });
    });
  });
});

module.exports = router;