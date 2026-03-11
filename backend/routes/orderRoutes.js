const express = require("express");
const router = express.Router();

const { addOrderItems , getMyOrders , getOrderById } = require("../controllers/orderController");
const { protection } = require("../middleware/authmiddleware");

router.post("/", protection , addOrderItems);
router.get("/myorders", protection , getMyOrders);
router.get("/:id", protection , getOrderById);

module.exports = router;