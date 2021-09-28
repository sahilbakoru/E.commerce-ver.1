const express = require('express');
const router = express.Router()


const {
    
    create,
    productById ,
    read,remove,
    update,list,
    listRelated,
    listCategories 

} = require("../controller/product")
const {requireSignin,isAuth,isAdmin } = require("../controller/auth")
const {userById} = require("../controller/user")


router.get("/product/:productId",read)
router.post("/product/create/:userId", requireSignin, isAuth,isAdmin, create)
router.delete("/product/:productId/:userId",requireSignin, isAuth,isAdmin,remove)
router.put("/product/:productId/:userId",requireSignin, isAuth,isAdmin,update)


router.get("/products",list)
router.get("/products/related/:productId/",listRelated)
router.get("/products/categories",listCategories)

router.param('userId',userById)
router.param('productId',productById)
module.exports = router