import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "./CartContext";
import SearchProduct from "./SearchProduct";
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchProducts();
  }, [search]);
  const fetchProducts = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/products?search=${search}`
    );
    setProducts(res.data);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((res) => {
        setProducts(res.data);
        if (res.data.length === 0) {
          console.log(
            "No products found.Run: cd backend && node seedProducts.js",
            res.data
          );
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Failed to load products.Make sure backend is running!");
      });
  }, []);
  const handleAddToCart = (product) => {
    addToCart(product);
  };
  return (
    <div>
      <h2 className="font-bold">Products</h2>
      {products.length === 0 ? (
        <div>
          <p>No products found</p>
          <p>
            Run:<code> cd backend && node seedProducts.js</code>
          </p>
        </div>
      ) : (
        <div>

          <input 
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
            {products.map((product) => (
              <div
                className="shadow-lg border border-blue-300 rounded-2xl p-2  
"
                key={product.id}
              >
                <div className="group overflow-hidden rounded-2xl ">
                  <img
                    src={product.image}
                    width={450}
                    alt={product.name}
                    className="rounded-2xl group-hover:scale-110 duration-300 ease-in group-hover:rounded-2xl
"
                  />
                </div>
                <h1 className="text-2xl font-bold text-center">
                  {product.name}
                </h1>
                <p className="text-2xl font-bold text-center">
                  {product.price}
                </p>
                <div className="text-center">
                  <button
                    className="text-2xl bg-emerald-50 border-emerald-200 p-1 border-5 font-black hover:bg-blue-200"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      ;
    </div>
  );
};
export default ProductPage;
