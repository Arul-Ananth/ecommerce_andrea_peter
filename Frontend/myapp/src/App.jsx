import React, { useContext, useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/cart";
import Orderpage from"./components/orderpage";
import Validationpage from "./components/validation";
import {  Link, Route, Routes,useLocation} from "react-router-dom";
import { CartContext, CartProvider } from "./components/CartContext";
// import SearchProduct from "./components/SearchProduct";


function App() {
  const [open, setOpen] = useState(false);
  const{cart}=useContext(CartContext)
         const user=localStorage.getItem("userName");
          const location=useLocation()
  return (
    <div className="h-full bg-gradient-to-r from-white to-emerald-50">
      
      

        {/* NAVBAR */}
{(location.pathname !=='/') && (location.pathname !=="/login") &&(
        <nav className="">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex h-16 items-center justify-between">

              {/* Mobile Button */}
              <div className="sm:hidden">
                <button
                  onClick={() => setOpen(!open)}
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {open ? "✕" : "☰"}
                </button>
              </div>

              {/* Desktop Links */}
              <div className="hidden sm:flex space-x-6">
               
                <Link to="/product" className="nav-link font-bold">Product</Link>
                <Link to="/validation" className="nav-link font-bold">yup</Link>
                <div className="relative z-50">
            <Link to="/cart" className="text-2xl ">🛒</Link>
            {cart.length > 0 && (
            <span className="z-0 absolute -top-2 -right-2 bg-emerald-300 w-4 rounded-full text-white text-sm text-center">
            {cart.length}
            </span>
            )}
          </div>
              </div>

              {/* Right Icon */}
             
              <p>
                 {user}'s Wardrobe
              </p>
              
            
               <Link to="/login">Logout</Link>
             
              {/* <SearchProduct/> */}
            </div>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="sm:hidden px-4 pb-4 space-y-2 flex flex-col">
              <Link onClick={() => setOpen(false)} to="/product" className="mobile-link text-pink-500">Product</Link>
              <Link onClick={()=> setOpen(false)} to="/cart" className="mobile-link text-pink-500">Cart</Link> 
            </div>
          )}
        </nav>
        )}
        

        {/* ROUTES */}
        <Routes>
           <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/validation"element={<Validationpage />}/>
          
        </Routes>

     </div>
  );
}

export default App;
