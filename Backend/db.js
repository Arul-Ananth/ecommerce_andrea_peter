const { Sequelize } =require("sequelize");

const sequelize = new Sequelize("e_commerce","root","",{
    host:"localhost",
    dialect:"mysql",
});
// const dbName="e_commerce"

// sequelize.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`)
// .then(()=>{
//     console.log('database connected')
// })
// .catch((err)=>{
//     console.log("errror",err)
// })

sequelize.authenticate()
.then(()=>console.log("SQL Connected"))
.catch(err =>console.log(err));

module.exports =sequelize;