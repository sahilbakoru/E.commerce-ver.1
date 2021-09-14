const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const expressvalidator = require("express-validator")

require("dotenv").config()


//app 
const app = express()

// import routes 
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const subcategoryRoutes = require("./routes/subcategory")
const productRoutes = require("./routes/product")
//db
mongoose.connect(process.env.DATABASE, { 
    useNewUrlParser: true,
     
}).then(() => console.log("DB conected"))

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(expressvalidator())

// routes middleware
app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',subcategoryRoutes)
app.use('/api',productRoutes)

const port = process.env.PORT || 8000

app.listen(port , ()=>{
    console.log(`hello from simple server ${port}`)
})

