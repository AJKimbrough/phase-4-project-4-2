import React, { useEffect, useState } from 'react';
import Modal from "./Modal";

function ShoppingCart({ cart, openModal, isLoggedIn, handleLogout, user, removeFromCart }) {
    const handleRemoveFromCart = (id) => {
        removeFromCart(id)
      }
    
      const product = cart.map((product) => (
        <div key={product.id}>
          <img alt="product" src={product.image_url} width={250} height={250} key={product.image_url} />
          <button onClick={() => handleRemoveFromCart(product.id)} className='remove button' type="submit">Remove from cart</button>
          <button className="button" onClick={() => openModal(product)}>
            {<Modal product={product} name={product.name} price={product.price} description={product.description} />}
          </button>
        </div>
      ))

  console.log(cart)

    return (
        <div className='cart'>
          <h2>Cart</h2>
          {product}
        </div>
      )
    }

export default ShoppingCart