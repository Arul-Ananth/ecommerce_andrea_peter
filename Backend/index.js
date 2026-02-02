const express =require("express");
const app =express();
const cors = require("cors");
app.use(express.json());

const sequelize =require("./db");
// const userRoutes =require("./routes/authRoutes.");
app.use(cors());
//routes
app.use("/api",require("./routes/authRoutes"));
app.use("/api/products",require("./routes/productRoutes"));
app.use("/api/cart",require("./routes/cartRoutes"));
app.use("/api/orders",require("./routes/orderRoutes"));

// app.use("/routes",authRoutes);
sequelize.sync()
.then(()=>{
    console.log("Database Synced");

    app.listen(3000,()=>{
        console.log("Server running on http://localhost:3000")
    });

});
