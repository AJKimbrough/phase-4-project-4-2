import React from 'react';

function ShoppingCart({ cartItems, removeFromCart }) {
    //const [cart, setCart] = useState(cartItems)
    console.log(cartItems)
    /*
    const removeFromCart = (productID) => {
        const updatedCart = cart.filter((item) => item.id !== productID)
        setCart(updatedCart)
    }
    */


    return (
        <div className='cart'>
            <h2>Shopping Cart</h2>
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