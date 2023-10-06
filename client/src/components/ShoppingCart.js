import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from "./Modal";

function ShoppingCart({ cartItems, openModal, isLoggedIn, handleLogout }) {
    const [cart, setCart] = useState(cartItems)
    console.log(cartItems)

    useEffect(() => {
        fetch('/cart')
        .then((r) => r.json())
        .then((data) => {
            setCart(data)
        })
    }, [])

    const removeFromCart = async (id) => {
        const config = {method: "DELETE"}
        const response = await fetch(`/cart/${id}`, config)

        const filteredCart = cart.filter(product => product.id !== id)
    }

    const product = cart.map((product) => (
        <>
            <img alt="product" src={product.image_url} width={250} height={250} key={product.image_url} />
            <button key={product.name} onClick={() => removeFromCart(product.id)} className='remove button' type="submit">Remove from cart</button>
            <button key={product.name} onClick={product.name} className="button">
                {<Modal product={product} name={product.name} price={product.price} description={product.description} />}
            </button>
        </>
    ))

    return (
        <div className='cart'>
            <h2>Login or Register to see cart!</h2>
            <ul>
            {isLoggedIn ? (
                    <>
                        <li className='navbar-item'>
                            <NavLink to="/cart">Cart</NavLink>
                        </li>
                        <li className='navbar-item'>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                        <li className='navbar-item'>
                            <button className='logout-button' onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className='navbar-item'>
                            <NavLink to='/login'>Login</NavLink>
                        </li>
                        <li className='navbar-item'>
                            <NavLink to='/register'>Register</NavLink>
                        </li>
                    </>
                )} 
            </ul>
            {product}
            {/* <ul>
                 /*{cartItems.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price} 
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                ))}
            </ul> */}
            {/*Display total price and checkout button */}
        </div>
    )
}

export default ShoppingCart