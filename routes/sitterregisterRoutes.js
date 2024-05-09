
const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");
const Sitters = require("../models/Sitters");

router.get("/registersitter", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("register_sitter");
});

router.post("/registersitter", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    // Create a new sitter instance with the data from the request body
    const sitter = new Sitters(req.body);
    // Save the sitter to the database
    await sitter.save();
    res.redirect("/sitterslist");
  } catch (error) {
    res.status(400).send("Sorry! Something went wrong while registering the sitter.");
    console.error("Error registering a sitter:", error);
  }
});

// Fetching sitters from the database
router.get("/sitterslist", async (req, res) => {
  try {
    const sitters = await Sitters.find({});
    res.render("sittersmanagement", { sitters: sitters });
  } catch (error) {
    res.status(400).send("Unable to fetch sitters from the database.");
    console.error("Error fetching sitters:", error);
  }
});

router.post("/delete", async (req, res) => {
  try {
    await Sitters.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (error) {
    res.status(400).send("Unable to delete sitter from the database.");
    console.error("Error deleting sitter:", error);
  }
});

// Updating sitters in the database
router.get("/sitterupdate/:id", async (req, res) => {
  try {
    const sitterupdate = await Sitters.findOne({ _id: req.params.id });
    res.render("sittersupdate", { sitter: sitterupdate });
  } catch (error) {
    res.status(400).send("Unable to find sitter in the database.");
    console.error("Error finding sitter:", error);
  }
});

router.post("/sitterupdate", async (req, res) => {
  try {
    await Sitters.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/sitterslist");
  } catch (error) {
    res.status(404).send("Unable to update sitter in the database.");
    console.error("Error updating sitter:", error);
  }
});

module.exports = router;
