const Product = require("../models/Product");

const getproduct = async (req, res) =>{
    try{
        const products = await Product.find({});
        res.json(products);
    }catch(error){
        res.status(500).json({ message: error.message});
    }
};

const createproduct = async(req, res) =>{
    try{
        const {name, description , price , Image , category , countInstock } = req.body;

        const product = new Product({
            name,
            description,
            price,
            Image,
            category,
            countInstock,
            user: req.user._id
        });

        const createdproduct = await product.save();

        res.status(201).json(createdproduct);
    }catch(error){
        res.status(500).json({ message : error.message});
    }
};

const getproductbyID = async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);

        if(product){
            res.json(product);
        }else{
            res.status(404).json({ message:"Product Not Found" });
        }
    }catch(error){
        res.status(500).json({ message:error.message });
    }
};

const updateProduct = async(req,res)=>{
    try{
        const { name , description, price , Image , category , countInstock } = req.body;

        const product = await Product.findById(req.params.id);

        if(product){
            product.name = name,
            product.description = description,
            product.price = price,
            product.Image = Image,
            product.category = category,
            product.countInstock = countInstock

            const updateProduct = await product.save();

            res.json(updateProduct);
        }else{
            res.status(404).json({ message: " Product Not Found"});
        }
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

const deleteproduct = async(req, res) =>{
    try{
        const product = await Product.findById(req.params.id)
        if(product){
            await product.deleteOne();
        }else{
            res.status(404).json({ message : "Product Not Found" });
        } 
    }catch{error}{
        res.status(500).json({ message : " error.message "});
    }
};

module.exports = { getproduct , createproduct , getproductbyID , updateProduct , deleteproduct};