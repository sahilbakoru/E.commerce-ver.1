const express = require('express');
const router = express.Router()


const {create,subcategoryById,read} = require("../controller/subcategory")
const {requireSignin,isAuth,isAdmin } = require("../controller/auth")
const {userById} = require("../controller/user")

router.get("/subcategory/:subcategoryId", read)
router.post("/subcategory/create/:userId", requireSignin, isAuth,isAdmin, create)

router.param('subcategoryId',subcategoryById)
router.param('userId',userById)
module.exports = router 