const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

// import routes 
const UserRoutes = require("./routes/user")

//app 
const app = express()

//db
mongoose.connect(process.env.DATABASE, { 
    useNewUrlParser: true,
     
}).then(() => console.log("DB conected"))



// routes middleware
app.use('/api',UserRoutes)

const port = process.env.PORT || 8000

app.listen(port , ()=>{
    console.log(`hello from simple server ${port}`)
})

