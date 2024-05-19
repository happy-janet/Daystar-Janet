
const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");
const Sitters = require("../models/Sitters");
const Procurement = require("../models/Procurement");
const Dolls = require("../models/Dolls");
const Application = require("../models/Application");


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
    const filters = {};
		const q = req.query.q;
		if (q) {
			// Filter by sitter name (first or last name) - like
			filters.$or = [
        { firstName: { $regex: q, $options: 'i' } },
        { lastName: { $regex: q, $options: 'i' } }
      ];
		}
    const sitters = await Sitters.find(filters);
    res.render("sittersmanagement", { sitters: sitters, q });
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

// route for /sitterCheckin - changes the available status of a sitter to true
router.post("/sitterCheckin/:id", async (req, res) => {
	try {
		await Sitters.findOneAndUpdate({ _id: req.params.id }, { available: false });
		res.redirect("/sitterslist");
	} catch (error) {
		res.status(404).send("Unable to check in sitter in the database.");
		console.error("Error checking in sitter:", error);
	}
});

// route for /sitterCheckout - changes the available status of a sitter to false
router.post("/sitterCheckout/:id", async (req, res) => {
	try {
		await Sitters.findOneAndUpdate({ _id: req.params.id }, { available: true });
		res.redirect("/sitterslist");
	} catch (error) {
		res.status(404).send("Unable to check out sitter in the database.");
		console.error("Error checking out sitter:", error);
	}
});

// Route to display the payment management page
router.get('/payments', async (req, res) => {
  try {
      // Fetch all sitters from the database and for each one count the total applications with that sitterID and status 'checkedIn'
      let sitters = await Sitters.find({});
			sitters = await Promise.all(sitters.map(async sitter => {
				const babiesAttended = await Application.countDocuments({ sitterId: sitter._id, paid: false });
				return { ...sitter.toObject(), babiesAttended };
			}));

      res.render('payments', { sitters });
  } catch (error) {
      console.error("Error fetching sitters:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});


// Route to update the number of babies attended by a sitter and calculate total payment
router.post('/payments/:id', async (req, res) => {
  const sitterId = req.params.id;

  try {
      // Find the sitter in the database
      const sitter = await Sitters.findById(sitterId);

      if (!sitter) {
          return res.status(404).send('Sitter not found.');
      }

      // Update all applications with the sitterId and paid false to true
			await Application.updateMany({ sitterId, paid: false }, { paid: true });

      res.redirect('/payments');
  } catch (error) {
      console.error('Error updating payment:', error);
      res.status(500).send('Internal server error');
  }
});

// Route to render the dashboard page
router.get("/dashboard", async (req, res) => {
  try {
    // Fetch data from the database
    const registeredSittersCount = await Sitters.countDocuments({});
    const availableSittersCount = await Sitters.countDocuments({ available: true });
    const checkedInBabiesCount = await Babies.countDocuments({ checkedIn: true });
    const checkedOutBabiesCount = await Babies.countDocuments({ checkedOut: true });
    const availableDollsCount = await Dolls.countDocuments({ available: true });
    const soldDollsCount = await Dolls.countDocuments({ sold: true });

    // Calculate procurement total by summing up the prices of all sold dolls
    const soldDolls = await Dolls.find({ sold: true });
    const procurementTotal = soldDolls.reduce((total, doll) => total + doll.salePrice, 0);

    // Calculate total amount paid to sitters by summing up the payments made to all sitters
    const sittersPayments = await Sitters.aggregate([
      { $group: { _id: null, totalPayments: { $sum: "$totalPayment" } } }
    ]);
    const totalAmountPaidToSitters = sittersPayments.length > 0 ? sittersPayments[0].totalPayments : 0;

    // Render the dashboard page and pass the data variables
    res.render("dashboard", {
      registeredSittersCount,
      availableSittersCount,
      checkedInBabiesCount,
      checkedOutBabiesCount,
      availableDollsCount,
      soldDollsCount,
      procurementTotal,
      totalAmountPaidToSitters
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching data for dashboard:", error);
    // Render an error page or send an error response
    res.status(500).send("Internal server error");
  }
});



module.exports = router;
