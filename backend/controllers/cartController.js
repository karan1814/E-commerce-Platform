const Product = require("../models/Product");

const addToCart = async(req ,res)=>{
    try{
        const { productId , qty } =req.body;

        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({message: "product not found"});
        }

        const cartItem = {
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty: Number(qty)
        };

        res.json(cartItem);
    }catch(error){
        res.status(500).json({ message: error.message});
    }
};

module.exports = { addToCart };