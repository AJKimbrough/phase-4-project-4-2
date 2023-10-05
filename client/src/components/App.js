import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar";
import Product from "./Product";
import ShoppingCart from "./ShoppingCart";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id)

    if(existingProduct) {
        const updatedCart = cart.map((item) => {
            if(item.id === product.id) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }
    else {
        setCart([...cart, {...product, quantity: 1 }])
    }
}

  const removeFromCart = (productID) => {
    const updatedCart = cart.filter((item) => item.id !== productID)
    setCart(updatedCart)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <Router>
      <div className="App">
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Switch>
          <Route path="/" exact>
            {/* Home Page */}
          </Route>
          <Route path="/shop">
            <Product addToCart={addToCart} openModal={openModal} isOpen={isOpen} />
          </Route>
          <Route path="/cart">
            <ShoppingCart cartItems={cart} removeFromCart={removeFromCart} />
          </Route>
          <Route path="/login">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile">
            {isLoggedIn ? (
              <Profile />
            ) : (
              <Route path="/login" />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
