const express = require('express');
const router = express.Router()


const {create} = require("../controller/product")
const {requireSignin,isAuth,isAdmin } = require("../controller/auth")
const {userById} = require("../controller/user")


router.post("/product/create/:userId", requireSignin, isAuth,isAdmin, create)


router.param('userId',userById)
module.exports = router