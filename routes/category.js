const express = require('express');
const router = express.Router()


const {create,categoryById,read,update,remove1 ,list} = require("../controller/category")
const {requireSignin,isAuth,isAdmin } = require("../controller/auth")
const {userById} = require("../controller/user");
const { remove } = require('lodash');





router.get("/category/:categoryId", read)
router.post("/category/create/:userId", requireSignin, isAuth,isAdmin, create)
router.put("/category/:categoryId/:userId", requireSignin, isAuth,isAdmin, update)
router.delete("/category/:categoryId/:userId", requireSignin, isAuth,isAdmin, remove1)
router.get("/categories", list)

router.param('categoryId',categoryById)
router.param('userId',userById)
module.exports = router 