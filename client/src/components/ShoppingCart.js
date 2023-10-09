import React from 'react';
import Modal from "./Modal";

function ShoppingCart({ cart, removeFromCart, addToWallet }) {
  const handleRemoveFromCart = (id) => {
    removeFromCart(id)
  }
    
  const product = cart.map((product) => (
    <div className='image-container' key={product.id}>
      <img alt="product" src={product.image_url} width={250} height={250} key={product.image_url} />
      <button onClick={() => handleRemoveFromCart(product.id)} className='remove-button' type="submit">Remove from cart</button>
        <>
          {<Modal product={product} name={product.name} price={product.price} description={product.description} />}
          <button className="purchase-button" onClick={() => handleAddToWallet(product)}>Purchase</button>
        </>
    </div>
  ))

  const handleAddToWallet = (item) => {
    addToWallet(item); 
    const message = "Thank you for your purchase!"
    alert(message)
  }

  return (
    <>
      <div className='cart'>
        {product}
      </div>
    </>    
  )
}

export default ShoppingCart