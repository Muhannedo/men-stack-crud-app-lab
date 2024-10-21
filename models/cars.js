// models/cars.js

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    brand: String,
    colorName: String, // name of the color
    price: Number,
    isTuned: Boolean, // is it tuned
});

const Car = mongoose.model("Car", carSchema); // create model

module.exports = Car;