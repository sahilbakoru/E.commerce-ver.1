const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
require("dotenv").config()





// import routes 
const UserRoutes = require("./routes/user")

//app 
const app = express()

//db
mongoose.connect(process.env.DATABASE, { 
    useNewUrlParser: true,
     
}).then(() => console.log("DB conected"))

//middleware

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())


// routes middleware
app.use('/api',UserRoutes)

const port = process.env.PORT || 8000

app.listen(port , ()=>{
    console.log(`hello from simple server ${port}`)
})

