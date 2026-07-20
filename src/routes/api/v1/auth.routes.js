const express = require("express");
const {
  register,
  verifyOTP,
  login,
  generateNewTokens,
  logout,
  generateTokens
} = require("../../../controllers/auth.controller");
const passport = require("passport");
const Users = require("../../../models/auth.model");
const router = express.Router();

router.post("/register", register);
router.post("/verifyOTP", verifyOTP);
router.post("/login", login);
router.post("/generateNewTokens", generateNewTokens);
router.post("/logout", logout);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async function (req, res) {
    console.log("callback", req.user); //6
    
    const { accessToken, refreshToken } = await generateTokens(req.user?._id);
    
        console.log(accessToken, refreshToken);
    
        const userD = await Users.findOne({ email: req.user?.email }).select("-password");
    
        res
          .status(200)
          .cookie("accessToken", accessToken, {
            maxAge: 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
          })
          .cookie("refreshToken", refreshToken, {
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
          })
          .json({
            success: true,
            data: userD,
            message: "Login successfully.",
          });
    // Successful authentication, redirect home.
    // res.redirect("/");
  },
);

module.exports = router;
