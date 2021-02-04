const mongoose = require("mongoose")
const Camp = require("../models/camp.js")
const cities = require("./cities.js")
const { places , descriptors } = require("./seedHelpers.js")

mongoose.connect('mongodb://localhost:27017/campture-dev', {useNewUrlParser: true, useUnifiedTopology: true})
.then((res)=>{
    console.log("DB CONNECTED !!! ..")
}).catch((err)=>{
    console.log("An Err Occured")
    console.log(err)
})
// const db = mongoose.connection

const sample = array => array[Math.floor(Math.random()*array.length)]

const seedDB = async ()=>{
    await Camp.deleteMany({})
    for (let i = 0 ; i < 50 ; i++){
        let random1000 = Math.round(Math.random()*1000)
        let price = Math.round(Math.random()*40)+10
        let camp = new Camp({
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quidem, inventore consectetur nemo est quas nihil porro rerum quisquam beatae",
            price:price,
            image:"https://source.unsplash.com/collection/483251",
            // image:"https://source.unsplash.com/1600x900/?nature,water"
        })
        await camp.save()
    }
}

seedDB().then(()=>{
    mongoose.connection.close()
})