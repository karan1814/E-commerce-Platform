const express = require("express");
const router = express.Router();
const { protection , admin } = require("../middleware/authmiddleware");

router.get("/profile", 
    protection, 
    (req, res)=>{
    res.json(req.user);
});

router.get("/admin-test", protection , admin , (req,res) =>{
    res.json({ message: " welcome Admin "});
    console.log(" Admin Welcome !");
})

module.exports = router;