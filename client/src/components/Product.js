import React, { useState } from 'react';
import Modal from './Modal';

function Product({ product, openModal }) {
const [cart, setCart] = useState([])

const addToCart = (item) => {
    const inCart = cart.find((product) => product.name === item.name)

    if (inCart) {
        const updatedCart = cart.map((product) =>
        product.name === item.name ? {
            ...item,
            quantity: item.quantity + 1
        } : item
        )
        setCart(updatedCart)
    }
    else {
        setCart([...cart, {...addToCart, quantity: 1}])
    }
}

const homeProducts = product.map((homeProducts) => (
    <div key={homeProducts.name}>
        <img alt="product img" src={homeProducts.image_url} width={250} height={250} key={homeProducts.image_url} />
        <button onClick={openModal(homeProducts)} className="button">
            {<Modal products={homeProducts} name={homeProducts.name} price={homeProducts.name} description={homeProducts.description} />}
        </button>
        <button onClick={() => addToCart(homeProducts)}>Add to Cart</button>
    </div>
))

console.log(homeProducts)

    return (
        <div className='product'>
            <h2>Products</h2>
            {homeProducts}
        </div>
    )
}

export default Product