const Product = require("../models/Product");

// const getproduct = async (req, res) =>{
//     try{
//         const products = await Product.find({});
//         res.json(products);
//     }catch(error){
//         res.status(500).json({ message: error.message});
//     }
// };

const getproducts = async( req, res)=>{
    try{
        const pagesize = 5;
        const page =  Number(req.query.page)|| 1;

        //search keyword
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: "i"
                }
            }
            : {};
        
        const count = await Product.countDocuments({ ...keyword });

        const product = await Product.find({ ...keyword })
            .limit(pagesize)
            .skip(pagesize * (page - 1));
        
        res.json({
            product, 
            page,
            pages: Math.ceil(count / pagesize)
        });
    }catch(error){
        res.status(500).json({ message : error.message });
    }
};

const createproduct = async(req, res) =>{
    try{
        const {name, description , price , image , category , countInStock } = req.body;

        const product = new Product({
            name,
            description,
            price,
            image,
            category,
            countInStock,
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
        const { name , description, price , image , category , countInStock } = req.body;

        const product = await Product.findById(req.params.id);

        if(product){
            product.name = name,
            product.description = description,
            product.price = price,
            product.image = image,
            product.category = category,
            product.countInStock = countInStock

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
        console.log(req.params.id);
        const product = await Product.findById(req.params.id);

        if(product){
            await product.deleteOne();
            res.json({ message: "Product removed"});
        }else{
            res.status(404).json({ message : "Product Not Found" });
        } 
    }catch(error){
        res.status(500).json({ message : error.message});
    }
};

const createManyProducts = async (req , res)=>{
    try{
        const products = req.body;

        const productsWithUser = products.map(product =>({
            ...product,
            user: req.user._id
        }));

        const createdProducts = await Product.insertMany(productsWithUser);

        res.status(201).json({
            message : " Products inserted successfully",
            count: createdProducts.length
        });
    }catch(error){
        res.status(500).json({ message : error.message });
    }
};

module.exports = { getproducts , createproduct , getproductbyID , updateProduct , deleteproduct , createManyProducts};