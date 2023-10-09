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
  const [wallet, setWallet] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

const handleChange = (e) => {
  const { name, value } = e.target
    setFormData({
        ...formData,
        [name]: value,
    })
  }

  const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if(response.status === 200) {
                const data = await response.json()
                const token = data.token

                handleLogin(token)
                setUser(data)
            }
            else {
                console.error('Login failed')
            }
        } 
        catch(error){
            console.error('Login error:', error)
        }
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

const removeFromCart = async (id) => {
  const config = {method: "DELETE"}
  const response = await fetch(`/cart/${id}`, config)

  const updatedCart = cart.filter((item) => item.id !== id);
  setCart(updatedCart);

}

const addToCart = (item) => {
  setCart([...cart, item]);
};

const addToWallet = (item) => {
  setWallet([...wallet, item])
}


return (
  <Router>
    <div className="App">
      {isLoggedIn && <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} user={user} />}
      <Switch>
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/products" /> : <Login handleLogin={handleLogin} handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} />}
        </Route>
        <Route path="/products">
          {isLoggedIn ? (
            <Product openModal={openModal} isOpen={isOpen} products={products} addToCart={addToCart} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/cart">
          {isLoggedIn ? (
            <ShoppingCart cart={cart} removeFromCart={removeFromCart} addToWallet={addToWallet}  />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/profile">
          {isLoggedIn ? (
            <Profile user={user} name={user && user.username} email={user && user.email} wallet={wallet} />
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
