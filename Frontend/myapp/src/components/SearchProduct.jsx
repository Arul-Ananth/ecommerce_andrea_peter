import axios from 'axios';
import React, { useEffect, useState } from 'react'

function SearchProduct() {
   
    return(
        <div style={{padding:"20px"}}>
            <h2>Products</h2>
            {/*SEARCH*/}
            
            {/* PRODUCT LIST*/}
            <div style={{ }}>
                {products.map((product)=>(
                    <div
                    key={product.id}
                    >
                    <img src={product.image}width="150"/>
                    <h4>{product.name}</h4>
                    <p>{product.price}</p>
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default SearchProduct