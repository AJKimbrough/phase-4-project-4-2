import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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
  const [products, setProducts] = useState([])
  const [user, setUser] = useState(null)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  useEffect(() => {
    fetch('/get_user')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Handle the user data
      setUser(data);
    })
    .catch((error) => {
      // Handle errors
      console.error('Error:', error);
    })
  }, [])

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
      {isLoggedIn && <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
      <Switch>
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/products" /> : <Login handleLogin={handleLogin} />}
        </Route>
        <Route path="/products">
          {isLoggedIn ? (
            <Product openModal={openModal} isOpen={isOpen} product={products} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/cart">
          {isLoggedIn ? (
            <ShoppingCart cartItems={cart} setCart={setCart} product={products} user={user} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/profile">
          {isLoggedIn ? (
            <Profile user={user} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/register">
          {isLoggedIn ? <Redirect to="/products" /> : <Register handleLogin={handleLogin} />}
        </Route>
        <Redirect to="/login" />
      </Switch>
    </div>
  </Router>
);
}


export default App;
