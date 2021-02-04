const mongoose = require("mongoose")

const campSchema = new mongoose.Schema({
    title:String,
    price:Number,
    description:String,
    image:String,
    location:String
})

module.exports = new mongoose.model("Camp",campSchema)