import React, { useState } from 'react';

function Product({ products, addToCart }) {
const [cart, setCart] = useState([])



    return (
        <div className='product'>
            <h2>Products</h2>
            {/* <ul>
            {products.map((product) => (
                <li key={product.id} className='product-item'>
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                </li>
            ))}
            </ul> */}
        </div>
    )
}

export default Product