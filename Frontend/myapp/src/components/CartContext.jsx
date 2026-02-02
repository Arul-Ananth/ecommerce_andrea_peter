import { createContext,useState,useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider =({children})=>{
    const [cart,setCart] = useState([]);

    useEffect(()=>{
        const userId = localStorage.getItem("userId");
        if(userId){
            loadCartFromBackend(userId);
        }
    },[]);

    const loadCartFromBackend = async (userId)=>{
        try{
            const response =await axios.get(`http://localhost:3000/api/cart/${userId}`);
            setCart(response.data);
        }catch(error){
            console.error("Failed to load cart:",error);
        }
        };
        const addToCart = async(product)=>{
            const userId = localStorage.getItem("userId");
            if(!userId){
                alert("Please login first!");
                return;
            }
            try{
                await axios.post("http://localhost:3000/api/cart",{
                    userId:parseInt(userId),
                    productId:product.id,
                    name:product.name,
                    price:product.price,
                    image:product.image,
                    quantity:1

                });
                await loadCartFromBackend(userId);
                alert(`${product.name}added to cart`);
            }catch(error){
                console.error("Failed to add to cart",error);
                alert("Failed to add to cart");
            }
        };
        const increment=async(cartItemId)=>{
            const userId = localStorage.getItem("userId");
            const item =cart.find(item=>item.id===cartItemId);
            if(item){
                try{
                    await axios.put(`http://localhost:3000/api/cart/${cartItemId}`,{
                        quantity:item.quantity + 1
                    });
                    await loadCartFromBackend(userId);

                }catch(error){
                    console.error("Failed to update quantity:",error);
                }
            }

        };
        const decrement = async (cartItemId) => {
            const userId =localStorage.getItem("userId");
            const item = cart.find(item => item.id === cartItemId);

            if(item&&item.quantity>1){
                try{
                    await axios.put(`http://localhost:3000/api/cart/${cartItemId}`,{
                        quantity:item.quantity -1
                    });
                    await loadCartFromBackend(userId);

                }catch(error){
                    console.error("Failed to update quantity:",error);
                }
            }
        };
        const removeItem = async (cartItemId)=>{
            const userId = localStorage.getItem("userId");
            try{
                await axios.delete(`http://localhost:3000/api/cart/${cartItemId}`);
                await loadCartFromBackend(userId);
            }catch(error){
                console.error("Failed to remove item:",error);
            }
        };
        const clearCart =async()=>{
            const userId =localStorage.getItem("userId");
            if(!userId)return;

            try{
                await axios.delete(`http://localhost:3000/api/cart/clear/${userId}`);
                setCart([]);
            }catch(error){
                console.error("Failed to clear cart:",error);
            }
        };
        return(
            <CartContext.Provider
            value={{cart,addToCart,increment,decrement,clearCart,removeItem}} >
            {children}
            </CartContext.Provider>


       
        );



       }
