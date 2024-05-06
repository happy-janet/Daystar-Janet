const express = require ("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login")

//import model
const Register = require("../models/Register")

router.get("/registersitter", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.render("register_sitter");
  });

  router.post("/registersitter",  connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
    try { 
      const sitter = new Register(req.body);
    console.log(sitter)
    await Register.register(sitter,req.body.password,(err)=>{
      if(err){
        throw err
    }
    res.redirect("/sitterslist")

})
    } catch (error) {
      res.status(400).send("sorry! something wrong happened")
      console.log("Error registering a sitter", error);
    }
    
  });


  //fetching sitters from the database
  router.get("/sitterslist", async(req, res) => {
    try {
      let sitters = await Register.find({})
      res.render("sittersmanagement", {sitters:sitters})
    } catch (error) {
      res.status(400).send("unable to fetch sitters from the database")
    }
  })

  router.post("/delete", async (req, res) => {
    try { 
      await Register.deleteOne({_id:req.body.id});
    res.redirect("back")
    } catch (error) {
      res.status(400).send("unable to delete sitter from the db")
      console.log("Error deleting sitter", error);
    }
    
  });

   //updating sitters in the database
    router.get("/sitterupdate/:id", async(req, res) =>{
      try {
        const sitterupdate = await Register.findOne({_id: req.params.id})
        res.render("sittersupdate", {sitter:sitterupdate})
      } catch (error) {
        console.log("error finding a sitter", error);
        res.status(400).send("unable to find sitters from the db");
      }
    })

    router.post("/sitterupdate", async(req, res) => {
      try {
        await Register.findOneAndUpdate({_id: req.query.id}, req.body);
        res.redirect("/sitterslist")
      } catch (error) {
        res.status(404).send("unable to update sitters in the db");
      }
    })
  

  module.exports = router;