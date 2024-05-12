const express = require ("express");
const router = express.Router();
const passport = require("passport");

//import model
const Register = require("../models/Register")
const Dolls = require("../models/Dolls")

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
            res.redirect("/register")
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
    // else if (req.user.role === "sitter"){
    //     res.redirect("/sitterdash")
    // }
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

 router.get("/admindash", (req, res) =>{
    res.render("admindashboard")
 })

 router.get("/sitterdash", (req, res) =>{
    res.render("sittersdashboard")
 })

 router.get("/sittersmanagement", (req, res) =>{
    res.render("sittersmanagement")
 })

 router.get("/income", (req, res) =>{
    res.render("income")
 })


 router.get("/income", async(req, res) =>{
    try {
        const dolls = await Dolls.find();
        const payments = await Babypayments.find();
        res.render("income", {dolls:dolls, payments:payments})
      } catch (error) {
        res.status(400).send("unable to fetch babies from the database")
      }
    res.render("income")
 })


router.get('/search', (req, res) => {
    // Retrieve the search query from the request parameters
    const query = req.query.query;
    // Check if the query is defined before processing it
    if (query) {
      // Filter items based on whether they contain the search query
      const results = items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
      // Render the search results using a Pug template
      return res.render('search', { query, results });
    } else {
      // If no query is provided, render the search form again with an error message
      return res.render('search', { query: '', results: [], error: 'Please provide a search query' });
    }
  });
  
  
  

module.exports = router;