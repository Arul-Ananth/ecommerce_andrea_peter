const{DataTypes}=require("sequelize");
const sequelize = require("../db");

const Cart = sequelize.define("Cart",{
    id:{type:DataTypes.INTEGER,autoIncrement:true,
        primaryKey: true
    },
    userId:{type : DataTypes.INTEGER,allowNull :false},
    productId: {type : DataTypes.INTEGER,allowNull:false},
    name:{type:DataTypes.STRING},
    price:{type :DataTypes.FLOAT,allowNull:false},
    image:{type:DataTypes.STRING},
    price:{type: DataTypes.INTEGER},
    quantity:{type:DataTypes.INTEGER,defaultValue:1}
});

module.exports =Cart;