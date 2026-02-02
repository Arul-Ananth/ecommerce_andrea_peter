const Product = require("../models/ProductModel");
const{ Op }=require("sequelize");
exports.getAllProducts = async(req,res)=>{
     const{ search }=req.query;
    try{
        
            let condition ={};
        if(search){
            condition.name={
                [Op.like]:`${search}%`
            };
        }
        const products = await Product.findAll({
            where:condition

        });
        res.json(products);

        }catch(err){
            console.error("Error:",err);
            res.status(500).json({error :"Failed to fetch process"});
        }
    };
    exports.getProductById=async(req,res)=>{
        try{
            const product=await Product.findByPk(req.params.id);
            if(!product) return res.status(404).json({error:"Product not found"});
            res.json(product);

        }
     catch (err){
        console.error("Error:",err);
        res.status(500).json({error:"Failed to fetch product"});

    }
};
 