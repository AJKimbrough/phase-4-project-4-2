import React from 'react';
import { NavLink } from 'react-router-dom';

const linkStyle = {
    display: "inline-block",
    padding: "12px",
    margin: "0 6px 6px",
    //background: "blue",
    textDecoration: "none",
    color: "white",
}

function NavBar({ isLoggedIn, handleLogout, user }){
const handleLogoutClick = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                handleLogout();
                window.location.href ='/login';
            } else {

                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return(
        <div className='navBar'>
            <NavLink
                to="/products"
                exact
                style={linkStyle}
                // activeStyle={{
                //     background:"darkblue",
                // }}
            >
                NFTs for sale
            </NavLink>
            <NavLink
                to="/cart"
                exact
                style={linkStyle}
                // activeStyle={{
                //     background:"darkblue",
                // }}
            >
                Shopping Cart
            </NavLink>
            
            <NavLink
                to="/profile"
                exact
                style={linkStyle}
                // activeStyle={{
                //     background:"darkblue",
                // }}
            >
                Profile Page
            </NavLink>
            <h1 className="userWelcome">Welcome, {user.username}</h1>
            {isLoggedIn && (
              <button
                className="logoutButton"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            )}
        </div>
    )
}


export default NavBar