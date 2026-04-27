const express = require("express");
const router = express.Router();
const authUserController = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/authMiddleware");
const passport = require("passport");

router.get("/sign-up", authUserController.signUpGet);
router.post("/sign-up", authUserController.signUpPost);

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);

router.get("/log-out", authUserController.logOut);

router.get("/join-club", isAuthenticated, (req, res) => res.render("join-club"));
router.post("/join-club", isAuthenticated, authUserController.joinClubPost);

module.exports = router;
