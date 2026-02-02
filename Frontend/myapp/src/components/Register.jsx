import React from 'react'
import {useState} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


 export default function Register(){
    const [name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");

    const handleRegister = async () => {
        if(!name||!email||!password){
            alert("Please fill all fields");
            return;
        }

        if(password.length<6){
            alert("Password must be atleast 6 characters");
            return;
        }
        try{
            await axios.post("http://localhost:3000/api/register",
                {name,email,password});
                alert("Registration successful ! Please login.");
        }catch(error){
            alert(error.response?.data?.error||"Registration failed");
        }
    }
    return(
        <div className='bg-[url(image/bgi.jpg)]'>
            <div className='flex justify-center'>
                <h1 className='text-8xl text-white'>✄</h1>
                <h1 className='text-8xl text-white'>tWiNIc</h1>
                <h1 className='text-8xl text-white mt-3.5 -rotate-180'> ✄</h1> 
            </div>
            <div className='h-screen flex items-center justify-center'>
                <div className='bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md'>
                <h1 className='text-center font-bold text-3xl text-blue-300 t mb-5 '>START YOUR STYLE JOURNEY👇</h1>

            <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 "
                placeholder ="Name"
                value ={name}
                onChange = {(e)=>setName(e.target.value)}
                style={{width:"100%",padding:"8px",marginBottom:"20px"}}
                />
                <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"

                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                style={{width:"100%",padding:"8px",marginBottom:"20px"

                }}
                />
                <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"

                type='password'
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                style={{width:"100%",padding:"8px",marginBottom:"20px"}}
                />
                <div class="flex justify-center">
                <button 
                onClick={handleRegister}
                className="p-3 rounded-2xl  bg-linear-to-t from-white to bg-emerald-100 to-10%-600 w-full "

        
                >
                
                Register
                
                </button>
                </div>
                <p className='text-center'>Already styled with us? <Link className='text-blue-600' to="/login">Login</Link></p>
                </div>
                </div>
        </div>
    );

}