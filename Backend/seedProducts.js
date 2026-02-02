//run:node seedproduct.js

// require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const sequelize = require("./db");
const Product =require("./models/ProductModel");

async function seedProducts(){
    try{
        //Read products from json file
        const filePath = path.join(__dirname,"product.json");
        const products =JSON.parse(await fs.readFile(filePath,"utf8"));

        //Connect to database
        await sequelize.authenticate();
        console.log("Database Connected");
        await sequelize.sync();
        console.log("Database synced\n",products);

        //Add all Products in parallel
        
        const results= await Promise.all(
            products.map(async(product)=>{
                const [item,created] = await Product.findOrCreate({
                    where :{name:product.name},
                    defaults:product


                });
                console.log(created ?` Created:
                    ${product.name}` : `Exists:
                    ${product.name}`);
                    return created;
                
            })
        );
        //show summary
        const created = results.filter(Boolean).length;
        console.log(`\n Done! Created ${created} new products,${products.length-created} already existed.`);

        await sequelize.close();
        process.exit(0);
    }catch(error){
        console.error("Error:",error.message);
        await sequelize.close();
        process.exit(1);
    }


    }
seedProducts()