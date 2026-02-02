const express= require("express");
const router = express.Router();
const cartController = require("../controllers/cartControllers")

router.get("/:userId",cartController.getCart);
router.post("/",cartController.addToCart);
router.put("/:id",cartController.updateQuantity);
router.delete("/:id",cartController.removeItem);
router.delete("/clear/:userId",cartController.clearItem);

module.exports= router;