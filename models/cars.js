// models/cars.js

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    brand: String,
    colorName: String, 
    price: Number,
    isTuned: Boolean, 
});

const Car = mongoose.model("Car", carSchema); 

module.exports = Car;