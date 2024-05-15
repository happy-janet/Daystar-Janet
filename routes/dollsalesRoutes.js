const express = require("express");
const router = express.Router();
const Dolls = require("../models/Dolls");

// Route to render the form for adding a new doll
router.get('/dolls', (req, res) => {
    res.render('doll'); // Assuming 'addDollForm' is the name of your Pug template file
  });
  
 // Route to handle adding a new doll
router.post('/dolls', async (req, res) => {
    try {
      const { dollName, price, number } = req.body; // Extract dollName, price, and number from request body
      const newDoll = new Dolls({ dollName, price, number }); // Create a new Dolls object with the extracted fields
      await newDoll.save(); // Save the new doll to the database
      res.redirect('/dolls-table'); // Redirect to the dolls page after successfully adding a doll
    } catch (error) {
      console.error('Error adding doll:', error);
      res.status(500).send('Internal server error');
    }
  });

  // Route to render the sell form for a specific doll
router.get('/sell/:dollId', async (req, res) => {
  try {
      // Find the doll in the database
      const doll = await Dolls.findById(req.params.dollId);
      
      // Render the sell form and pass the doll data to the template
      res.render('sellDoll', { doll });
  } catch (error) {
      console.error('Error rendering sell form:', error);
      res.status(500).send('Internal server error');
  }
});

  
 // Route to sell a doll
router.post('/sell/:dollId', async (req, res) => {
  try {
    const dollId = req.params.dollId;
    const { buyerName, salePrice } = req.body;

    // Find the doll in the database
    const doll = await Dolls.findById(dollId);

    if (!doll) {
      return res.status(404).send('Doll not found.');
    }

    // Mark the doll as sold and update the buyer name and sale price
    doll.sold = true;
    doll.buyerName = buyerName;
    doll.salePrice = salePrice;

    // Save the updated doll to the database
    await doll.save();

    // Redirect to the route for displaying sold dolls
    res.redirect('/sold-dolls');
  } catch (error) {
    console.error('Error selling doll:', error);
    res.status(500).send('Internal server error');
  }
});


// Route to display sold dolls
router.get('/sold-dolls', async (req, res) => {
  try {
    // Query the database for sold dolls
    const soldDolls = await Dolls.find({ sold: true });

    // Render the sold dolls page and pass the sold dolls data to the template
    res.render('solddolls', { soldDolls });
  } catch (error) {
    console.error('Error fetching sold dolls:', error);
    res.status(500).send('Internal server error');
  }
});
  // Route to delete a doll
  router.delete('/dolls/:id', async (req, res) => {
    try {
      const doll = await Dolls.findByIdAndDelete(req.params.id);
      if (!doll) {
        return res.status(404).json({ error: "Doll not found" });
      }
      res.json({ message: "Doll deleted successfully" });
    } catch (error) {
      console.error("Error deleting doll:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Route to render the dolls table
router.get('/dolls-table', async (req, res) => {
    try {
        // Fetch all dolls from the database
        const availableDolls = await Dolls.find({ sold: false });
        const soldDolls = await Dolls.find({ sold: true });

        // Calculate total dolls available and total dolls sold
        const totalDollsAvailable = availableDolls.length;
        const totalDollsSold = soldDolls.length;
        res.render('dollstallsales', {
            availableDolls: availableDolls,
            soldDolls: soldDolls,
            totalDollsAvailable: totalDollsAvailable,
            totalDollsSold: totalDollsSold
        });
    } catch (error) {
        console.error("Error fetching dolls:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



module.exports = router;
