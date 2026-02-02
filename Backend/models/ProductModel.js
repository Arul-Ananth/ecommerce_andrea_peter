const{DataTypes}=require("sequelize");
const sequelize = require("../db");

const Product = sequelize.define("Product",{
    id:{type:DataTypes.INTEGER,autoIncrement:true,
        primaryKey: true
    },
    name:{type : DataTypes.STRING,allowNull :false},
    price:{type :DataTypes.FLOAT,allowNull:false},
    image:{type:DataTypes.STRING},
    description:{type:DataTypes.STRING},
    stock:{type:DataTypes.INTEGER,defaultValue: 100}
});

module.exports =Product;