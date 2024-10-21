const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const methodOverride = require("method-override"); // new

const Car = require("./models/cars.js");

const path = require("path");

const mongoose = require("mongoose");

const app = express();
app.use(morgan("dev"));
app.use(methodOverride("_method")); // new
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);

// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.post("/cars", async (req, res) => {
  if (req.body.isTuned === "on") {
    req.body.isTuned = true;
  } else {
    req.body.isTuned = false;
  }
  await Car.create(req.body);
  res.redirect("/cars");
});

app.put("/cars/:carId", async (req, res) => {
  //check if the car tunned or not and make the opposite
  if (req.body.isTuned === "on") {
    req.body.isTuned = true;
  } else {
    req.body.isTuned = false;
  }

  // Update the car in the database
  await Car.findByIdAndUpdate(req.params.carId, req.body);

  // Redirect to the car's show page
  res.redirect(`/cars/${req.params.carId}`);
});

app.get("/cars", async (req, res) => {
  const allCars = await Car.find();
  res.render("cars/index.ejs", { cars: allCars });
});

app.get("/cars/new", (req, res) => {
  res.render("cars/new.ejs");
});

app.get("/cars/:carId", async (req, res) => {
  const foundCar = await Car.findById(req.params.carId);
  res.render("cars/show.ejs", { car: foundCar });
});

//home
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/cars/:carId/edit", async (req, res) => {
  const foundCar = await Car.findById(req.params.carId);
  console.log(foundCar);
  res.render("cars/edit.ejs", {
    car: foundCar,
  });
});

app.delete("/cars/:carId", async (req, res) => {
  await Car.findByIdAndDelete(req.params.carId);
  res.redirect("/cars");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
