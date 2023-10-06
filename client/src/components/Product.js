import React, { useState } from 'react';
import Modal from './Modal';

function Product({ product, openModal }) {
const [cart, setCart] = useState([])

const addToCart = (id) => {
    const inCart = cart.find((product) => product.name === id.name)
    
}

const homeProducts = product.map((homeProducts) => (
    <>
        <img alt="product img" src={homeProducts.image_url} width={250} height={250} key={homeProducts.image_url} />
        <button key={homeProducts.name} onClick={openModal} className="button">
            {<Modal products={homeProducts} name={homeProducts.name} price={homeProducts.name} description={homeProducts.description} />}
        </button>
    </>
))

console.log(homeProducts)

    return (
        <div className='product'>
            <h2>Products</h2>
            {homeProducts}
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