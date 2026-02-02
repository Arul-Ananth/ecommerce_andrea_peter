import React, { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);

  const {cart,increment,decrement,removeItem,clearCart
} = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
     if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first!");
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/orders", {
        userId: parseInt(userId),
        items: cart,
        address: address || "Not provided",
        paymentMethod: paymentMethod
      });
      console.log(userId)

      alert(`✅ Order placed! Order ID: ${response.data.order.id}`);
      clearCart();
      setAddress("");
      setPaymentMethod("Cash on Delivery");
    } catch (error) {
      alert(error.response?.data?.error || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="font-bold">Your Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map(item => (
        <div className="hover:bg-blue-50 font-bold"
          key={item.id}
          style={{
            display: "flex",
            gap: "15px",
            margin: "10px 0",
            border: "1px solid gray",
            padding: "10px",
            alignItems: "center"
          }}
        >

          {/* ✅ IMAGE */}
          <img className="rounded-full"
            src={item.image}
            alt={item.name}
            width={200}
            height={70}
            
          />

          {/* ✅ DETAILS */}
          <div style={{ flex: 1 }}>
            <h4>{item.name}</h4>
            <p>Price: ₹ {item.price}</p>
            <p>Qty: {item.quantity}</p>

            <button className="text-black bg-blue-200 rounded-2xl hover:bg-white"
              onClick={() => increment(item.id)}
              style={{ padding: "5px 10px", margin: "0 5px" }}
            >
              +
            </button>
            <button className="text-black bg-blue-200 rounded-2xl hover:bg-white" 
              onClick={() => decrement(item.id)}
              style={{ padding: "5px 10px", margin: "0 5px" }}
            >
              -
            </button>
               <div className="p-2" >
              <button className=" text-center text-black hover:bg-blue-300 ml-2 p-1.5 rounded-2xl font-bold">
                S
              </button>
              <button className=" text-center text-black hover:bg-blue-300 ml-2 p-1 rounded-2xl font-bold">
                M
              </button>
              <button className=" text-center text-black hover:bg-blue-300 ml-2 p-1.5 rounded-2xl font-bold">
                L
              </button>
              </div>



            <button className="text-black bg-blue-200 p-2 rounded-2xl "
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
            
            <p>Subtotal: ₹ {item.price * item.quantity}</p>
            
          </div>

        </div>
        
      ))}

      <hr />

      {/* ✅ TOTAL */}
      <h3 className="font-bold text-center">Total: ₹ {total}</h3>

      {cart.length > 0 && (
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
          <h3 className="font-bold text-center">Order Details</h3>
          
          <div style={{ marginBottom: "10px" }}>
            <label className="font-bold">Delivery Address:</label>
            <textarea className="border"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              rows="3"
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label className="font-semibold">Payment Method:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
        </div>
      )}

      {/* ✅ ACTION BUTTONS */}
      {cart.length > 0 && (
        <div style={{ marginTop: "15px" }}>
          <button className="hover bg-green-300"
            onClick={placeOrder}
            disabled={loading}
            style={{
              background: loading ? "gray" : "green",
              color: "white",
              padding: "10px 20px",
              marginRight: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px"
            }}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          <button
            onClick={clearCart}
            disabled={loading}
            style={{
              background: "black",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px"
            }}
          >
            Clear Cart
          </button>
        </div>
      )}

    </div>
  );
};

export default CartPage;