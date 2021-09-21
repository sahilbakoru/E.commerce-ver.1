const express = require('express');
const router = express.Router()


const {create,categoryById,read} = require("../controller/category")
const {requireSignin,isAuth,isAdmin } = require("../controller/auth")
const {userById} = require("../controller/user")

router.get("/category/:categoryId", read)
router.post("/category/create/:userId", requireSignin, isAuth,isAdmin, create)

router.param('categoryId',categoryById)
router.param('userId',userById)
module.exports = router 