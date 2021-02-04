const express = require("express")
const app = express()
const path = require("path")
const methodOverRide = require("method-override")
const mongoose = require("mongoose")
const Camp = require("./models/camp.js")
const ejsMate = require("ejs-mate")

mongoose.connect('mongodb://localhost:27017/campture-dev', {useNewUrlParser: true, useUnifiedTopology: true})
.then((res)=>{
    console.log("DB CONNECTED !!! ..")
}).catch((err)=>{
    console.log("An Err Occured")
    console.log(err)
})

app.engine("ejs",ejsMate)

app.set("view engine","ejs")
app.set("views",path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))
app.use(methodOverRide('_method'))
//ROOT ROUTE //

app.get("/",(req,res)=>{
    res.render("home")
})
//Root ROUTE //

//CRUD - REST ROUTES //

app.get("/camps",async(req,res)=>{
    const camps = await Camp.find({})
    res.render("camps/camps.ejs",{ camps })
})

app.post("/camps",async(req,res)=>{
    const camp = new Camp(req.body.camp)
    await camp.save()
    res.redirect(`/camps/${camp._id}`)
})

app.get("/camps/new",(req,res)=>{
    res.render("camps/new")
})

app.get("/camps/:id",async(req,res)=>{
    const camp = await Camp.findById(req.params.id)
    res.render("camps/show",{ camp })
})

app.get("/camps/:id/edit",async(req,res)=>{
    const camp = await Camp.findById(req.params.id)
    res.render("camps/edit",{ camp })
})

app.put("/camps/:id",async(req,res)=>{
    const updatedCamp = await Camp.findByIdAndUpdate(req.params.id,req.body.camp)
    res.redirect(`/camps/${updatedCamp._id}`)
})

app.delete("/camps/:id",async(req,res)=>{
    await Camp.findByIdAndDelete(req.params.id)
    res.redirect("/camps")
})

//CRUD - REST ROUTES //

app.listen(3000,()=>{
    console.log("Server Started !!!")
})