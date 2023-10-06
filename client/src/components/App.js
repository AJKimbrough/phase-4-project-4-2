import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar";
import Product from "./Product";
import ShoppingCart from "./ShoppingCart";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Home from "./Home";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [products, setProducts] = useState([])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  useEffect(() => {
    fetch("/products")
    .then((r) => r.json())
    .then((data) => {
      setProducts(data)
    })
}, [])

  return (
    <Router>
      <div className="App">
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/products">
            <Product openModal={openModal} isOpen={isOpen} product={products} />
          </Route>
          <Route path="/cart">
            <ShoppingCart cartItems={cart} setCart={setCart} product={products} />
          </Route>
          <Route path="/login">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          {isLoggedIn ? (
            <Route path="/profile" />,
            <Profile />
        ) : (
            <Redirect to="/login" />,
            <Login handleLogin={handleLogin} />
        )}
        </Switch>
      </div>
    </Router>
  )
}

export default App;
