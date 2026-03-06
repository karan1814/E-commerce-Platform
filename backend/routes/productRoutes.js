const express = require("express");
const router = express.Router();

const { getproduct , createproduct , getproductbyID, updateProduct, deleteproduct} = require("../controllers/productController");
const { protection , admin} = require("../middleware/authmiddleware");

router.get("/", getproduct);// getting all product
router.get("/:id", getproductbyID);//getting single product
router.post("/", protection, admin, createproduct);// create a new product
router.put("/:id", protection , admin , updateProduct)// update the product
router.delete("/:id",protection , admin, deleteproduct);// delete

module.exports = router;