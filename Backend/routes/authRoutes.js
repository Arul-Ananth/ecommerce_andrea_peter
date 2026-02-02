const express = require("express");
const router=express.Router();
const{register,login} =require("../controllers/authControllers")
const { appValidation } =require('../middlewares/validate')

router.post("/register",register,appValidation);
router.post("/login",login,appValidation);



module.exports=router;