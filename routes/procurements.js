const express = require('express');
const router = express.Router();
const Procurement = require("../models/Procurement")

// Route to render the form for adding a new procurement
router.get('/addprocurement', (req, res) => {
    res.render('procurements'); // Assuming 'addprocurement' is the name of your Pug template file
});

// Route to handle adding a new procurement
router.post('/addprocurement', async (req, res) => {
    try {
        // Extract procurement information from the request body
        const { item, quantity, price, supplier } = req.body;

        // Create a new Procurement object
        const newProcurement = new Procurement({
            item: item,
            quantity: quantity,
            price: price,
            supplier: supplier
        });

        // Save the new procurement to the database
        await newProcurement.save();

        // Redirect to a success page or send a success response
        res.redirect('/procurementlist');
    } catch (error) {
        // Handle any errors
        console.error('Error adding procurement:', error);
        res.status(500).send('Internal server error');
    }
});


// Route to render the procurement list
router.get('/procurementlist', async (req, res) => {
    try {
        // Fetch all procurements from the database
        const procurements = await Procurement.find();
        res.render('procurementlist', { procurements: procurements });
    } catch (error) {
        console.error("Error fetching procurements:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// GET route for the procurement success page
router.get('/procurement/success', (req, res) => {
    res.send('Procurement added successfully!'); // You can render a success page instead
});

module.exports = router;
