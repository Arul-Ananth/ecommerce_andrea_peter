const{DataTypes}=require("sequelize");
const sequelize = require("../db");

const Order = sequelize.define("Order",{
    id:{type:DataTypes.INTEGER,autoIncrement:true,
        primaryKey: true
    },
    userId:{type : DataTypes.INTEGER,allowNull :false},
    items:{type:DataTypes.JSON,allowNull:false},
    totalAmount:{type:DataTypes.FLOAT,allowNull:false},
    status:{type:DataTypes.STRING,defaultValue:"pending"},
    address:{type:DataTypes.STRING},
    paymentMethod:{type:DataTypes.STRING}
});

module.exports= Order;
