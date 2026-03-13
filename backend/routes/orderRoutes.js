const express = require("express");
const router = express.Router();

const { addOrderItems , getMyOrders , getOrderById, updateOrderToPaid, getOrder, updateOrderToDelivered } = require("../controllers/orderController");
const { protection , admin } = require("../middleware/authmiddleware");

router.post("/", protection , addOrderItems);
router.get("/myorders", protection , getMyOrders);
router.get("/:id", protection , getOrderById);

router.put("/:id/pay", protection, updateOrderToPaid);
router.get("/", protection , admin , getOrder);
router.put("/:id/deliver", protection , admin , updateOrderToDelivered);

module.exports = router;