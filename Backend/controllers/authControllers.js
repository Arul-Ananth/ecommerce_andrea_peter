const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User= require("../models/userModel");

exports.register = async(req,res)=>{
    try{
        console.log("RAW BODY:", req.body);

        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({error: "Name,email,and password are requested"});
        }
        if(password.length<6){
            return res.status(400).json({error:
                "Password must be atleast 6 character"});
            }
        const existingUser = await User.findOne({where:{email}});
        if(existingUser){
            return res.status(400).json({error:"User with this email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });
        const UserResponse ={
            id:user.id,
            name:user.name,
            email:user.email
        };
        res.status(201).json({message:"User registered successfully",user:UserResponse});

        }catch(err){
            console.error("Registration error:",err);
            res.status(500).json({error:"Registration failed.please try again"});
        }
    };
    exports.login =async(req,res)=>{
        try{
            const{email,password}=req.body;
            
            if(!email|| !password){
                return res.status(400).json({eror:"Email and password are required"});
            }
            const user = await User.findOne({
                where:{email}
            });
            
            console.log("sassss",email)
            if(!user){
                return res.status(401).json({error:"Invalid email or password"});
            }
            const isMatch = await bcrypt.compare(
                password,user.password);
                if(!isMatch){
                    return res.status(401).json({error:"Invalid email or password"});
                }
                const token = jwt .sign(
                    {id:user.id,email:user.email},
                    process.env.JWT_SECRET||"secretkey",
                    {
                        expiresIn:"24h"
                    });
                    res.json({
                        message:"Login Success",
                        token,
                        User:{
                            id:user.id,
                            name:user.name,
                            email:user.email
                        }
                    });


                    }catch(err){
                        console.error("Login error:",err);
                        res.status(500).json({error:"Login failed. Please try again"});
                    }
                
        };
    

