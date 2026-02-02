const Cart = require ("../models/CartModel");

//Get user cart
exports.getCart = async(req,res)=> {
    try{
        const cartItems = await Cart.findAll({where:{userId:req.params.userId}});
        res.json(cartItems);
    }catch(err){
        console.error("Error:",err);
        res.status(500).json({error:"Failed to get cart"});
    }
};
//Add item
exports.addToCart = async(req,res)=>{
    try{
        const{userId,productId,name,price,image,quantity}=req.body;
            const existing = await Cart.findOne({where:{userId,productId}});
            if(existing){
                existing.quantity += quantity || 1;
                await existing.save()
                return res.json(existing);
            }
            const newItem = await Cart.create({
                userId,productId,name,price,image,quantity : quantity || 1
            
            });
            res.json(newItem);
        }
        catch(err){
            console.error ("Error:",err);
            res.status(500).json({error:"Failed to add to cart"});


            }
    };


    exports.updateQuantity = async(req,res)=>{
        try{
            const item = await Cart.findByPk(req.params.id);
            if(!item)return res.status(404).json({error:"Item not found"});
            item.quantity = req.body.quantity;
            await item.save();
            res.json(item);
            }catch(err){
                console.error("Error:",err);
                res.status(500),json({error:"Failed to update quantity"});
            }
        };
        exports.removeItem = async(req,res)=>{
            try{
                await Cart.destroy({where:{id:req.params.id}});
                res.json({message:"Item removed"});
            }catch(err){
                console .error("Error:",err);
                res.status(500).json({error:"Failed to remove item"});
            }
        };
        exports.clearItem=async(req,res)=>{
            try{
                await Cart.destroy({where:{userId:req.params.userId}});
                res.json({message:"Item removed"});
            }catch(err){
                console .error("Error:",err);
                res.status(500).json({error:"Failed to remove item"});
            }
        };
    
    
