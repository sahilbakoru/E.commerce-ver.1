const express = require('express');
const router = express.Router()


const {create} = require("../controller/subcategory")
const {requireSignin,isAuth,isAdmin } = require("../controller/auth")
const {userById} = require("../controller/user")


router.post("/subcategory/create/:userId", requireSignin, isAuth,isAdmin, create)


router.param('userId',userById)
module.exports = router