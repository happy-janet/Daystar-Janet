const express = require ("express");
const router = express.Router();
const passport = require("passport");

//import model
const Register = require("../models/Register")
const Dolls = require("../models/Dolls")
const Sitters = require("../models/Sitters");
const Application = require("../models/Application");

router.get("/register", (req, res) =>{
    res.render("adminregistration");
});

router.post("/register", async(req, res) => {
    try {
        const adminRegister = new Register(req.body);
        console.log(adminRegister)
        await Register.register(adminRegister,req.body.password,(err)=>{
            if(err){
                throw err
            }
            res.redirect("/login")
        })
    } catch (error) {
        res.status(400).send("user not registered")
        console.log(error)
    }
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login", passport.authenticate("local",{failureRedirect: "/login"}), (req, res)=> {
    req.session.user = req.user
    console.log(req.body)
    if(req.user.role === "admin"){
        res.redirect("/admindash")
    }
    else {res.send("you dont have a role in the system")}
 })

 router.get("/logout", (req, res) => {
    if(req.session){
        req.session.destroy((error) => {
            if(error){
                console.log("-----------------------", error)
                return res.status(500).send("error logging out")
            }
            res.redirect("/")
        })
    }
 })

 router.get("/", (req, res) =>{
    res.render("index")
 })

 router.get("/admindash", async (req, res) =>{
  try {
    // Fetch data from the database
    const registeredSittersCount = await Sitters.countDocuments({});
    const availableSittersCount = await Sitters.countDocuments({ available: true });
    const checkedInBabiesCount = await Application.countDocuments({ status: 'CheckedIn' });
    const checkedOutBabiesCount = await Application.countDocuments({ status: 'CheckedOut' });
    const availableDollsCount = await Dolls.countDocuments({ available: true });
    const soldDollsCount = await Dolls.countDocuments({ sold: true });


    // Calculate procurement total by summing up the prices of all sold dolls
    const soldDolls = await Dolls.find({ sold: true });
    const procurementTotal = soldDolls.reduce((total, doll) => total + doll.salePrice, 0) || 0;

    // Calculate total amount paid to sitters by summing up the payments made to all sitters
    const sittersPayments = await Sitters.aggregate([
      { $group: { _id: null, totalPayments: { $sum: "$totalPayment" } } }
    ]);
    const totalAmountPaidToSitters = sittersPayments.length > 0 ? sittersPayments[0].totalPayments : 0;

    // Render the dashboard page and pass the data variables
    res.render("admindash", {
      registeredSittersCount,
      availableSittersCount,
      checkedInBabiesCount,
      checkedOutBabiesCount,
      availableDollsCount,
      soldDollsCount,
      procurementTotal,
      totalAmountPaidToSitters,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching data for dashboard:", error);
    // Render an error page or send an error response
    res.status(500).send("Internal server error");
  }
 })

 router.get("/sittersmanagement", (req, res) =>{
    res.render("sittersmanagement")
 })



//  const async = require('async'); // Import the async library for handling asynchronous operations

 router.get('/search', async (req, res) => {
   try {
     const query = req.query.query;
     
     if (!query) {
       return res.render('search', { query: '', results: [], error: 'Please provide a search query' });
     }
 
     // Define an array of model names you want to search through
     const modelsToSearch = [Sitters, Dolls, Register, Application, Procurement]; // Update this array with your model names
 
     // Perform asynchronous search queries across all models
     async.map(modelsToSearch, (model, callback) => {
       model.find({ $text: { $search: query } }, (err, results) => {
         if (err) {
           return callback(err);
         }
         callback(null, results);
       });
     }, (err, searchResults) => {
       if (err) {
         console.error('Error searching for items:', err);
         return res.status(500).send('Internal server error');
       }
 
       // Flatten the array of search results
       const flattenedResults = searchResults.flat();
 
       // Render the search results using a Pug template
       res.render('search-results', { query, results: flattenedResults });
     });
   } catch (error) {
     console.error('Error searching for items:', error);
     res.status(500).send('Internal server error');
   }
 });
 
  
  

module.exports = router;