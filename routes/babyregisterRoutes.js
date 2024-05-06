const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login")

//import model
const Register = require("../models/Register");
const Application = require("../models/Application");

router.get("/registerbaby", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("registerbaby");
});

router.post("/registerbaby",  connectEnsureLogin.ensureLoggedIn(), async(req, res) => {
  try {
    const baby = new Application(req.body);
    console.log("New baby:", baby);
    await baby.save()
    res.redirect("/babieslist")
  } catch (error) {
    res.status(400).send("error, baby not registered")
    console.log("baby not registered", error)
  }
 
});

//fetching babies from the database
router.get("/babieslist", async(req, res) => {
  try {
    let babies = await Application.find();
    console.log("Fetched babies:", babies);
    res.render("babiesmanagement", {babies:babies})
  } catch (error) {
    res.status(400).send("unable to fetch babies from the database")
  }
})

router.post("/deleted", async (req, res) => {
  try { 
    await Application.deleteOne({_id:req.body.id});
  res.redirect("back")
  } catch (error) {
    res.status(400).send("unable to delete baby from the db")
    console.log("Error deleting baby", error);
  }
  
});

 //updating babies  in the database
  router.get("/babyupdate/:id", async(req, res) =>{
    try {
      const babyupdate = await Application.findOne({_id: req.params.id})
      res.render("babyupdate", {babies:babyupdate})
    } catch (error) {
      console.log("error finding a baby", error);
      res.status(400).send("unable to find babies from the db");
    }
  })

  router.post("/babyupdate", async(req, res) => {
    try {
      await Application.findOneAndUpdate({_id: req.query.id}, req.body);
      res.redirect("/babieslist")
    } catch (error) {
      res.status(404).send("unable to update babies in the db");
    }
  })
  
  // Fetching list of all babies clocked in from the database
router.get("/clockedinlist", async (req, res) => {
  try {
    // Find all babies with the status "ClockedIn"
    const babies = await Application.find({ status: "ClockedIn" });
    console.log("Clocked-in babies:", babies);
    // Render the "clockedinlist" template and pass the list of babies
    res.render("clockedinlist", { babies: babies });
  } catch (error) {
    console.error("Error fetching clocked-in babies:", error);
    res.status(500).send("Unable to fetch clocked-in babies from the database!");
  }
});


     //clockin baby route for form in database
 router.get("/babyClockIn/:id", async(req, res)=> { 
  try{
     const sitters  = await Register.find()
    const babyClockIn = await Application.findOne({_id: req.params.id});
    res.render("clockedin", {
     baby:babyClockIn,
     sitters:sitters
  });

  } catch(error){
     console.log("error finding a baby!", error);
     res.status(400).send("unable to find baby from the db!");  
  } 
})

router.post("/babyClockIn", async (req, res) => {
  try {
    // Extract the baby's ID from the request body
    const babyId = req.body.id;

    // Update the baby's data in the database
    const updatedBaby = await Application.findOneAndUpdate({ _id: babyId }, req.body);

    // Log the updated baby document
    console.log("Updated baby:", updatedBaby);

    // Redirect to the clockedinlist page
    res.redirect("/clockedinlist");
  } catch (error) {
    console.error("Error updating baby in the database:", error);
    res.status(500).send("Unable to update baby in the database!");
  }
});




// router.post("/babyClockIn", async(req, res)=> {
//   try {
//      await Application.findOneAndUpdate({_id: req.query.id}, req.body);
//      res.redirect("/clockedinlist");

//   } catch (error) {
//      res.status(404).send("unable to update baby in the db!");  
//   }
// })



module.exports = router;
