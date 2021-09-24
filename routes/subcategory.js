const express = require('express');
const router = express.Router()


const {create,subcategoryById,update,read,remove2 ,list} = require("../controller/subcategory")
const {requireSignin,isAuth,isAdmin } = require("../controller/auth")
const {userById} = require("../controller/user")

router.get("/subcategory/:subcategoryId", read)
router.post("/subcategory/create/:userId", requireSignin, isAuth,isAdmin, create)
router.put("/subcategory/:subcategoryId/:userId", requireSignin, isAuth,isAdmin, update)
router.delete("/subcategory/:subcategoryId/:userId", requireSignin, isAuth,isAdmin, remove2)
router.get("/subcategories", list)

router.param('subcategoryId',subcategoryById)
router.param('userId',userById)
module.exports = router 