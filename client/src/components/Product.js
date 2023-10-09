import React from 'react';
import Modal from './Modal';

function Product({ products, addToCart }) {
const handleAddToCart = (homeProduct) => {
    addToCart(homeProduct)
    const message = `${homeProduct.name} has been added to the cart.`
    alert(message)
    }

const homeProducts = products.map((homeProduct) => (
    <div key={homeProduct.id}>
        <p>{homeProduct.name}</p>
        <img alt="product img" src={homeProduct.image_url} width={250} height={250} />
        <p>${homeProduct.price}</p>
        <>
            {<Modal products={homeProduct} name={homeProduct.name} price={homeProduct.price} description={homeProduct.description} />}
        </>
        <button onClick={() => handleAddToCart(homeProduct)}>Add to Cart</button> 
    </div>
  ));

console.log(homeProducts)

    return (
        <div className='product'>
            {homeProducts}
        </div>
    )
}

export default Product