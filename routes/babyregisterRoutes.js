
const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

// Import model
const Sitters = require("../models/Sitters");
const Application = require("../models/Application");

// Define sitters as an empty array
let sitters = [];

// Fetch sitters from the database
const fetchSitters = async () => {
  try {
		// Fetch only available sitters
    sitters = await Sitters.find({ available: true });
    console.log("Fetched sitters:", sitters);
  } catch (error) {
    console.error("Error fetching sitters:", error);
  }
};

// Call fetchSitters function to populate sitters array
fetchSitters();

router.get("/registerbaby", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("registerbaby");
});

router.post("/registerbaby", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    const baby = new Application(req.body);
    console.log("New baby:", baby);
    await baby.save();
    res.redirect("/babieslist");
  } catch (error) {
    res.status(400).send("Error: baby not registered");
    console.error("Error registering baby:", error);
  }
});

// Fetching babies from the database
router.get("/babieslist", async (req, res) => {
  try {
    const babies = await Application.find();
    console.log("Fetched babies:", babies);
    res.render("babiesmanagement", { babies: babies });
  } catch (error) {
    res.status(400).send("Unable to fetch babies from the database");
    console.error("Error fetching babies:", error);
  }
});

router.post("/deleted", async (req, res) => {
  try {
    await Application.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (error) {
    res.status(400).send("Unable to delete baby from the database");
    console.error("Error deleting baby:", error);
  }
});

// Updating babies in the database
router.get("/babyupdate/:id", async (req, res) => {
  try {
    const babyupdate = await Application.findOne({ _id: req.params.id });
    res.render("babyupdate", { babies: babyupdate });
  } catch (error) {
    console.error("Error finding baby:", error);
    res.status(400).send("Unable to find baby in the database");
  }
});

router.post("/babyupdate", async (req, res) => {
  try {
    await Application.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/babieslist");
  } catch (error) {
    res.status(404).send("Unable to update baby in the database");
    console.error("Error updating baby:", error);
  }
});

// Get route to render the check-in form
router.get("/checkin", async (req, res) => {
  await fetchSitters(); // Wait for sitters to be fetched
  res.render("checkin", { sitters: sitters });
});

router.post("/checkin", async (req, res) => {
  try {
    // Extract check-in form data from the request body
    const { babyName, babyGender, babyAge, babyLocation, guardianName, arrivalTime, parentsNames, stayDuration, amount, babyNumber, sitter } = req.body;

    // Create a new instance of the Application model
    const newApplication = new Application({
      babyName,
      gender: babyGender,
      age: babyAge,
      location: babyLocation,
      timeOfArrival: arrivalTime,
      parentsName: parentsNames,
      amount: parseInt(amount), // Convert amount to number
      periodOfStay: stayDuration,
      babyNumber,
      sitter,
      clockInTime: new Date(), // Set current time as clock-in time
      status: "CheckedIn" // Set status to CheckedIn
    });

    // Save the new application to the database
    await newApplication.save();

    // Send a success response
    res.send(`Baby "${babyName}" has been checked in with Sitter "${sitter}".`);
  } catch (error) {
    // Handle errors
    console.error("Error checking in baby:", error);
    res.status(500).send("Error checking in baby");
  }
});


// Route to fetch the list of checked-in babies
router.get("/checkedInBabies", async (req, res) => {
  try {
    // Find all babies with status "CheckedIn"
    const checkedInBabies = await Application.find({ status: "CheckedIn" });

    res.render("checkedInBabies", { babies: checkedInBabies });
  } catch (error) {
    console.error("Error fetching checked-in babies:", error);
    res.status(500).send("Internal server error");
  }
});

// Route to fetch the list of checked-in babies
router.get("/checkedOutBabies", async (req, res) => {
  try {
    // Find all babies with status "CheckedIn"
    const checkedInBabies = await Application.find({ status: "CheckedOut" });

    res.render("checkedInBabies", { babies: checkedInBabies });
  } catch (error) {
    console.error("Error fetching checked-in babies:", error);
    res.status(500).send("Internal server error");
  }
});

// Route to handle the checkout form submission
router.post("/babyCheckout/:id", async (req, res) => {
  try {
    // Find the baby by ID
    const baby = await Application.findById(req.params.id);
    if (!baby) {
      // If the baby is not found, return a 404 error
      return res.status(404).send("Baby not found");
    }
    // Update the baby's data to mark them as checked out
    baby.checkoutTime = req.body.checkoutTime;
    baby.pickupPerson = req.body.pickupPerson;
    baby.contact = req.body.contact;
    baby.status = "CheckedOut";
    // Save the updated baby data
    await baby.save();
    // Redirect to a confirmation page or another appropriate route
    res.redirect("/checkedOutBabies");
  } catch (error) {
    // If an error occurs, return a 500 error
    console.error("Error checking out baby:", error);
    res.status(500).send("Internal server error");
  }
});





module.exports = router;

