const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderControllers");

router.post("/",orderController.placeOrder);
router.get("/user/:userId",orderController.getUserOrders);
router.get("/:id",orderController.getOrderById);

module.exports=router;
