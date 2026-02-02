import axios from "axios";
import {useState} from "react";
import {useNavigate,Link} from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    const[email,setEmail] =useState("");
    const[password,setPassword]=useState("");
    const[loading,setLoading]=useState(false);

    const handleLogin = async(e) =>{
        e?.preventDefault();

        if(!email||!password){
            alert("Please enter the email and password");
            return;
        }
        setLoading(true);
        try{

            const res = await axios.post("http://localhost:3000/api/login",{email,password});
            //Save user data

            localStorage.setItem("token",res.data.token);
            localStorage.setItem("userId",res.data.User.id);
            localStorage.setItem("userName",res.data.User.name);

            alert(res.data.message);
            navigate("/product");

        }catch(error){
            alert(error.response?.data?.error || "Login failed");
        }finally{
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-[url(image/bgi.jpg)] flex items-center justify-center">
        <div className="p-10 max-w-md bg-white rounded-xl">

            <h1 className="text-center font-bold text-blue-300 text-3xl">RESUME YOUR FASHION JOURNEY 👇</h1>
            <form onSubmit={handleLogin}>
                <input 
                className="w-full border border-gray-300 p-2 rounded mb-3 focus:outline-none focus:border-black"

                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                />
                <input
                className = "w-full border border-gray-300 p-2 rounded mb-3 focus:outline-none focus:border-black"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                />
                <button
                type="submit"
                className="w-full  bg-linear-to-t from-white to bg-emerald-100 to-10%-600 p-2 rounded mb-3 focus:outline-none focus:border-blue-500"

                disabled={loading}
                >
                    {loading?"Logging in....":"Login"}
                </button>
            </form>
            
                <div className="text-center">
                Build your fashion story {" "}
                <Link className="text-blue-600"
                to="/"
                >
                    Register here
                </Link>
                </div>
            </div>
        </div>
    );
}