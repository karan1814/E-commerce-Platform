const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();
connectDB();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//test route
app.get("/", (req, res)=>{
    res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api/cart", cartRoutes);

const PORT =process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on Port ${PORT}`);
});