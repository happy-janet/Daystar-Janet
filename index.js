//Dependencies
const express = require("express"); //for posting
const mongoose = require("mongoose") //for mongodb
const path=require("path"); 
const passport = require("passport");
const moment = require("moment")
const expressSession = require("express-session")({
  secret:"secret",
  resave:false,
  saveUninitialized:false
})

require("dotenv").config();

//import register model with user details
const Register = require("./models/Register")
const Sitters = require("./models/Sitters")

const port = 3700;

//importing routes
const  registrationRoutes = require("./routes/babyregisterRoutes")
const authRoutes = require("./routes/authenticationRoutes")
const sitterRegistrationRoutes = require("./routes/sitterregisterRoutes")

  //Instantiations
const app = express();

//Configgurations
mongoose.connect(process.env.DATABASE,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", err => {
    console.error(`Connection error: ${err.message}`);
 });

 app.locals.moment = moment;

app.set("view engine", "pug"); //set view engine to pug
app.set("views", path.join(__dirname, "views")); //specify the directory where the view findings are found


//Middleware
app.use(express.static(path.join(__dirname, "public"))) //set director for static files
app.use(express.urlencoded({extended:true}))
app.use(express.json());

//Express session configurations
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

//passport configurations
passport.use(Register.createStrategy());
passport.serializeUser(Register.serializeUser());
passport.deserializeUser(Register.deserializeUser());

//use imported routes
app.use("/", registrationRoutes);
app.use("/", authRoutes);
app.use("/", sitterRegistrationRoutes);
// app.get("/login", (req, res) => {
//   res.render("login")
// });
// app.use("/login", loginRoutes);

//this is a route

// app.get("/", (req, res) => {
//   res.send("Homepage! Hello world.");
// });

// app.get("/about", (req, res) => {
//   res.send("About page. Nice.");
// });

// //syntax of a route
// //   app.METHOD(PATH, HANDLER);

// app.get("/course", (req, res) => {
//   res.send("You have hit the courses page");
// });

// app.get('/books/:bookId', (req, res) => {
//   res.send(req.params.bookId);
//   console.log(req.params.bookId)
// });

// app.get('/students/:name', (req, res) => {
//   res.send( "This is my students name " + req.params.name);
// });

// app.get("/students/:studentId", (req, res) => {
//   res.send("xx " + req.params.studentId);
//   console.log("studentId " + req.params);
// });

// //querry params
// app.get("/students", (req, res) => {
//   res.send("This is class " + req.query.class + "Cohort " + req.query.cohort);
// });

// app.get("/babies", (req, res) => {
//   res.send("This is a baby " + req.query.name + "age " + req.query.age);
// });

// app.get("/index", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// app.get("/registerbaby", (req, res) => {
//   res.sendFile(__dirname + "/register_baby.html");
// });

// app.post("/registerbaby", (req, res) => {
//   console.log(req.body)
//   let baby=req.body
//   // res.redirect("/index")
//   res.json({message:"baby registered",baby})
// })  






//For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

//Bootstraping the server
//Always the last line in code
app.listen(port, () => console.log(`listening on port ${port}`));
