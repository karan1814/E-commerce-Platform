const express = require("express");
const router = express.Router();
const { protection } = require("../middleware/authmiddleware");

router.get("/profile", 
    protection, 
    (req, res)=>{
    res.json(req.user);
});

module.exports = router;