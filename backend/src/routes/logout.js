const express = require("express");
const addRole = require("../models/roles");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      req.user.tokens = [];
      res.clearCookie("jwt", {
        domain: "ggitscodeclubcopy.vercel.app",
        path: "/",
      });
      await req.user.save();
      res.status(200).send("logout successfull");
    }
  } catch (error) {
    console.log("user not logged in");
    res.status(401).send("User not logged in.");
  }
});

module.exports = router;
