import React from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const linkStyle = {
    display: "inline-block",
    width: "100px",
    padding: "12px",
    margin: "0 6px 6px",
    background: "blue",
    textDecoration: "none",
    color: "white",
}

function NavBar({ isLoggedIn, handleLogout }){
const handleLogoutClick = async () => {
        try {
            // Make a POST request to log the user out
            const response = await fetch('/logout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Handle successful logout on the frontend (e.g., clearing user state)
                handleLogout();
                window.location.href ='/login';
            } else {
                // Handle logout failure, if needed
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
                activeStyle={{
                    background:"darkblue",
                }}
            >
                NFTs for sale
            </NavLink>
            <NavLink
                to="/cart"
                exact
                style={linkStyle}
                activeStyle={{
                    background:"darkblue",
                }}
            >
                Shopping Cart
            </NavLink>
            
            <NavLink
                to="/profile"
                exact
                style={linkStyle}
                activeStyle={{
                    background:"darkblue",
                }}
            >
                Profile Page
            </NavLink>
            {isLoggedIn && (
                <button
                style={{...linkStyle, background:'red'}}
                onClick={handleLogoutClick}>
                    Logout
                </button>
            )}
        </div>
    )
}





// function NavBar({ isLoggedIn, handleLogout }) {
//     return (
//         <nav className='navbar'>
//             <div className='navbar-brand'>
//                 <Link to="/">AJs NFT Marketplace</Link>
//             </div>
//             <ul className='navbar-menu'>
//                 <li className='navbar-item'>
//                     <Link to="/shop">Shop</Link>
//                 </li>
//                 {isLoggedIn ? (
//                     <>
//                         <li className='navbar-item'>
//                             <Link to="/cart">Cart</Link>
//                         </li>
//                         <li className='navbar-item'>
//                             <Link to="/profile">Profile</Link>
//                         </li>
//                         <li className='navbar-item'>
//                             <button className='logout-button' onClick={handleLogout}>Logout</button>
//                         </li>
//                     </>
//                 ) : (
//                     <>
//                         <li className='navbar-item'>
//                             <Link to='/login'>Login</Link>
//                         </li>
//                         <li className='navbar-item'>
//                             <Link to='/register'>Register</Link>
//                         </li>
//                     </>
//                 )}
//             </ul>
//         </nav>
//     )
// }

export default NavBar